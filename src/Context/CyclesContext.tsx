import { createContext, useState, ReactNode, useReducer } from 'react'

interface Cycle {
  id: string // representar unicamente um ciclo
  task: string
  minutesAmount: number
  startDate: Date // salvar qual q foi a data q o timer começou/ficou ativo
  interruptedDate?: Date
  finishedDate?: Date
}

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
  markCurrentCycleFinished: () => void // é uma função que n retorna valor nenhum
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)
// AO COLOCAR O AS COMO A INTERFACE LÁ, ELE VAI INSTRUIR AO QUE COLOCAR QUANDO CHAMAR ELE LÁ EMBAIXO

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  // estado para cada um dos input, ele inicia com uma lista vazia
  //o reducer é o ponto que vai receber qualquer tipo de alteração no estado
  //o type é oque destigue cada ação
  const [cycles, dispatch] = useReducer((state: Cycle[], action:any) => { //metodo para disparar a ação
    if (action.type === 'ADD_NEW_CYCLE') {
      return [...state, action.payload.newCycle]
    }

    return state
  }, [])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  // amarzena o segundos que se passarm desde q o ciclo foi iniciado
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  // com base no id do ciclo ativo, percorrer todos ciclos e retornar o ciclo q tenha o mesmo id
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime()) // pega a data atual e transforma em milisegundos
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(), // data atual base da data pra saber quanto tempo passou
    }
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
         newCycle,
      },
    })
   // setCycles((state) => [...state, newCycle])  ele pega o estate atual e adiciona um novo ciclo
    setActiveCycleId(id)
    setAmountSecondsPassed(0) // zera os segundos passados
  }

  function interruptCurrentCycle() {

    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      },
    })
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interruptedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
    setActiveCycleId(null)
  }

  function markCurrentCycleFinished() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId,
      },
    })

    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycle?.id) {
    //       return { ...cycle, finishedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
    setActiveCycleId(null) // Adicionado para garantir que o ciclo ativo seja desmarcado quando concluído
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  // visualmente n vai ter nada
  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycleId,
        activeCycle,
        amountSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
        markCurrentCycleFinished,
        setSecondsPassed,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
