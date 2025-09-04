import styled, { css } from "styled-components";

export const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1920px;

  ${(props) =>
    props.$noEvent &&
    css`
      pointer-events: none;
    `}

  ${(props) =>
    props.$pokeWrapper &&
    css`
      flex-direction: column;
      padding: 20px 0 0 0;
    `}

  ${(props) =>
    props.$header &&
    css`
      width: 100%;
      height: 100px;
      flex: 1;
      top: 0;
      left: 0;
      justify-content: space-between;
      padding: 10px;
      border-bottom: solid ${(props) => props.theme.border};
      background-color: ${(props) => props.theme.background};
    `};
  ${(props) =>
    props.$burgerMenu &&
    css`
      flex-direction: column;
      padding: 10px;
    `}
  ${(props) =>
    props.$main &&
    css`
      flex-wrap: wrap;
      padding: 20px;
      gap: 15px;
      background-color: ${(props) => props.theme.background};
    `}
  ${(props) =>
    props.$pokeBlock &&
    css`
      flex-direction: column;
      width: 100%;
      height: 250px;
      padding: 15px;
    `}
    ${(props) =>
    props.$pokePage &&
    css`
      flex-direction: column;
      position: relative;
      border: none;
      border-radius: 8px;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
      padding: 10px;
      gap: 10px;
      cursor: pointer;
      background: radial-gradient(
            circle at top left,
            ${(props) => props.theme.shadow},
            transparent 70%
          )
          top left / 50% 50% no-repeat,
        radial-gradient(
            circle at bottom right,
            ${(props) => props.theme.shadow},
            transparent 70%
          )
          bottom right / 50% 50% no-repeat,
        radial-gradient(
            circle at top right,
            ${(props) => props.theme.shadow},
            transparent 70%
          )
          top right / 50% 50% no-repeat,
        radial-gradient(
            circle at bottom left,
            ${(props) => props.theme.shadow},
            transparent 70%
          )
          bottom left / 50% 50% no-repeat,
        ${(props) => props.theme.pokeBackground};
    `}
    ${(props) =>
    props.$pokeDetails &&
    css`
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    `}
    ${(props) =>
    props.$info &&
    css`
      flex-direction: column;
    `}
    ${(props) =>
    props.$hover &&
    css`
      border: solid 1px transparent;
      border-radius: 8px;
      box-shadow: ${props.$isWinner ? "0 0 15px gold" : "none"};
      transition: transform 0.3s;
      :hover {
        transform: scale(1.1);
        z-index: 10;
      }
    `}
  ${(props) =>
    props.$headerGap &&
    css`
      gap: 10px;
    `}
  ${(props) =>
    props.$headerSection &&
    css`
      gap: 10px;
      flex-direction: column;
      align-items: flex-end;
    `}

  ${(props) =>
    props.$slider &&
    css`
      ${SliderInput}:checked + ${SliderTrack} {
        background-color: #4f4f4f;
      }

      ${SliderInput}:checked + ${SliderTrack}::before {
        transform: translateX(26px);
      }
    `}
  ${(props) =>
    props.$register &&
    css`
      flex-direction: column;
      justify-content: flex-start;
      gap: 10px;
      padding: 10px;
      min-width: 300px;
      height: 100vh;
      width: 100%;
    `}
    ${(props) =>
    props.$pagination &&
    css`
      gap: 20px;
      padding-bottom: 10px;
      background-color: ${(props) => props.theme.background};
    `}
    ${(props) =>
    props.$search &&
    css`
      padding: 20px;
      width: 30%;
      min-width: 200px;
      background: radial-gradient(
            circle at top left,
            ${(props) => props.theme.shadow},
            transparent 70%
          )
          top left / 50% 50% no-repeat,
        radial-gradient(
            circle at bottom right,
            ${(props) => props.theme.shadow},
            transparent 70%
          )
          bottom right / 50% 50% no-repeat,
        radial-gradient(
            circle at top right,
            ${(props) => props.theme.shadow},
            transparent 70%
          )
          top right / 50% 50% no-repeat,
        radial-gradient(
            circle at bottom left,
            ${(props) => props.theme.shadow},
            transparent 70%
          )
          bottom left / 50% 50% no-repeat,
        ${(props) => props.theme.background};
      border-radius: 4px;
    `}
    ${(props) =>
    props.$modalWrapper &&
    css`
      height: 100vh;
      width: 100vw;
      position: fixed;
      top: 0%;
      rigth: 35%;
      z-index: 999;
      backdrop-filter: blur(5px);
    `}
    ${(props) =>
    props.$modal &&
    css`
      position: relative;
      width: 35%;
      min-width: 315px;
      min-height: 200px;
      border-radius: 4px;
      padding: 20px;
      background: radial-gradient(
            circle at top left,
            ${(props) => props.theme.shadow},
            transparent 70%
          )
          top left / 50% 50% no-repeat,
        radial-gradient(
            circle at bottom right,
            ${(props) => props.theme.shadow},
            transparent 70%
          )
          bottom right / 50% 50% no-repeat,
        radial-gradient(
            circle at top right,
            ${(props) => props.theme.shadow},
            transparent 70%
          )
          top right / 50% 50% no-repeat,
        radial-gradient(
            circle at bottom left,
            ${(props) => props.theme.shadow},
            transparent 70%
          )
          bottom left / 50% 50% no-repeat,
        ${(props) => props.theme.pokeBackground};
    `}
    ${(props) =>
    props.$modalDetails &&
    css`
      flex-direction: column;
      height: 100%;
      gap: 15px;
    `}
    ${(props) =>
    props.$arenaButton &&
    css`
      position: absolute;
      bottom: 5px;
      left: 5px;
    `}
    ${(props) =>
    props.$arenaStats &&
    css`
      flex-direction: column;
      align-items: flex-start;
      position: absolute;
      top: 0;
      left: 0;
      padding: 5px;
      background-color: black;
      color: white;
      border-top-left-radius: 4px;
      border-bottom-right-radius: 4px;
    `}
    ${(props) =>
    props.$gap &&
    css`
      gap: 10px;
    `}
    ${(props) =>
    props.$relative &&
    css`
      position: relative;
    `}
    ${(props) =>
    props.$ranking &&
    css`
      width: 100%;
      gap: 10px;
      padding: 10px 10px;
    `}
    ${(props) =>
    props.$smallScreen &&
    css`
      gap: 5px;
    `}
    ${(props) =>
    props.$arenaSmallScreen &&
    css`
      @media (max-width: 850px) {
        flex-direction: column;
      }
    `}
    ${(props) =>
    props.$burger &&
    css`
      flex-direction: column;
      position: relative;
    `}
    ${(props) =>
    props.$navBurger &&
    css`
      display: ${props.$burgerOpen ? "flex" : "none"};
      flex-direction: column;
      position: absolute;
      gap: 10px;
      z-index: 10;
      top: 53px;
      right: 45px;
      width: 100%;
    `}
    
    ${(props) =>
    props.$tableWrapper &&
    css`
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      @media (max-width: 740px) {
        display: block;
      }
    `}
    
    ${(props) =>
    props.$imgContainer &&
    css`
      width: 100px;
      height: 100px;
      border: solid 1px;
    `}
    ${(props) =>
    props.$selectPok &&
    css`
      width: 50%;
      justify-content: space-between;
    `}
