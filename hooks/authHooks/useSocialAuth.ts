import { useOAuth } from '@clerk/clerk-expo';
import { useCallback, useState } from 'react';

type SocialAuthProps = {
  provider: 'oauth_google' | 'oauth_facebook' | 'oauth_github';
}

export default function useSocialAuth({provider}: SocialAuthProps) {
  const [loading, setLoading] = useState(false);

  const { startOAuthFlow } = useOAuth({ strategy: provider });

  const onPress = useCallback(async () => {
    setLoading(true);
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setLoading(false);
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);

  return {onPress, loading};
}
