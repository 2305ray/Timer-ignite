import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { NewCycleForm } from './Components/NewCycleForm'
import { Countdown } from './Components/Countdown'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'Precisa ser no mínimo 5 minutos.')
    .max(60, 'Precisa ser no máximo 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  
  

  
  

  const task = watch('task') // pega o valor do input, e atualiza toda vez que o input é atualizado
  const isSubmitDisabled = !task
  // event.target.task.value  pega o valor do input
  // com isso perde a fluidez do react, de habilitar, desabilitar, pegar letra por letra, mas ganha em perfomance

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
      
        <NewCycleForm />
        <Countdown />

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