`;
export const StyledP = styled.p`
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
  ${(props) =>
    props.$error &&
    css`
      color: #c30000ff;
      font-size: 12px;
      min-height: 14px;
    `}
  ${(props) =>
    props.$info &&
    css`
      color: #8c8c8cff;
    `}
    ${(props) =>
    props.$absolute &&
    css`
      position: absolute;
      white-space: nowrap;
      z-index: 10;
      bottom: -15px;
      font-size: 10px;
    `}
`;
export const StyledLabel = styled.label`
  ${(props) =>
    props.$slider &&
    css`
      position: relative;
      display: inline-block;
      width: 50px;
      height: 24px;
    `}
  ${(props) =>
    props.$register &&
    css`
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      width: 60%;
      gap: 5px;
    `}
    ${(props) =>
    props.$input &&
    css`
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: 100%;
    `}
    ${(props) =>
    props.$login &&
    css`
      display: flex;
      gap: 10px;
      width: 50%;
      justify-content: center;
      align-items: center;
    `}
    ${(props) =>
    props.$edit &&
    css`
      align-items: center;
      width: 50%;
    `}
     ${(props) =>
    props.$smallScreen &&
    css`
      @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
      }
    `}
`;
export const SliderInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;
export const SliderTrack = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #808080ff;
  transition: 0.4s;
  border-radius: 24px;

  &::before {
    position: absolute;
    content: "";
    height: 32px;
    width: 32px;
    left: -4px;
    top: -4px;
    bottom: 2px;
    background-color: ${(props) => props.theme.register};
    transition: 0.4s;
    border-radius: 50%;
    background-image: url(${(props) =>
      props.$dark ? "/Solrock.png" : "/luna.png"});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
  }
`;
export const StyledH1 = styled.h1`
  margin: 0;
  padding: 0;
  font-family: "Special Gothic Expanded One", sans-serif;
  color: #ffd700;
  font-size: 64px;
  text-shadow: 5px 5px 5px rgba(25, 118, 210, 1);
  font-weight: bold;
  letter-spacing: 1px;
  @media (max-width: 768px) {
    font-size: 32px;
  }
  ${(props) =>
    props.$home &&
    css`
      cursor: pointer;
    `}
`;
export const StyledH2 = styled.h2`
  margin: 0;
  padding: 0;
`;
export const StyledH3 = styled.h3`
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
  ${(props) =>
    props.$size &&
    css`
      white-space: nowrap;
    `}
  ${(props) =>
    props.$bigger &&
    css`
      font-size: 20px;
    `}
`;
export const StyledInput = styled.input`
  ${(props) =>
    props.$register &&
    css`
      border: 1px solid;
      border-radius: 4px;
      background-color: #b1b3b5ff;
      height: 30px;
    `}
  ${(props) =>
    props.$search &&
    css`
      width: 80%;
      height: 35px;
      border: 1px solid ${(props) => props.theme.border};
      border-radius: 4px;
      background-color: ${(props) => props.theme.background};
      color: ${(props) => props.theme.color};
      ::placeholder {
        color: ${(props) => props.theme.color};
      }
    `}
    ${(props) =>
    props.$inputEdit &&
    css`
      width: 100%;
    `}
`;
export const StyledImg = styled.img`
  width: 60%;
  max-height: 200px;

  ${(props) =>
    props.$arenaImg &&
    css`
      width: 25px;
      height: 25px;
    `}
  ${(props) =>
    props.$edit &&
    css`
      width: 100%;
      heigth: 50px;
    `}
`;
export const ArenaButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: none;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  &:hover {
    background-color: #9a9a9a57;
  }
`;
export const StyledTable = styled.table`
  border-collapse: collapse;
  min-width: 700px;
  width: 100%;
  white-space: nowrap;

  td,
  th {
    padding: 10px 12px;
    border: 1px solid ${(props) => props.theme.border};
    padding: 8px;
    font-family: "Roboto", sans-serif;
  }
`;
export const StyledSelect = styled.select`
  font-family: "Roboto", sans-serif;
  width: 120px;
  margin-top: 10px;
`;
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 20px;
  min-width: 310px;
  ${(props) =>
    props.$edit &&
    css`
      position: relative;
      width: 50%;
      padding: 20px 0;
      margin-top: 10px;
      gap: 15px;
      border: solid 1px;
      border-radius: 8px;
    `}
`;
