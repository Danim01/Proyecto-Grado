import  { useEffect, useCallback, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { Session } from '@/context/authContext';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
  return useReducer(
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

// Archivo que maneja la persistencia de la sesión
// Esto se modifico del la documentación de Expo: https://docs.expo.dev/router/reference/authentication/#example-authentication-context

export async function setStorageItemAsync(key: string, value: Session | null) {
  if (Platform.OS === 'web') {
    try {
      if (value === null || value.access === null || value.refresh === null) {
        localStorage.removeItem(key + '-access');
        localStorage.removeItem(key + '-refresh');
      } else {
        localStorage.setItem(key + '-access', value.access);
        localStorage.setItem(key + '-refresh', value.refresh);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (value === null || value.access === null || value.refresh === null) {
      await Promise.all([
        SecureStore.deleteItemAsync(key + '-access'),
        SecureStore.deleteItemAsync(key + '-refresh'),
      ])
    } else {
      await Promise.all([
        SecureStore.setItemAsync(key + '-access', value.access),
        SecureStore.setItemAsync(key + 'refresh', value.refresh)
      ])
    }
  }
}

export function useStorageState(key: string): UseStateHook<Session> {
  // Public
  const [state, setState] = useAsyncState<Session>();

  // Get
  useEffect(() => {
    const getTokens = async () => {
      try {
        const secureStoreTokens = await Promise.all([
          SecureStore.getItemAsync(key + '-access'),
          SecureStore.getItemAsync(key + '-refresh')
        ])

        if (secureStoreTokens.findIndex(el => !el) !== -1) {
          setState(null)
          return
        }
  
        setState({
          access: secureStoreTokens[0],
          refresh: secureStoreTokens[1],
        });
      } catch (error) {
        console.error('Error extrayendo desde secure store', error)
      }
    }

    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          setState({
            access: localStorage.getItem(key + '-access'),
            refresh: localStorage.getItem(key + '-refresh'),
          });
        }
      } catch (e) {
        console.error('El local store no esta disponible:', e);
      }
    } else {
      getTokens()
    }
  }, [key, setState]);
  
  useEffect(() => {
    console.log(state)
  }, [state])

  // Set
  const setValue = useCallback(
    (value: Session | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key, setState]
  );

  return [state, setValue];
}
