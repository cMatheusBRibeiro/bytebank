const { render, screen } = require("@testing-library/react");
import userEvent from "@testing-library/user-event";
import Formulario from "./index";
import moment from "moment";

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

describe("Deve realizar uma nova transação simulando as ações do usuário", () => {
  const realizarTransacao = jest.fn();
  const dataAtual = moment().locale("pt-br");
  const mesAtual =
    dataAtual.format("MMMM")[0].toUpperCase() +
    dataAtual.format("MMMM").slice(1);
  let selectTransacaoDeposito = null;
  let inputValor = null;
  let buttonSubmit = null;

  beforeEach(() => {
    render(<Formulario realizarTransacao={realizarTransacao} />);
    selectTransacaoDeposito = screen.getByTestId("select-opcoes");
    inputValor = screen.getByTestId("input-valor");
    buttonSubmit = screen.getByTestId("botao-submit");
  });

  it("Transferência", () => {
    userEvent.selectOptions(selectTransacaoDeposito, "Transferência");
    userEvent.type(inputValor, "100.50");
    userEvent.click(buttonSubmit);

    expect(realizarTransacao).toHaveBeenCalledTimes(1);

    expect(realizarTransacao).toHaveBeenCalledWith({
      data: dataAtual.format("DD/MM/YYYY"),
      mes: mesAtual,
      transacao: "Transferência",
      valor: "100.50",
    });
  });

  it("Depósito", () => {
    userEvent.selectOptions(selectTransacaoDeposito, "Depósito");
    userEvent.type(inputValor, "100.50");
    userEvent.click(buttonSubmit);

    expect(realizarTransacao).toHaveBeenCalledTimes(1);

    expect(realizarTransacao).toHaveBeenCalledWith({
      data: dataAtual.format("DD/MM/YYYY"),
      mes: mesAtual,
      transacao: "Depósito",
      valor: "100.50",
    });
  });
});
