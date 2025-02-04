import { CountdownContainer, Separator } from "./style";

export function Countdown() {
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