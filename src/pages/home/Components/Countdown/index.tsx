import { useContext, useEffect, useState } from 'react'
import { CountdownContainer, Separator } from './style'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../..'

export function Countdown() {
  const { activeCycle, activeCycleId, markCurrentCycleFinished } =
    useContext(CyclesContext)
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
          markCurrentCycleFinished()

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
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleFinished]) // sempre q utiliza uma variavel de fora do useEffect, tem que colocar ela como dependencia

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
