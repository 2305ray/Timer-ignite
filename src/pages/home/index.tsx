import { useForm } from 'react-hook-form'
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

export function Home() {
  const { register, handleSubmt} = useForm() // usa a desestruração para pegar o form
    //register é um método que adiciona um input ao formulario, faa sobre os campos que vai ter
    //retorna um objeto com várias funções
  // const [task, setTask] = useState('') // estado para cada um dos input, se n colocasse as aspas n ficaria como string
  function handleSubmt(event) {
    

    event.target.task.value
    // com isso perde a fluidez do react, de habilitar, desabilitar, pegar letra por letra, mas ganha em perfomance
  }

  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
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
        <StartCountdownButton disabled type="submit">
          <Play size={28} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
