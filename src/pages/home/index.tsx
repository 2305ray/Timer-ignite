import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
import { NewCycleForm } from './Components/NewCycleForm'
import { Countdown } from './Components/Countdown'

interface Cycle {
  id: string // representar unicamente um ciclo
  task: string
  minutesAmount: number
  startDate: Date // salvar qual q foi a data q o timer começou/ficou ativo
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  // estado para cada um dos input, ele inicia com uma lista vazia
  // estado para cada um dos input, se n colocasse as aspas n ficaria como string
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  // com base no id do ciclo ativo, percorrer todos ciclos e retornar o ciclo q tenha o mesmo id
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime()) // pega a data atual e transforma em milisegundos)
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(), // data atual base da data pra saber quanto tempo passou
    }
    setCycles((state) => [...state, newCycle]) // ele pega o estate atual e adiciona um novo ciclo
    setActiveCycleId(id)
    setAmountSecondsPassed(0) // zera os segundos passados

    reset()
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60) //arrendonda para baixo
  const secondsAmount = currentSeconds % 60 // resto da divisão, o % é o operador de resto

  //transformar o numero em string, a variavel vai ter que ter 2 caracteres, se n tiver vai colocar no começo
  const minutes = String(minutesAmount).padStart(2, '0')
  // padStart, se o numero tiver menos do que o esperado ele vai preencher com algum caractere

  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle]) // sempre que o minutes e o seconds mudar, ele vai aparecer no titulo

  const task = watch('task') // pega o valor do input, e atualiza toda vez que o input é atualizado
  const isSubmitDisabled = !task
  // event.target.task.value  pega o valor do input
  // com isso perde a fluidez do react, de habilitar, desabilitar, pegar letra por letra, mas ganha em perfomance

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <NewCycleForm />
        <Countdown
          activeCycle={activeCycle}
          setCycles={setCycles}
          activeCycleId={activeCycleId}
        />

        {/* // quando não tem um task, desabilita o botão */}

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={28} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={28} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
