import {
  createContext,
  useState,
  ReactNode,
  useReducer,
  useEffect,
} from 'react'
import { Cycle, cyclesReducer, CyclesState } from '../Reducers/cycles/reducers'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrenteCycleAsFinishedAction,
} from '../Reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

// Define os dados para criar um novo ciclo (tarefa e tempo)
interface CreateCycleData {
  task: string
  minutesAmount: number
}

// Define o tipo do contexto para fornecer os valores do estado e ações para o restante da aplicação
interface CyclesContextType {
  cycles: Cycle[] // Lista de ciclos
  activeCycle: Cycle | undefined // Ciclo ativo
  activeCycleId: string | null // ID do ciclo ativo
  amountSecondsPassed: number // Tempo em segundos passado desde o início do ciclo ativo
  createNewCycle: (data: CreateCycleData) => void // Função para criar um novo ciclo
  interruptCurrentCycle: () => void // Função para interromper o ciclo ativo
  markCurrentCycleFinished: () => void // Função para marcar o ciclo ativo como finalizado
  setSecondsPassed: (seconds: number) => void // Função para atualizar os segundos passados
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode // Componentes filhos do contexto
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  // Usando useReducer com tipagem explícita para o reducer e estado inicial
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    } as CyclesState,
    (initialState) => {
      const storedStateJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )

      return storedStateJSON
        ? (JSON.parse(storedStateJSON) as CyclesState)
        : initialState
    },
  )
  // Desestruturando o estado para obter ciclos e o ID do ciclo ativo
  const { cycles, activeCycleId } = cyclesState

  // Encontrando o ciclo ativo com base no ID
  const activeCycle = cycles.find((cycle: Cycle) => cycle.id === activeCycleId)

  // Estado para armazenar os segundos passados
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
      //ele retorna com a data correta
    }

    return 0
  })

  useEffect(() => {
    const stateJson = JSON.stringify(cyclesState) // ✅ Corrigido

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJson)
  }, [cyclesState]) // ✅ Corrigido

  // Função para criar um novo ciclo
  function createNewCycle(data: CreateCycleData) {
    // Gerando um ID único para o ciclo com base no timestamp
    const id = String(new Date().getTime())

    // Criando o novo ciclo
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    // Dispatching a ação para adicionar o novo ciclo ao estado
    dispatch(addNewCycleAction(newCycle))

    // Resetando o contador de segundos
    setAmountSecondsPassed(0)
  }

  // Função para interromper o ciclo ativo
  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction()) // Dispatching a ação de interromper
  }

  // Função para marcar o ciclo ativo como finalizado
  function markCurrentCycleFinished() {
    dispatch(markCurrenteCycleAsFinishedAction()) // Dispatching a ação de finalizar
  }

  // Função para atualizar os segundos passados
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  return (
    // Provedor do contexto para disponibilizar os valores e funções para os componentes filhos
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
      {children} {/* Renderiza os filhos passados para o contexto */}
    </CyclesContext.Provider>
  )
}
