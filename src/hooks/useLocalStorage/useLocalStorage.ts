import { useCallback, useEffect, useState } from "react";

const useLocalStorage = <ValueType>({
  key,
}: {
  key: string;
}): [
  value: ValueType | undefined,
  set: (newValue: ValueType) => void,
  clear: () => void
] => {
  const [value, setValue] = useState<ValueType>();

  const set = useCallback(
    (newValue: ValueType) => {
      setValue(newValue);
      localStorage.set(key, JSON.stringify(newValue));
    },
    [key, setValue]
  );

  const clear = useCallback(() => {
    setValue(undefined);
    localStorage.removeItem(key);
  }, [key, setValue]);

  useEffect(() => {
    const valueFromLocalStorage = localStorage.getItem(key);
    if (valueFromLocalStorage) setValue(JSON.parse(valueFromLocalStorage));
  }, [key]);

  return [value, set, clear];
};

export default useLocalStorage;
