import { FormContainer, MinuteAmountInput, TaskInput } from './style'
import * as zod from 'zod'

// const newCycleFormValidationSchema = zod.object({
//   task: zod.string().min(1, 'Informe a tarefa'),
//   minutesAmount: zod
//     .number()
//     .min(1, 'Precisa ser no mínimo 5 minutos.')
//     .max(60, 'Precisa ser no máximo 60 minutos.'),
// })

// type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {
  //usa a desestruração para pegar o form
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    //register é um método que adiciona um input ao formulario, fal sobre os campos que vai ter
    //retorna um objeto com várias funções
    resolver: zodResolver(newCycleFormValidationSchema),
    // de que forma quer validar? zod é uma biblioteca de validação
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle} // converte para booleano
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
        min={1}
        max={60}
        disabled={!!activeCycle} // converte para booleano
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>Minutos.</span>
    </FormContainer>
  )
}
