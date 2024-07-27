import { useState } from 'react';

export default function useSplitText({
  text,
  setValue,
}: {
  text: string;
  setValue: (text: string) => void;
}) {
  const [arrayValues, setArrayValues] = useState<string>('');
  const [array, setArray] = useState<string[]>([]);

  if (text[text.length - 1] === ',') {
    let string = text.slice(0, -1);
    setArrayValues(string);
    setValue('');
  }

  if (arrayValues && !array.includes(arrayValues)) {
    setArray([...array, arrayValues]);
    setArrayValues('');
  }

  const removeItem = (item: string) => {
    const newArray = array.filter((value) => value !== item);
    setArray(newArray);
  };

  return { array, removeItem };
}
