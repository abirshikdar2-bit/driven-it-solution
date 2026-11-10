// src/lib/syncEvents.js
// Universal Real-Time Synchronization Bus for Driven IT Solution
// Ensures zero-latency bidirectional state sync between Admin Panel and Public Panel

const SYNC_CHANNEL_NAME = 'driven_it_live_sync_v1';
const SYNC_STORAGE_KEY = 'driven_it_sync_timestamp';

/**
 * Broadcast an update event when an entity is created, edited, or deleted in Admin.
 * @param {string} entity - 'team' | 'projects' | 'services' | 'products' | 'reviews' | 'settings' | 'users' | 'all'
 * @param {object} [meta] - Optional additional metadata
 */
export function broadcastDataChange(entity = 'all', meta = {}) {
  const timestamp = Date.now();
  const payload = {
    entity,
    timestamp,
    meta,
    source: typeof window !== 'undefined' ? window.location.pathname : 'server'
  };

  if (typeof window !== 'undefined') {
    // 1. BroadcastChannel: Instant cross-tab communication in modern browsers
    try {
      if ('BroadcastChannel' in window) {
        const bc = new BroadcastChannel(SYNC_CHANNEL_NAME);
        bc.postMessage(payload);
        bc.close();
      }
    } catch (e) {
      console.warn('BroadcastChannel error:', e);
    }

    // 2. LocalStorage event: Cross-tab / cross-window fallback
    try {
      localStorage.setItem(SYNC_STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('LocalStorage sync error:', e);
    }

    // 3. CustomEvent: Same-window / same-tab instant dispatch
    try {
      window.dispatchEvent(new CustomEvent('driven_it_local_data_change', { detail: payload }));
    } catch (e) {
      console.warn('CustomEvent sync error:', e);
    }
  }
}

/**
 * Hook or listener for Public Panel components to react immediately to changes.
 * @param {Function} callback - Callback function receiving the change payload
 * @returns {Function} Unsubscribe cleanup function
 */
export function subscribeToDataChanges(callback) {
  if (typeof window === 'undefined') return () => {};

  let bc = null;
  try {
    if ('BroadcastChannel' in window) {
      bc = new BroadcastChannel(SYNC_CHANNEL_NAME);
      bc.onmessage = (event) => {
        if (event && event.data) {
          callback(event.data);
        }
      };
    }
  } catch (e) {
    console.warn('BroadcastChannel subscription error:', e);
  }

  const handleStorage = (e) => {
    if (e.key === SYNC_STORAGE_KEY && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        callback(parsed);
      } catch (err) {
        callback({ entity: 'all', timestamp: Date.now() });
      }
    }
  };

  const handleLocalEvent = (e) => {
    if (e.detail) {
      callback(e.detail);
    }
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      callback({ entity: 'all', timestamp: Date.now(), reason: 'tab_visible' });
    }
  };

  const handleFocus = () => {
    callback({ entity: 'all', timestamp: Date.now(), reason: 'window_focused' });
  };

  window.addEventListener('storage', handleStorage);
  window.addEventListener('driven_it_local_data_change', handleLocalEvent);
  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('focus', handleFocus);

  return () => {
    if (bc) {
      try {
        bc.close();
      } catch (err) {}
    }
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener('driven_it_local_data_change', handleLocalEvent);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('focus', handleFocus);
  };
}
