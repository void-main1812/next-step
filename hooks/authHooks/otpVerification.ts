import { useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";

export default function useOtpVerification({navigation}: {navigation:any}) {

  const [code, setCode] = useState('');
  const { isLoaded, signUp, setActive } = useSignUp();

    const onPressVerify = async () => {
      if (!isLoaded) {
        return;
      }

      try {
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code,
        });

        if (completeSignUp.status === 'complete') {
          await setActive({ session: completeSignUp.createdSessionId });
          navigation.replace('HomeNavigator');
        } else {
          console.error(JSON.stringify(completeSignUp, null, 2));
        }
      } catch (err: any) {
        console.error(err);
      }
    };

    return {onPressVerify, setCode};
}