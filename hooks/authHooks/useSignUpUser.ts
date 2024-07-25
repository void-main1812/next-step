import { useSignUp } from '@clerk/clerk-expo';
import { useState } from 'react';

export default function useSignUpUser() {
  const [pendingVerification, setPendingVerification] = useState(false);
  const { isLoaded, signUp } = useSignUp();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(err, emailAddress, password);
    }
  };

  return { onSignUpPress, setEmailAddress, setPassword, pendingVerification };
}
