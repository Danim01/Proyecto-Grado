import useAxios from "@/hooks/useAxios";
import { Lookup, PaginatedLookup } from "@/types/analyzeImage";
import analyzeImage from "@/utils/analyzeImage";
import getSasURL from "@/utils/getSasURL";
import uploadImage from "@/utils/uploadImage";
import {
  createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState
} from "react";
import { useGlobalError } from "./globalErrorsContext";
import getPaginatedLookupsAction from "@/utils/getPaginatedLookups";
import { PaginatedOptions } from "@/types/common";
import optimizeImage from "@/utils/optimizeImage";
import getCurrentLocation from "@/utils/getCurrentLocation";
interface LookupContextType {
  loading: boolean
  loadingMessage: string
  lastLookup: Lookup | null
  paginatedLookups: PaginatedLookup
  changeLastLookup: (lookup: Lookup) => void
  generateLookup: (imageUri: string) => Promise<Lookup | null>
  getPaginatedLookups: ({limit, offset}: PaginatedOptions) => void
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

  const getPaginatedLookups = useCallback(async ({limit, offset}: PaginatedOptions) => {
    setLoading(true)
    try {
      const newPaginatedLookup = await getPaginatedLookupsAction({
        axiosClient,
        limit,
        offset
      })
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
      const optimizedImageUri = await optimizeImage(imageUri)
      const azureImageURL = await uploadImage({ tokenSas, uri: optimizedImageUri })
      if (!azureImageURL) {
        updateError("No se pudo subir la imagen, por favor intente de nuevo")
        return null
      }

      setLoadingMessage("Obteniendo ubicación")
      const { location, error } = await getCurrentLocation()

      if (error) {
        updateError(error)
      }

      setLoadingMessage("Analizando imagen")
      const { busqueda } = await analyzeImage({
        axiosClient,
        imageURL: azureImageURL,
        location
      })
      return busqueda
    } catch (error: any) {
      updateError(error.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [axiosClient, updateError])

  useEffect(() => {
    getPaginatedLookups({})
  }, [])

  const contextValue = useMemo(() => ({
    loading,
    loadingMessage,
    lastLookup,
    paginatedLookups,
    changeLastLookup,
    generateLookup,
    getPaginatedLookups,
    setLastLookup
  }), [
    loading,
    loadingMessage,
    lastLookup,
    paginatedLookups,
    changeLastLookup,
    generateLookup,
    getPaginatedLookups,
    setLastLookup
  ])

  return (
    <LookupContext.Provider value={contextValue}>
      {children}
    </LookupContext.Provider>
  )
}

export default LookupProvider