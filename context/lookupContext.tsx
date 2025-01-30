import { Lookup } from "@/types/analyzeImage";
import { PaginationResponse } from "@/types/common";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react";

interface LookupContextType {
  lastLookup: Lookup | null
  paginatedLookups: PaginationResponse<Lookup> | null
  setLastLookup: React.Dispatch<React.SetStateAction<Lookup | null>>
}

const LookupContext = createContext<LookupContextType>({
  lastLookup: null,
  paginatedLookups: null,
  setLastLookup: () => null
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

  useEffect(() => {
    console.log("desde context ", lastLookup)
  }, [lastLookup])

  const contextValue = useMemo(() => ({
    lastLookup,
    paginatedLookups,
    setLastLookup
  }), [lastLookup, paginatedLookups, setLastLookup])

  return (
    <LookupContext.Provider value={contextValue}>
      {children}
    </LookupContext.Provider>
  )
}

export default LookupProvider