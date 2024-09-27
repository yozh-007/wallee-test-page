import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';

export default function useLocalStorageState<S>(
  key: string,
  defaultValue: S | (() => S),
  { serialize = JSON.stringify, deserialize = JSON.parse } = {},
): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = React.useState<S>(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      try {
        return deserialize(valueInLocalStorage) as S;
      } catch (error) {
        console.error(error);
        window.localStorage.removeItem(key);
      }
    }

    return (
      // eslint-disable-next-line
      // @ts-ignore
      (typeof defaultValue === 'function' ? defaultValue() : defaultValue) as S
    );
  });

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState];
}
