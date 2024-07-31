import { useSignUp } from '@clerk/clerk-expo';
import { useState } from 'react';

export default function useOtpVerification({ navigation }: { navigation: any }) {
  const [code, setCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isLoaded, signUp, setActive } = useSignUp();

  const onPressVerify = async () => {
    setIsLoading(true);

    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        setIsLoading(false);
        navigation.replace('RootNavigator');
      } else {
        console.log('Verification failed');
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return { onPressVerify, setCode, isLoading };
}
