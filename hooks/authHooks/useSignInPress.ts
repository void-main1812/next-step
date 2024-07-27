// useSignInPress.ts
import { useSignIn } from '@clerk/clerk-expo';
import { useCallback, useState } from 'react';
import { ToastAndroid } from 'react-native';

export default function useSignInPress(navigation: any) {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSignInPress = useCallback(async () => {

    setIsLoading(true);

    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        setIsLoading(false);
        navigation.replace('HomeNavigator');
        ToastAndroid.show('Login Successful', ToastAndroid.SHORT);
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return { onSignInPress, setEmailAddress, setPassword, isLoading };
}
