import useAxios from "@/hooks/useAxios";
import { Lookup } from "@/types/analyzeImage";
import { PaginationResponse } from "@/types/common";
import analyzeImage from "@/utils/analyzeImage";
import getSasURL from "@/utils/getSasURL";
import uploadImage from "@/utils/uploadImage";
import {
  createContext, PropsWithChildren, useCallback, useContext, useMemo, useState
} from "react";

interface LookupContextType {
  lastLookup: Lookup | null
  paginatedLookups: PaginationResponse<Lookup> | null
  changeLastLookup: (lookup: Lookup) => void
  generateLookup: (imageUri: string) => Promise<Lookup | null>
}

const LookupContext = createContext<LookupContextType>({
  lastLookup: null,
  paginatedLookups: null,
  changeLastLookup: () => null,
  generateLookup: () => new Promise<Lookup | null>(resolve => resolve(null))
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
  const [paginatedLookups, setPaginatedLookups] = useState<PaginationResponse<Lookup> | null>(null)
  const axiosClient = useAxios()

  const changeLastLookup = useCallback((lookup: Lookup) => {
    setLastLookup(lookup)
  }, [])

  const generateLookup = useCallback(async (imageUri: string) => {
    try {
    const tokenSas = await getSasURL(axiosClient)
    const azureImageURL = await uploadImage({ tokenSas, uri: imageUri })
    if (!azureImageURL) return null

    const { busqueda } = await analyzeImage({ axiosClient, imageURL: azureImageURL })
    return busqueda

  } catch (error: any) {
    console.error(error.message);

    return null
  }}, [axiosClient])

  const contextValue = useMemo(() => ({
    lastLookup,
    paginatedLookups,
    changeLastLookup,
    generateLookup
  }), [lastLookup, paginatedLookups, changeLastLookup, generateLookup])

  return (
    <LookupContext.Provider value={contextValue}>
      {children}
    </LookupContext.Provider>
  )
}

export default LookupProvider