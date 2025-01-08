import { render, screen } from "@testing-library/react";
import Menu from "./index";

test("Deve renderizar o componente Menu e deve possuir um link para página inicial", () => {
  render(<Menu />);
  const linkParaPaginaInicial = screen.getByText("Inicial");
  expect(linkParaPaginaInicial).toBeInTheDocument();
});

test("Deve carregar uma lista de links e validar quantos existem no componente", () => {
  render(<Menu />);
  const listaDeLinks = screen.getAllByRole("link");
  expect(listaDeLinks).toHaveLength(4);
});

test("Não deve renderizar um link para Extrato", () => {
  render(<Menu />);
  const linkParaExtrato = screen.queryByText("Extrato");
  expect(linkParaExtrato).not.toBeInTheDocument();
});

test("Deve renderizar o menu e verificar se os links possuem a classe link", () => {
  render(<Menu />);
  const listaDeLinks = screen.getAllByRole("link");
  listaDeLinks.forEach((link) => expect(link).toHaveClass("link"));
  expect(listaDeLinks).toMatchSnapshot();
});
