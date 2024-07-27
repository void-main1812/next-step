import { useState } from 'react';

const useDialog = () => {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return { isShowing, toggle };
};

export default useDialog;