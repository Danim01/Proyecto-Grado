import { ThemedText } from "@/components/ThemedText";
import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface GlobalErrorsType {
  updateError: (newError: string) => void
}

const GlobalErrorsContext = createContext<GlobalErrorsType>({
  updateError: () => null
})

export function useGlobalError() {
  const value = useContext(GlobalErrorsContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useGlobalError must be wrapped in a <GlobalErrorProvide />');
    }
  }
  return value;
}

export function GlobalErrorProvide({children}: PropsWithChildren) {
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState('')

  const updateError = useCallback((newError: string) => {
    setError(newError)
    setVisible(true)
  },[])

  const hideDialog = () => {
    setVisible(false)
  }

  const contextValue = useMemo(() => ({
    updateError
  }), [updateError])

  return (
    <GlobalErrorsContext.Provider
      value={
        contextValue
      }
    >
      <Portal>
        <Dialog visible={visible}>
          <Dialog.Title>
            <ThemedText type="subtitle">
              Error
            </ThemedText>
          </Dialog.Title>
          <Dialog.Content>
            <ThemedText type="default">
              {error}
            </ThemedText>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>
              Cerrar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {children}
    </GlobalErrorsContext.Provider>
  )
}