import "@testing-library/jest-dom";
import { renderHook, act } from "@testing-library/react-hooks";
import { useCounter } from "../../hooks/useCounter";

describe("Pruebas en useCounter", () => {
  test("Debe retornar valores por defecto", () => {
    const { result } = renderHook(() => useCounter());
    const { counter, increment, decrement, reset } = result.current;

    expect(counter).toBe(10);
    expect(typeof increment).toBe("function");
    expect(typeof decrement).toBe("function");
    expect(typeof reset).toBe("function");
  });

  test("Debe tener el counter en 100", () => {
    const { result } = renderHook(() => useCounter(100));
    const { counter } = result.current;

    expect(counter).toBe(100);
  });

  test("Debe incrementar en 1", () => {
    const { result } = renderHook(() => useCounter(100));
    const { increment } = result.current;

    act(() => increment());

    const { counter } = result.current;

    expect(counter).toBe(101);
  });

  test("Debe de decrementar en 1", () => {
    const { result } = renderHook(() => useCounter(100));
    const { decrement } = result.current;

    act(() => decrement());

    const { counter } = result.current;

    expect(counter).toBe(99);
  });

  test("Debe de resetear el counter a su estado inicial", () => {
    const { result } = renderHook(() => useCounter(100));
    const { increment, reset } = result.current;

    act(() => {
      increment();
      reset();
    });

    const { counter } = result.current;

    expect(counter).toBe(100);
  });
});
