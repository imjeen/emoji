import { useState, useEffect } from 'react';
import * as serviceWorkerRegistration from '@/serviceWorkerRegistration';

console.log(`version`, 1);

export default function useUpgrade() {
  const [state, setState] = useState({
    newVersionAvailable: false,
    onUpdate: () => {},
  });

  useEffect(() => {
    serviceWorkerRegistration.register({
      onUpdate: registration => {
        console.log('New version available!  Ready to update!');

        setState(pre => ({
          ...pre,
          newVersionAvailable: true,
          onUpdate: () => {
            if (registration && registration.waiting) {
              registration.waiting.postMessage({
                type: 'SKIP_WAITING',
              });
            }
            // must delay to reload
            setTimeout(() => {
              window.location.reload();
            }, 300);
          },
        }));
      },
      onSuccess: () => {
        console.log(`onSuccess`);
      },
    });
  }, []);

  return state;
}
