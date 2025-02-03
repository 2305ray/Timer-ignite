import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinuteAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'
// import { useState } from 'react'

const newCycleFormSchema = zod.object({
  task: zod.string().min(1, 'informe a tarefa'),
})

// const [task, setTask] = useState('') // estado para cada um dos input, se n colocasse as aspas n ficaria como string
export function Home() {
  // usa a desestruração para pegar o form
  const { register, handleSubmit, watch } = useForm({
    //register é um método que adiciona um input ao formulario, fal sobre os campos que vai ter
  //retorna um objeto com várias funções
    resolver: zodResolver(), // de que forma quer validar? zod é uma biblioteca de validação
  })

  function handleCreateNewCycle(data: any) {
    console.log(data)
  }

  // task pq foi o nome dadp dentro do register
  const task = watch('task') // pega o valor do input, e atualiza toda vez que o input é atualizado
  const isSubmitDisabled = !task
  // event.target.task.value  pega o valor do input
  // com isso perde a fluidez do react, de habilitar, desabilitar, pegar letra por letra, mas ganha em perfomance

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
            // onChange={(e) => setTask(e.target.value)}
            // // para a cada vez que o usuário digitar algo, o valor do input será atualizado
            // value={task} // o valor do estado, atualiza visualmente o input
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="minutesAmount">Durante</label>
          <MinuteAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>Minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        {/* // quando não tem um task, desabilita o botão */}
        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={28} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
