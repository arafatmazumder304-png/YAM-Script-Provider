import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register Service Worker with instant auto-update and periodic background sync
// This guarantees that any update deployed on the site is automatically applied
// to the installed mobile app / PWA without user having to reinstall or manually update!
const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('[PWA Live Sync] New version detected! Updating app automatically...');
    // Automatically apply the update and refresh caches
    updateSW(true);
  },
  onOfflineReady() {
    console.log('[PWA Live Sync] App is ready for offline operation.');
  },
  onRegistered(registration) {
    if (registration) {
      // Check for updates every 25 seconds automatically
      setInterval(() => {
        registration.update().catch((err) => {
          console.debug('[PWA Update Check] Ping error:', err);
        });
      }, 25 * 1000);

      // Check for updates when user brings the app to foreground
      if (typeof document !== 'undefined') {
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            registration.update().catch((err) => {
              console.debug('[PWA Visibility Check] Ping error:', err);
            });
          }
        });
        window.addEventListener('focus', () => {
          registration.update().catch((err) => {
            console.debug('[PWA Focus Check] Ping error:', err);
          });
        });
      }
    }
  },
});

createRoot(document.getElementById('root')!).render(<App />);
