import React from "react";
import { shallow } from "enzyme";
import { TodoListItem } from "../../components/08-useReducer/TodoListItem";
import { demoTodos } from "../fixtures/demoTodos";

describe("Pruebas en el componente <TodoListItem />", () => {
  const handleDelete = jest.fn();
  const handleToggle = jest.fn();

  const wrapper = shallow(
    <TodoListItem
      todo={demoTodos[0]}
      index={0}
      handleDelete={handleDelete}
      handleToggle={handleToggle}
    />
  );

  test("Debe mostrarse correctamente />", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe llamar la funcion handleDelete", () => {
    wrapper.find("button").simulate("click");

    expect(handleDelete).toHaveBeenCalled();
    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(1);
  });

  test("Debe llamar la funcion handleToggle", () => {
    wrapper.find("p").simulate("click");

    expect(handleToggle).toHaveBeenCalled();
    expect(handleToggle).toHaveBeenCalledTimes(1);
    expect(handleToggle).toHaveBeenCalledWith(1);
  });

  test("Debe mostrar el texto correctamente", () => {
    const parrafo = wrapper.find("p");

    expect(parrafo.text().trim()).toBe(`1. ${demoTodos[0].desc}`);
  });

  test("Debe tener la clase complete si el todo.done esta en true", () => {
    const todo = demoTodos[0];

    todo.done = true;

    const wrapper = shallow(
      <TodoListItem
        todo={todo}
        index={0}
        handleDelete={handleDelete}
        handleToggle={handleToggle}
      />
    );

    expect(wrapper.find("p").hasClass("complete")).toBe(true);
  });
});
