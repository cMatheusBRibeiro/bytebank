const { render, screen } = require("@testing-library/react");
import userEvent from "@testing-library/user-event";
import Formulario from "./index";

describe("Deve renderizar um campo de input", () => {
  beforeEach(() => {
    render(<Formulario />);
  });

  it("no documento", () => {
    const campoTexto = screen.getByPlaceholderText("Digite um valor");
    expect(campoTexto).toBeInTheDocument();
  });

  it("com o type number", () => {
    const campoTexto = screen.getByPlaceholderText("Digite um valor");
    expect(campoTexto).toHaveAttribute("type", "number");
  });

  it("que pode ser preenchido", () => {
    const campoTexto = screen.getByPlaceholderText("Digite um valor");
    userEvent.type(campoTexto, "50");
    expect(campoTexto).toHaveValue(50);
  });

  it("que rejeite textos", () => {
    const campoTexto = screen.getByPlaceholderText("Digite um valor");
    userEvent.type(campoTexto, "Bom dia");
    expect(campoTexto).toHaveValue(null);
  });
});

it("Deve chamar um evento onSubmit ao clicar em realizar transação", () => {
  const realizarTransacao = jest.fn();

  render(<Formulario realizarTransacao={realizarTransacao} />);
  const botao = screen.getByRole("button");

  userEvent.click(botao);
  expect(realizarTransacao).toHaveBeenCalledTimes(1);
});
