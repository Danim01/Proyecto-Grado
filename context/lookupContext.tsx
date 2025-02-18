import useAxios from "@/hooks/useAxios";
import { Lookup, PaginatedLookup } from "@/types/analyzeImage";
import { PaginationResponse } from "@/types/common";
import analyzeImage from "@/utils/analyzeImage";
import getSasURL from "@/utils/getSasURL";
import uploadImage from "@/utils/uploadImage";
import {
  createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState
} from "react";
import { useGlobalError } from "./globalErrorsContext";
import getPaginatedLookupsAction from "@/utils/getPaginatedLookups";
interface LookupContextType {
  loading: boolean
  loadingMessage: string
  lastLookup: Lookup | null
  paginatedLookups: PaginatedLookup
  changeLastLookup: (lookup: Lookup) => void
  generateLookup: (imageUri: string) => Promise<Lookup | null>
  getPaginatedLookups: () => void
}

const initialPaginatedLookup: PaginatedLookup = {
  count: 0,
  next: "",
  previous: "",
  results: []
}

const LookupContext = createContext<LookupContextType>({
  loading: false,
  loadingMessage: "",
  lastLookup: null,
  paginatedLookups: initialPaginatedLookup,
  changeLastLookup: () => null,
  generateLookup: () => new Promise<Lookup | null>(resolve => resolve(null)),
  getPaginatedLookups: () => null
})

export function useLookup() {
  const value = useContext(LookupContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useLookup must be wrapped in a <LookupProvider />');
    }
  }
  return value;
}


function LookupProvider({ children }: PropsWithChildren) {
  const [lastLookup, setLastLookup] = useState<Lookup | null>(null)
  const [paginatedLookups, setPaginatedLookups] = useState<PaginatedLookup>(initialPaginatedLookup)
  const [loadingMessage, setLoadingMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const axiosClient = useAxios()
  const { updateError } = useGlobalError()

  const getPaginatedLookups = useCallback(async () => {
    setLoading(true)
    try {
      const newPaginatedLookup = await getPaginatedLookupsAction(axiosClient)
      setPaginatedLookups(newPaginatedLookup)
    } catch (error: any) {
      updateError(error.message)
    } finally {
      setLoading(false)
    }
  }, [axiosClient, updateError])

  const changeLastLookup = useCallback((lookup: Lookup) => {
    setLastLookup(lookup)
  }, [])

  const generateLookup = useCallback(async (imageUri: string) => {
    setLoading(true)
    setLoadingMessage("Subiendo imagen")
    try {
      const tokenSas = await getSasURL(axiosClient)
      const azureImageURL = await uploadImage({ tokenSas, uri: imageUri })
      if (!azureImageURL) {
        updateError("No se pudo subir la imagen, por favor intente de nuevo")
        return null
      }

      setLoadingMessage("Analizando imagen")
      const { busqueda } = await analyzeImage({ axiosClient, imageURL: azureImageURL })
      return busqueda
    } catch (error: any) {
      updateError(error.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [axiosClient, updateError])

  useEffect(() => {
    getPaginatedLookups()
  }, [getPaginatedLookups])

  const contextValue = useMemo(() => ({
    loading,
    loadingMessage,
    lastLookup,
    paginatedLookups,
    changeLastLookup,
    generateLookup,
    getPaginatedLookups
  }), [
    loading,
    loadingMessage,
    lastLookup,
    paginatedLookups,
    changeLastLookup,
    generateLookup,
    getPaginatedLookups
  ])

  return (
    <LookupContext.Provider value={contextValue}>
      {children}
    </LookupContext.Provider>
  )
}

export default LookupProvider