import { useContext, createContext, type PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { useStorageState } from '@hooks/useStorageState';
import singInAction from '@/utils/signIn';
import registerAction from '@/utils/register';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

export interface Session {
  access: string | null
  refresh: string | null
}

export interface Credentials {
  email: string
  password: string
}

export interface CredentialsRegister {
  name: string
  email: string
  password: string
}

export interface User {
  email: string
  id: string
  name: string
}

interface AuthContextType {
  signIn: ({
    email, password
  }: Credentials) => void;
  signOut: () => void;
  session?: Session | null;
  isLoading: boolean;
  register: ({
    name, email, password
  }: CredentialsRegister) => Promise<any>;
  isRegistering: boolean;
  error: string
}

const AuthContext = createContext<AuthContextType>({
  signIn: () => null,
  signOut: () => null,
  register: () => Promise.resolve(),
  session: null,
  isLoading: false,
  isRegistering: false,
  error: ""
});

// Hook que da acceso al contexto de autenticación
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
  const [isRegistering, setIsRegistering] = useState(false);

  const register = useCallback(async (credentialRegister: CredentialsRegister) => {
    setIsRegistering(true)
    try {
      const register = await registerAction(credentialRegister)
      return register
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsRegistering(false)
    }
  }, [])

  const signIn = useCallback(async (credentials: Credentials) => {
    try {
      const newSession = await singInAction(credentials)
      setSession(newSession);
    } catch (error: any) {
      setError(error.message)
      setSession(null)
    }
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
    error,
    register,
    isRegistering
  }), [session, isLoading, signIn, signOut, error, register, isRegistering])

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
