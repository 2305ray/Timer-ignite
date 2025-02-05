import { createContext } from "react";

interface Cycle {
    id: string // representar unicamente um ciclo
    task: string
    minutesAmount: number
    startDate: Date // salvar qual q foi a data q o timer começou/ficou ativo
    interruptedDate?: Date
    finishedDate?: Date
  }

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleFinished: () => void // é uma função que n retorna valor nenhum
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)
// AO COLOCAR O AS COMO A INTERFACE LÁ, ELE VAI INSTRUIR AO QUE COLOCAR QUANDO CHAMAR ELE LÁ EMBAIXO

export function CyclesContextProvider() {
    return(
        <CyclesContext.Provider
          value={{
            activeCycleId,
            activeCycle,
            markCurrentCycleFinished,
            amountSecondsPassed,
            setSecondsPassed,
          }}
        ></CyclesContext.Provider>
    )
}

