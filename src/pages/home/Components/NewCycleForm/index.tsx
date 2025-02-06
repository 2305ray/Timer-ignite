import { FormContainer, MinuteAmountInput, TaskInput } from './style'
import { UseFormRegister } from 'react-hook-form'
import { NewCycleFormData } from '../../index'

interface NewCycleFormProps {
  register: UseFormRegister<NewCycleFormData>
}

export function NewCycleForm({ register }: NewCycleFormProps) {
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        {...register('task')}
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
  )
}