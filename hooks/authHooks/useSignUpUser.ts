import { useSignUp } from '@clerk/clerk-expo';
import { useState } from 'react';
import { Alert, ToastAndroid } from 'react-native';

export default function useSignUpUser() {
  const { isLoaded, signUp } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const onSignUpPress = async () => {
    if (emailAddress && password && firstName && lastName) {
      setPendingVerification(true);
    } else{
      ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
    }

    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
        firstName,
        lastName,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
    } catch (err: any) {
      console.error(err, emailAddress, password);
    }
  };

  return {
    onSignUpPress,
    setEmailAddress,
    setPassword,
    setFirstName,
    setLastName,
    pendingVerification,
  };
}
