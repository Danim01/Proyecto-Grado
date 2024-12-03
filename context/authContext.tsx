import { useContext, createContext, type PropsWithChildren, useCallback, useMemo } from 'react';
import { useStorageState } from '@hooks/useStorageState';
import singInAction from '@/utils/signIn';

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

  const signIn = useCallback(async (credentials: Credentials) => {
    try {
      const newSession = await singInAction(credentials)
      console.log(newSession)
      setSession(newSession);
    } catch (error) {
      console.error(error)
      setSession(null)
    }
    // manejar el error
  }, [setSession])

  const signOut = useCallback(() => {
    setSession(null)
  }, [setSession])
  
  const contextValue = useMemo(() => ({
    session,
    isLoading,
    signIn,
    signOut
  }), [session, isLoading, signIn, signOut])

  return (
    <AuthContext.Provider
      value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
