import { useContext, createContext, type PropsWithChildren, useCallback, useMemo, useState, useEffect } from 'react';
import singInAction from '@/utils/signIn';
import registerAction from '@/utils/register';
import { Session } from '@/types/session';
import { Credentials, CredentialsRegister } from '@/types/credentials';
import { deleteTokens, getTokens, uploadTokens } from '@/utils/manageTokens';
import { useGlobalError } from './globalErrorsContext';
import getProfileAction from '@/utils/getProfile';
import useAxios from '@/hooks/useAxios';
import { Profile } from '@/types/common';

interface AuthContextType {
  session?: Session | null
  isLoading: boolean
  isRegistering: boolean
  profile: Profile | null
  signIn: ({
    email, password
  }: Credentials) => void
  signOut: () => void
  register: ({
    name, email, password
  }: CredentialsRegister) => Promise<any>
  setSession: React.Dispatch<React.SetStateAction<Session | null>>
  getProfile: () => void
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: false,
  isRegistering: false,
  profile: null,
  signIn: () => null,
  signOut: () => null,
  register: () => Promise.resolve(),
  setSession: () => null,
  getProfile: () => null,
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
  const { updateError } = useGlobalError();
  const [profile, setProfile] = useState<Profile | null>(null);
  const axiosClient = useAxios();

  const getProfile = useCallback(async () => {
    if (!session) return
    console.log(session)
    setIsLoading(true)
    try {
      const newProfile = await getProfileAction(axiosClient)
      setProfile(newProfile)
    } catch (error: any) {
      updateError(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [axiosClient, updateError, session])

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
    isRegistering,
    profile,
    signIn,
    signOut,
    register,
    setSession,
    getProfile,
  }), [
    session,
    isLoading,
    isRegistering,
    profile,
    signIn,
    signOut,
    register,
    setSession,
    getProfile,
  ])

  return (
    <AuthContext.Provider
      value={contextValue}
    >
      {children}
    </AuthContext.Provider>
  );
}
