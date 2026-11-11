// src/lib/syncEvents.js
// Universal Real-Time Synchronization Bus for Driven IT Solution
// Ensures zero-latency bidirectional state sync between Admin Panel and Public Panel

const SYNC_CHANNEL_NAME = 'driven_it_live_sync_v1';
const SYNC_STORAGE_KEY = 'driven_it_sync_timestamp';

export function saveLocalCache(entity, data) {
  if (typeof window === 'undefined' || !entity || !data) return;
  try {
    localStorage.setItem(`driven_it_cache_${entity}`, JSON.stringify(data));
  } catch (e) {
    console.warn(`Local cache write error for ${entity}:`, e);
  }
}

export function getLocalCache(entity) {
  if (typeof window === 'undefined' || !entity) return null;
  try {
    const raw = localStorage.getItem(`driven_it_cache_${entity}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) ? parsed.length > 0 : parsed && typeof parsed === 'object') {
        return parsed;
      }
    }
  } catch (e) {
    console.warn(`Local cache read error for ${entity}:`, e);
  }
  return null;
}

let sharedBroadcastChannel = null;

function getBroadcastChannel() {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    if (!sharedBroadcastChannel) {
      try {
        sharedBroadcastChannel = new BroadcastChannel(SYNC_CHANNEL_NAME);
      } catch (err) {
        console.warn('Failed to initialize shared BroadcastChannel:', err);
      }
    }
    return sharedBroadcastChannel;
  }
  return null;
}

/**
 * Broadcast an update event when an entity is created, edited, or deleted in Admin.
 * @param {string} entity - 'team' | 'projects' | 'services' | 'products' | 'reviews' | 'settings' | 'users' | 'all'
 * @param {object} [meta] - Optional additional metadata or data payload { data: [...] }
 */
export function broadcastDataChange(entity = 'all', meta = {}) {
  const timestamp = Date.now();
  if (meta && meta.data) {
    saveLocalCache(entity, meta.data);
  }

  const payload = {
    entity,
    timestamp,
    nonce: Math.random().toString(36).substring(2, 9),
    meta,
    source: typeof window !== 'undefined' ? window.location.pathname : 'server'
  };

  if (typeof window !== 'undefined') {
    // 1. BroadcastChannel: Instant cross-tab communication in modern browsers
    try {
      const bc = getBroadcastChannel();
      if (bc) {
        bc.postMessage(payload);
      }
    } catch (e) {
      console.warn('BroadcastChannel error:', e);
    }

    // 2. LocalStorage event: Cross-tab / cross-window fallback with guaranteed unique value
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

  const bc = getBroadcastChannel();
  const handleBcMessage = (event) => {
    if (event && event.data) {
      callback(event.data);
    }
  };

  if (bc) {
    bc.addEventListener('message', handleBcMessage);
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
      bc.removeEventListener('message', handleBcMessage);
    }
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener('driven_it_local_data_change', handleLocalEvent);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('focus', handleFocus);
  };
}
