import styled from 'styled-components';

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 50px 1fr;
  height: 100vh;
`;

export const Header = styled.header`
  display: flex;
  grid-area: header;
  grid-column: 1 / last-line;
  grid-row: 1 / 2;
  background-color: ${props => props.theme.header.backgroundColor || '#8c2f39'};
  @media all and (min-width: 1024px) {
    visibility: hidden;
  }

  justify-content: space-between;
  flex-direction: row;
  align-content: center;
  align-items: center;

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

  h3 {
    margin: 0px;
    margin-left: 10px;
  }

  border-bottom: 1px solid #74797f;
`;

export const Aside = styled.aside`
  grid-area: aside;
  grid-column: 1 / 2;
  grid-row: 2 / last-line;
  @media all and (max-width: 1024px) {
    visibility: hidden;
  }
  @media all and (min-width: 1024px) {
    grid-row: 1 / last-line;
  }
  background-color: ${props => props.theme.aside.backgroundColor || '#22333b'};
  padding: 10px;
  height: 100vh;
  border-right: 1px solid #74797f;
`;

export const Main = styled.main`
  grid-area: main;
  grid-column: 2 / last-line;
  grid-row: 2 / last-line;
  @media all and (max-width: 1024px) {
    grid-column: 1 / last-line;
  }
  @media all and (min-width: 1024px) {
    grid-row: 1 / last-line;
  }
  background-color: ${props => props.theme.main.backgroundColor || '#eae0d5'};
  color: ${props => props.theme.main.color || '#FFFFFF'};
  padding: 18px;

  hr {
    border: 1px solid #74797f;
  }
`;

export const LinkWrapperStyled = styled.div`
  a {
    color: #a7a4a8;
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
    color: #21b0d3;
  }

  a:active {
    color: black;
  }

  a:visited {
    color: black;
  }
`;
