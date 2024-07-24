import OtpVerificationDialog from 'components/OtpVerificationDialog';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SignUpForm from './SignupForm';

const SignUp = ({ navigation }: any) => {
  const [pendingVerification, setPendingVerification] = useState(false);

  return (
    <GestureHandlerRootView>
      <SignUpForm pendingStart={() => setPendingVerification(true)} />
      {pendingVerification && <OtpVerificationDialog navigation={navigation} />}
    </GestureHandlerRootView>
  );
};

export default SignUp;
