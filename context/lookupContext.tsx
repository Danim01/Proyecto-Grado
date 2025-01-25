import { Lookup } from "@/types/analyzeImage";
import { PaginationResponse } from "@/types/common";
import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from "react";

interface LookupContextType {
  lastLookup: Lookup | null
  paginatedLookups: PaginationResponse<Lookup> | null
  changeLastLookup: (lookup: Lookup) => void
}

const LookupContext = createContext<LookupContextType>({
  lastLookup: null,
  paginatedLookups: null,
  changeLastLookup: () => null
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

  const changeLastLookup = useCallback((lookup: Lookup) => {
    setLastLookup(lookup)
  }, [])

  const contextValue = useMemo(() => ({
    lastLookup,
    paginatedLookups,
    changeLastLookup
  }), [lastLookup, paginatedLookups, changeLastLookup])

  return (
    <LookupContext.Provider value={contextValue}>
      {children}
    </LookupContext.Provider>
  )
}

export default LookupProvider