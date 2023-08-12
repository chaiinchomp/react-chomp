import { useState } from 'react';
import LocalStorageClient from '../client/localstorage-client';

/** adapted from https://usehooks.com/useLocalStorage */
export default function useLocalStorage(key, initialValue, useSessionStorage = false) {
  const getValue = () => LocalStorageClient.get(key, initialValue, useSessionStorage);

  const [storedValue, setStoredValue] = useState(getValue());

  const setValue = value => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    LocalStorageClient.update(key, valueToStore, setStoredValue, useSessionStorage);
  };

  const refreshStoredValue = () => {
    setStoredValue(getValue());
  };

  return [storedValue, setValue, refreshStoredValue];
}
