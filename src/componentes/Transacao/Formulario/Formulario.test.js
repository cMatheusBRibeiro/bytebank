const { render, screen } = require("@testing-library/react");
import userEvent from "@testing-library/user-event";
import Formulario from "./index";

describe("Deve renderizar um campo de input", () => {
  beforeEach(() => {
    render(<Formulario />);
  });

  test("no documento", () => {
    const campoTexto = screen.getByPlaceholderText("Digite um valor");
    expect(campoTexto).toBeInTheDocument();
  });

  test("com o type number", () => {
    const campoTexto = screen.getByPlaceholderText("Digite um valor");
    expect(campoTexto).toHaveAttribute("type", "number");
  });

  test("que pode ser preenchido", () => {
    const campoTexto = screen.getByPlaceholderText("Digite um valor");
    userEvent.type(campoTexto, "50");
    expect(campoTexto).toHaveValue(50);
  });

  test("que rejeite textos", () => {
    const campoTexto = screen.getByPlaceholderText("Digite um valor");
    userEvent.type(campoTexto, "Bom dia");
    expect(campoTexto).toHaveValue(null);
  });
});
