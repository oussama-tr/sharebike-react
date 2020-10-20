import styled from '@emotion/styled';

export const Wrapper = styled('div')`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

export const Container = styled('div')`
  display: flex;
  margin: 20px 0;
  
  transition: ${(props => props.sliding ? 'none' : 'transform .4s ease')};
  transform: ${({ sliding, slotWidth, direction }) => !sliding ? `translateX(calc(${-slotWidth}% - 20px))` : direction === 'prev' ? `translateX(calc(2 * (${-slotWidth}% - 20px)))` : 'translateX(0%)'}
`;

export const Slot = styled('div')`
  flex: 1 0 100%;
  flex-basis: 20%;
  order: ${props => props.order};
  min-width: 240px;
  margin: 0 10px;
  
  @media (max-width: 1279px) {
    flex-basis: 30%;
  }
  
  @media (max-width: 959px) {
    flex-basis: 40%;
  }
  
  @media (max-width: 599px) {
    flex-basis: 80%;
  }
`;

export const Buttons = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const Button = styled('button')`
  margin: 0 10px;
  padding: 2px 38px;
  font-family: Arial;
  font-size: 30px;
  border: 1px solid rgba(0, 0, 0, .3);
  border-radius: 20px;
  background-color: rgb(245, 245, 245);
  cursor: pointer;
  
  &::-moz-focus-inner {
    border: 0;
  }
`;