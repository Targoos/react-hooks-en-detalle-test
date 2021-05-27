import React from "react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import { TodoAdd } from "../../components/08-useReducer/TodoAdd";

describe("Pruebas en el componente <TodoAdd />", () => {
  const handleAddTodo = jest.fn();

  const wrapper = shallow(<TodoAdd handleAddTodo={handleAddTodo} />);

  test("Debe mostrar el componente correctamente ", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("No debe llamar el handleAddTodo", () => {
    const form = wrapper.find("form");

    form.simulate("submit", { preventDefault: () => {} });

    expect(handleAddTodo).not.toHaveBeenCalled();
    expect(handleAddTodo).toHaveBeenCalledTimes(0);
  });

  test("handleAddTodo debe haber sido llamado", () => {
    const description = "Estudiar testing";

    wrapper.find("input").simulate("change", {
      target: { name: "description", value: description },
    });

    const form = wrapper.find("form");

    form.simulate("submit", { preventDefault: () => {} });

    expect(handleAddTodo).toHaveBeenCalledTimes(1);
    expect(handleAddTodo).toHaveBeenCalledWith({
      id: expect.any(Number),
      desc: description,
      done: false,
    });
    expect(wrapper.find("input").prop("value")).toBe("");
  });
});
