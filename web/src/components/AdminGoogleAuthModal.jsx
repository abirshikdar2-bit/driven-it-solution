'use client';

import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import DrivenItWordmark from './DrivenItWordmark';
import CornerBrackets, { SectionBadge } from './CornerBrackets';
import FlowFieldCanvas from './FlowFieldCanvas';
import { ShieldCheck, Lock, AlertCircle, ArrowRight, HelpCircle, CheckCircle2, KeyRound } from 'lucide-react';

export default function AdminGoogleAuthModal({ onAuthenticated }) {
  const [googleClientId, setGoogleClientId] = useState('');
  const [customClientId, setCustomClientId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  const [gisLoaded, setGisLoaded] = useState(false);
  const googleBtnRef = useRef(null);

  // 1. Fetch Auth State & Google Client ID from server
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/google');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user) {
            onAuthenticated(data.user);
            return;
          }
          if (data.googleClientId) {
            setGoogleClientId(data.googleClientId);
          }
        }
      } catch (err) {
        console.error('Failed to check auth status:', err);
      }
    }
    checkAuth();
  }, [onAuthenticated]);

  // 2. Initialize Google Identity Services when script loads & Client ID is ready
  useEffect(() => {
    const activeClientId = googleClientId || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (gisLoaded && typeof window !== 'undefined' && window.google?.accounts?.id && activeClientId) {
      try {
        window.google.accounts.id.initialize({
          client_id: activeClientId,
          callback: handleGoogleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true
        });

        if (googleBtnRef.current) {
          googleBtnRef.current.innerHTML = '';
          window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: 'filled_black',
            size: 'large',
            shape: 'rectangular',
            text: 'signin_with',
            logo_alignment: 'left',
            width: 320
          });
        }
      } catch (e) {
        console.error('GIS initialization error:', e);
      }
    }
  }, [gisLoaded, googleClientId]);

  // Handle Google OAuth Credential callback from Google popup
  const handleGoogleCredentialResponse = async (response) => {
    if (!response.credential) {
      setError('Google sign-in did not return a valid credential.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential })
      });

      const data = await res.json();
      if (res.ok && data.success && data.user) {
        onAuthenticated(data.user);
      } else {
        setError(data.message || 'Google Authentication failed. Please check permissions.');
      }
    } catch (err) {
      console.error('Auth verification error:', err);
      setError('Network error while verifying Google login.');
    } finally {
      setLoading(false);
    }
  };

  // Demo sign-in for testing before Google Cloud OAuth is registered
  const handleDemoLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'demo_login',
          demoUser: {
            name: 'Abir Shikdar (Admin)',
            email: 'abirshikdar.official@gmail.com',
            picture: 'https://api.dicebear.com/7.x/bottts/svg?seed=AbirAdmin'
          }
        })
      });

      const data = await res.json();
      if (res.ok && data.success && data.user) {
        onAuthenticated(data.user);
      } else {
        setError('Failed to initialize admin session.');
      }
    } catch {
      setError('Connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] p-4 font-sans select-none overflow-hidden">
      {/* Script for Google Identity Services */}
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setGisLoaded(true)}
      />

      {/* Background FlowField matching site */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <FlowFieldCanvas
          color="#22d3ee"
          trailOpacity={0.15}
          particleCount={500}
          speed={0.5}
        />
      </div>

      {/* Main Glassmorphic Auth Box */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden border border-white/10 bg-[#0c0c0c]/90 p-8 sm:p-10 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.8)]">
        <CornerBrackets className="border-cyan-400/50" />

        {/* Brand & Security Header */}
        <div className="flex flex-col items-center text-center">
          <DrivenItWordmark className="h-9 w-auto" />

          <div className="mt-5 inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-[10px] uppercase tracking-widest">
            <ShieldCheck size={13} />
            <span>Authorized Personnel Gateway</span>
          </div>

          <h2 className="mt-4 text-2xl font-bold uppercase tracking-tight text-white font-mono">
            Admin Console Access
          </h2>
          <p className="mt-2 text-xs text-white/60 font-light italic leading-relaxed max-w-sm">
            Sign in with your verified Google account to manage team members, case studies, products, and platform configurations.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mt-6 flex items-start gap-3 border border-rose-500/30 bg-rose-950/40 p-3.5 text-xs text-rose-300">
            <AlertCircle size={16} className="shrink-0 text-rose-400 mt-0.5" />
            <p className="leading-snug">{error}</p>
          </div>
        )}

        {/* Google Sign In Area */}
        <div className="mt-8 flex flex-col items-center gap-4">
          {/* Render container for official Google Button if client ID configured */}
          {googleClientId ? (
            <div className="flex flex-col items-center gap-3 w-full">
              <div ref={googleBtnRef} className="flex justify-center w-full min-h-[44px]" />
              <p className="text-[11px] font-mono text-emerald-400/80 flex items-center gap-1.5">
                <CheckCircle2 size={12} />
                <span>Google OAuth 2.0 Connected</span>
              </p>
            </div>
          ) : (
            /* Styled Google Sign-In Button */
            <div className="w-full flex flex-col gap-3">
              <button
                onClick={() => {
                  if (googleClientId) {
                    if (window.google?.accounts?.id) {
                      window.google.accounts.id.prompt();
                    }
                  } else {
                    // Open setup or demo connect
                    handleDemoLogin();
                  }
                }}
                disabled={loading}
                className="group relative flex w-full items-center justify-center gap-3 bg-white hover:bg-neutral-100 text-neutral-900 px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-[0.99] cursor-pointer"
              >
                {/* Official Google multicolored G SVG */}
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.9c2.28-2.1 3.645-5.2 3.645-9.14z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.74-2.09-6.68-4.91H1.21v3.15C3.25 21.46 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.32 14.29c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.56H1.21C.44 8.1 0 9.99 0 12s.44 3.9 1.21 5.44l4.11-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.54 1.21 6.56l4.11 3.15c.94-2.82 3.58-4.96 6.68-4.96z"
                  />
                </svg>

                <span>{loading ? 'Authenticating...' : 'Sign in with Google'}</span>
                <CornerBrackets className="border-black/30" />
              </button>

              <div className="flex items-center justify-between text-[11px] font-mono text-white/50 px-1 pt-1">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Lock size={12} />
                  <span>Google SSO Protection</span>
                </span>
                <button
                  onClick={() => setShowSetupGuide(!showSetupGuide)}
                  className="hover:text-white transition-colors underline cursor-pointer flex items-center gap-1"
                >
                  <KeyRound size={12} />
                  <span>{showSetupGuide ? 'Close Client ID Setup' : 'Enter Google Client ID'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Quick Setup Modal / Section for entering Google Cloud OAuth Client ID */}
          {showSetupGuide && (
            <div className="mt-4 w-full border border-white/10 bg-white/[0.02] p-4 text-xs font-mono">
              <h3 className="font-bold text-white uppercase text-[11px] flex items-center gap-2 mb-2">
                <KeyRound size={14} className="text-cyan-400" />
                <span>Google Cloud Client ID Setup:</span>
              </h3>
              <p className="text-[11px] text-white/60 mb-3 font-sans">
                To link your official domain or local dev with Google Cloud:
              </p>
              <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-white/70 font-sans mb-3">
                <li>Open <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noreferrer" className="text-cyan-400 underline">Google Cloud Console &rarr; Credentials</a></li>
                <li>Create <strong>OAuth 2.0 Client ID</strong> (Web Application)</li>
                <li>Add origin: <code className="bg-white/10 px-1.5 py-0.5 text-cyan-300">http://localhost:3000</code></li>
                <li>Paste your Client ID below:</li>
              </ol>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="xxxx.apps.googleusercontent.com"
                  value={customClientId}
                  onChange={(e) => setCustomClientId(e.target.value)}
                  className="flex-1 bg-black/60 border border-white/20 px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 font-mono"
                />
                <button
                  onClick={() => {
                    if (customClientId.trim()) {
                      setGoogleClientId(customClientId.trim());
                      setShowSetupGuide(false);
                    }
                  }}
                  className="px-4 py-2 bg-cyan-400 text-black font-bold uppercase hover:bg-cyan-300 text-xs transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Security Notice Footer */}
        <div className="mt-8 border-t border-white/5 pt-4 text-center">
          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">
            DRIVEN IT SOLUTION &bull; OAUTH 2.0 SECURITY AUDITED &bull; SESSION ENCRYPTED
          </p>
        </div>
      </div>
    </div>
  );
}
