import "@testing-library/jest-dom";
import { renderHook, act } from "@testing-library/react-hooks";
import { useForm } from "../../hooks/useForm";

describe("Pruebas en useForm", () => {
  const defaultForm = {
    name: "",
    email: "",
  };

  test("Debe regresar el formulario por defecto ", () => {
    const { result } = renderHook(() => useForm(defaultForm));

    const [values, handleInputChange, reset] = result.current;

    expect(values).toEqual(defaultForm);
    expect(typeof handleInputChange).toBe("function");
    expect(typeof reset).toBe("function");
  });

  test("Debe cambiar el valor del formulario {cambiar name}", () => {
    const { result } = renderHook(() => useForm(defaultForm));

    const [, handleInputChange] = result.current;

    const name = "tulio";

    act(() => handleInputChange({ target: { name: "name", value: name } }));

    const [values] = result.current;

    expect(values.name).toBe(name);
    expect(values).toEqual({ ...defaultForm, name });
  });

  test("Debe re-establecer el formulario con RESET", () => {
    const { result } = renderHook(() => useForm(defaultForm));
    const [, handleInputChange, reset] = result.current;

    const name = "tulio";

    act(() => {
      handleInputChange({ target: { name: "name", value: name } });
      reset();
    });

    const [values] = result.current;

    expect(values).toEqual(defaultForm);
  });
});
