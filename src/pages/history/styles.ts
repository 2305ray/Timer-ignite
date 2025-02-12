import styled from 'styled-components';

export const HistoryContainer = styled.main`
flex: 1;
padding: 3.5rem;

display: flex;
flex-direction: column;

h1 {
    font-size:  1.5rem;
    color: ${(props) => props.theme['gray-100']};
}
`;

export const HistoryList = styled.div`
flex: 1;
 overflow: auto; /* faz com que o tamanho da tabela seja fixo e o conteúdo seja scrollável */
margin-top: 2rem;

table{
    width: 100%;
    border-collapse: collapse; /* remove espaçamento entre as células */
    min-width: 600px; 

    th{
        background-color: ${(props) => props.theme['gray-600']};
        text-align: left; /*o padrão é centralizado */
        font-size: 0.875rem;
        color: ${(props) => props.theme['gray-100']};
        padding: 1rem;
        line-height: 1.6rem;
        

         &:first-child { /* seleciona o priemiro th */
            border-top-left-radius: 8px;
            padding-left: 1.5rem;
        }

        &:last-child { /* seleciona o ultimo th */
            border-top-right-radius: 8px;
            padding-right: 1.5rem;

        }
    }

    td{
       background-color: ${(props) => props.theme['gray-700']};
       border-top: 4px solid ${(props) => props.theme['gray-800']};
       padding: 1rem;
       font-size: 0.875rem;
       line-height: 1.6rem;

       &:first-child { /* seleciona o priemiro td */
        width: 50%;
        padding-left: 1.5rem;
        }

        &:last-child { /* seleciona o ultimo td */
            padding-right: 1.5rem;

        }
    }
}

`;

const STATUS_COLORS = {
    yellow: 'yellow-500',
    green: 'green-500',
    red: 'red-500',
}as const // diz q o texto vai ser sempre esses tres valores

//React does not recognize the `statusColor` prop on a DOM element.
// React estava tentando passar uma prop statusColor para um span, o que não é válido. Isso gerava um problema porque, em vez de ser
//  usada apenas para estilização, a prop estava sendo transferida para o DOM.


//2. Solução com Transient Props
// O styled-components tem um recurso chamado transient props (ou propriedades transitórias), que resolve esse tipo de problema.
// Uma transient prop é uma prop que você deseja passar apenas para o 
// styled component para estilização, mas não deve ser passada para o DOM. Ou seja, ela é usada apenas 
// no contexto do estilo, e não no HTML renderizado.

// 3. Como usar Transient Props
// Para definir uma prop como transitória, você prefixa o nome da prop com um cifrão ($).
//  Essa convenção de nomeação é como o styled-components sabe que 
// a prop deve ser tratada de forma especial e não ser transmitida para o DOM.
// Modificação no código:
// Você alterou a prop statusColor para $statusColor, e isso indicou ao styled-components que essa prop é transitória.

export const Status = styled.span<{ $statusColor: keyof typeof STATUS_COLORS }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background-color: ${(props) => props.theme[STATUS_COLORS[props.$statusColor]]};
  }
`;

