import Transacoes from "./index";
import estilos from "../Extrato.module.css";
import { render, screen } from "@testing-library/react";

let transacao = {
  transacao: "Depósito",
  valor: 100,
};

test("Deve renderizar o formulário de transação e testar a rerenderização com novos valores", () => {
  const { rerender } = render(
    <Transacoes estilos={estilos} transacao={transacao} />,
  );

  let tipoTransacao = screen.getByTestId("tipoTransacao");
  let valorTransacao = screen.getByTestId("valorTransacao");

  expect(tipoTransacao).toHaveTextContent("Depósito");
  expect(valorTransacao).toHaveTextContent("R$ 100");

  transacao = {
    transacao: "Transferência",
    valor: 50,
  };

  rerender(<Transacoes estilos={estilos} transacao={transacao} />);

  tipoTransacao = screen.getByTestId("tipoTransacao");
  valorTransacao = screen.getByTestId("valorTransacao");

  expect(tipoTransacao).toHaveTextContent("Transferência");
  expect(valorTransacao).toHaveTextContent("- R$ 50");
});
