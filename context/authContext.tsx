import { useContext, createContext, type PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { useStorageState } from '@hooks/useStorageState';
import singInAction from '@/utils/signIn';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

export interface Session {
  access: string | null
  refresh: string | null
}

export interface Credentials {
  email: string
  password: string
}

const AuthContext = createContext<{
  signIn: ({
    email, password
  }: Credentials) => void;
  signOut: () => void;
  session?: Session | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [error, setError] = useState('');

  const signIn = useCallback(async (credentials: Credentials) => {
    try {
      const newSession = await singInAction(credentials)
      setSession(newSession);
    } catch (error: any) {
      setError(error.message)
      setSession(null)
    }
    // manejar el error
  }, [setSession])

  const signOut = useCallback(() => {
    setSession(null)
  }, [setSession])

  const hideDialog = () => {
    setError('')
  }
  
  const contextValue = useMemo(() => ({
    session,
    isLoading,
    signIn,
    signOut,
    error
  }), [session, isLoading, signIn, signOut, error])

  return (
    <AuthContext.Provider
      value={contextValue}
    >
      <Portal>
        <Dialog visible={error.length > 0}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Text>
              {error}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cerrar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {children}
    </AuthContext.Provider>
  );
}
