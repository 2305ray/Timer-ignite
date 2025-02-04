import { styled } from "styled-components";

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`;

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme['gray-100']};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
`;

export const TaskInput = styled(BaseInput)`
  flex: 1; /* ocupa o máximo de espaço que dá, ele é um atalho para o flex-grow(habilidade de crescer além do tamanho original), flex-shrink(habilidade de diminuir além do tamanho original) e flex-basis(tamanho ideal) */
  &::-webkit-calendar-picker-indicator { 
    display: none !important;
  }
`;

export const MinuteAmountInput = styled(BaseInput)`
  width: 4rem;
`;
