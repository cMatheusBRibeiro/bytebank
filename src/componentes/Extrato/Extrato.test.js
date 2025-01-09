import { render, screen } from "@testing-library/react";
import Extrato from "./index";

const transacoes = [
  {
    transacao: "Depósito",
    valor: 100,
  },
];

test("Deve renderizar uma lista de transações", () => {
  render(<Extrato transacoes={transacoes} />);
  const listaDeTransacoes = screen.getByRole("listitem");
  expect(listaDeTransacoes).toBeInTheDocument();
});
