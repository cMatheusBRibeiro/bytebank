const { render, screen } = require("@testing-library/react");
import Cabecalho from "./index";

test("Deve renderizar o componente Cabeçalho e apresentar o nome do usuário", () => {
  render(<Cabecalho />);
  const nomeDoUsuario = screen.getByText("Joana Fonseca Gomes");
  expect(nomeDoUsuario).toBeInTheDocument();
});
