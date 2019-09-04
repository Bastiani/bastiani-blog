import styled from 'styled-components';

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 1fr;
  height: 100vh;
`;

export const Header = styled.header`
  grid-area: header;
  grid-column: 1 / last-line;
  grid-row: 1 / 2;
  background-color: ${props => props.theme.header.backgroundColor || '#8c2f39'};
`;

export const Aside = styled.aside`
  grid-area: aside;
  grid-column: 1 / 2;
  grid-row: 1 / last-line;
  z-index: 1;
  @media all and (max-width: 640px) {
    visibility: hidden;
  }
  background-color: ${props => props.theme.aside.backgroundColor || '#22333b'};
  padding: 10px;
  box-shadow: 1px 0px 2px 1px rgba(116, 121, 127, 0.43);
  position: fixed;
  width: 12vw;
  height: 100vh;
`;

export const Main = styled.main`
  grid-area: main;
  grid-column: 2 / last-line;
  @media all and (max-width: 640px) {
    grid-column: 1 / last-line;
  }
  grid-row: 1 / last-line;
  background-color: ${props => props.theme.main.backgroundColor || '#eae0d5'};
  color: ${props => props.theme.main.color || '#FFFFFF'};
  padding: 18px;

  hr {
    border: solid 1px #74797f;
  }
`;

export const LinkWrapperStyled = styled.div`
  a {
    color: #8899a6;
    display: flex;
    text-decoration: none;
    transition: color 0.5s ease 0s;
  }
  section {
    align-items: center;
    display: flex;
    width: 100%;
  }
  time {
    font-size: 0.9rem;
  }
  h1 {
    font-size: 1.6rem;
    font-weight: 700;
    margin: 0.2rem 0px 0.5rem;
  }
  h2 {
    font-size: 1.2rem;
    font-weight: 300;
    line-height: 1.2;
  }
`;

export const LinkContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.5rem;
`;

export const ProfileAuthor = styled.div`
  color: ${props => props.theme.main.color || '#FFFFFF'};
  h1 {
    font-size: 1.6rem;
    margin: 0.5rem auto 1.5rem;
  }
  small {
    display: block;
    font-size: 1.2rem;
    font-weight: 300;
  }
  text-align: center;
  a {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    color: black;
  }

  a:active {
    color: black;
  }

  a:visited {
    color: black;
  }
`;
