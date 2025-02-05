import { useEffect, useState } from 'react'
import { CountdownContainer, Separator } from './style'
import { differenceInSeconds } from 'date-fns'

interface CountdownProps {
  activeCycle: any
  setCycles: any
  activeCycleId: string | null
}

export function Countdown({
  activeCycle,
  setCycles,
  activeCycleId,
}: CountdownProps) {
  //amarzena o segundos que se passarm desde q o ciclo foi iniciado
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  //converter o numero de minutos em segundos
  // se o ciclo ativo existir, pega o valor de minutosAmount, se não existir, retorna
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number // para armazenar o intervalo

    if (activeCycle) {
      interval = setInterval(() => {
        // a cada segundo, atualiza o estado
        // difrença em segundos da data atual  (sempre adiante como primeiro parametro) e a data de inicio do ciclo ativo
        const secondDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycle.id) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
          )
          setAmountSecondsPassed(totalSeconds) // para ficar zerado
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondDifference)
        }
      }, 1000)
    }
    return () => {
      // serev para quando executar dnv e quer fazer algo para limpar o anterior para q n aconteça mais
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId]) // sempre q utiliza uma variavel de fora do useEffect, tem que colocar ela como dependencia

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      {/* é colocado como se fosse o númeor do array */}
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
