import { render, screen } from "@testing-library/react";
import Saldo from "./index";

it("Deve renderizar o componente Saldo e verificar se o valor está em dinheiro", () => {
  render(<Saldo saldo={1000} />);

  const saldo = screen.getByTestId("saldo");

  expect(saldo).toHaveTextContent("R$ 1000");
});
