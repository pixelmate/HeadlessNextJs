import { LocalStorage, localStorageAtom } from 'data/atoms/localStorage';
import { useAtom } from 'jotai';
import { Dispatch, SetStateAction, useEffect } from 'react';

export default function useLocalStorage<T = LocalStorage[keyof LocalStorage]>(
  key: keyof LocalStorage
): [T, Dispatch<SetStateAction<T | ((state: T) => T)>>] {
  const [storage, setStorage] = useAtom(localStorageAtom);

  const getItem = (): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : storage[key];
    } catch (error) {
      return storage[key] as T;
    }
  };

  const saveValue = (newValue: T | ((state: T) => T)) => {
    if (typeof newValue !== 'function') {
      setStorage((state) => {
        const data = { ...state, [key]: newValue };
        window.localStorage.setItem(key, JSON.stringify(newValue));
        return data;
      });
      return;
    }

    if (typeof newValue === 'function') {
      setStorage((state) => {
        const data = (newValue as (state: T) => T)(state[key] as unknown as T);
        window.localStorage.setItem(key, JSON.stringify(data));
        return { ...storage, [key]: data };
      });
    }
  };

  useEffect(() => {
    setStorage((_storage) => ({ ..._storage, [key]: getItem() }));
  }, []);

  const result = getItem() || storage[key];
  return [result as T, saveValue as (newValue: T | ((state: T) => T)) => void];
}
