import { useContext, createContext, type PropsWithChildren, useCallback, useMemo, useState, useEffect } from 'react';
import singInAction from '@/utils/signIn';
import registerAction from '@/utils/register';
import { Session } from '@/types/session';
import { Credentials, CredentialsRegister } from '@/types/credentials';
import { deleteTokens, getTokens, uploadTokens } from '@/utils/manageTokens';
import { useGlobalError } from './globalErrorsContext';

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
  setSession: React.Dispatch<React.SetStateAction<Session | null>>
}

const AuthContext = createContext<AuthContextType>({
  signIn: () => null,
  signOut: () => null,
  register: () => Promise.resolve(),
  session: null,
  isLoading: false,
  isRegistering: false,
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
  const [isRegistering, setIsRegistering] = useState(false);
  const { updateError } = useGlobalError()

  const register = useCallback(async (credentialRegister: CredentialsRegister) => {
    setIsRegistering(true)
    setIsLoading(true)
    try {
      const register = await registerAction(credentialRegister)
      return register
    } catch (error: any) {
      updateError(error.message)
    } finally {
      setIsRegistering(false)
      setIsLoading(false)
    }
  }, [updateError])

  const signIn = useCallback(async (credentials: Credentials) => {
    setIsLoading(true)
    try {
      const newSession = await singInAction(credentials)
      setSession(newSession)
      await uploadTokens(newSession)
    } catch (error: any) {
      updateError(error.message)
      setSession(null)
    } finally {
      setIsLoading(false)

    }
  }, [setSession, updateError])

  const signOut = useCallback(() => {
    setSession(null)
    deleteTokens()
  }, [setSession])

  useEffect(() => {
    // Un callback es una función que se le pasa a otra función en sus parámetros
    // y se puede ejecutar en cualquier parte de la función a la que se le paso
    // El callback de un useEffect no puede ser asíncrono
    // Para permitir funciones asíncronas en un useEffect se crea una función dentro de esta
    // para que ejecuten la operación asíncrona
    const getPrevSession = async () => {
      const prevSession = await getTokens()
      setSession(prevSession)
    }

    getPrevSession()
  }, [])

  const contextValue = useMemo(() => ({
    session,
    isLoading,
    signIn,
    signOut,
    register,
    isRegistering,
    setSession
  }), [session, isLoading, signIn, signOut, register, isRegistering, setSession])

  return (
    <AuthContext.Provider
      value={contextValue}
    >
      {children}
    </AuthContext.Provider>
  );
}
