import { useContext, createContext, type PropsWithChildren, useCallback, useMemo, useState, useEffect } from 'react';
import singInAction from '@/utils/signIn';
import registerAction from '@/utils/register';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { Session } from '@/types/session';
import { Credentials, CredentialsRegister } from '@/types/credentials';
import { deleteTokens, getTokens } from '@/utils/manageTokens';

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
  error: string,
  setSession: React.Dispatch<React.SetStateAction<Session | null>>
}

const AuthContext = createContext<AuthContextType>({
  signIn: () => null,
  signOut: () => null,
  register: () => Promise.resolve(),
  session: null,
  isLoading: false,
  isRegistering: false,
  error: "",
  setSession: () => null
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const register = useCallback(async (credentialRegister: CredentialsRegister) => {
    setIsRegistering(true)
    setIsLoading(true)
    try {
      const register = await registerAction(credentialRegister)
      return register
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsRegistering(false)
      setIsLoading(false)
    }
  }, [])

  const signIn = useCallback(async (credentials: Credentials) => {
    setIsLoading(true)
    try {
      const newSession = await singInAction(credentials)
      setSession(newSession);
    } catch (error: any) {
      console.error(error.message.replace(",", ""))
      setError(error.message)
      setSession(null)
    } finally {
      setIsLoading(false)

    }
  }, [setSession])

  const signOut = useCallback(() => {
    setSession(null)
    deleteTokens()
  }, [setSession])

  const hideDialog = () => {
    setError('')
  }

  useEffect(() => {
    const prevSession = getTokens()
    setSession(prevSession)
  }, [])
  
  const contextValue = useMemo(() => ({
    session,
    isLoading,
    signIn,
    signOut,
    error,
    register,
    isRegistering,
    setSession
  }), [session, isLoading, signIn, signOut, error, register, isRegistering, setSession])

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
