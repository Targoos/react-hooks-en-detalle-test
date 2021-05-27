import { act } from "@testing-library/react";
import { mount, shallow } from "enzyme";
import React from "react";
import { TodoApp } from "../../components/08-useReducer/TodoApp";
import { demoTodos } from "../fixtures/demoTodos";

describe("Pruebas en el componente <TodoApp />", () => {
  const wrapper = shallow(<TodoApp />);
  Storage.prototype.setItem = jest.fn();

  test("Debe mostrarse correctamente ", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe agregar dos todo", () => {
    const wrapper = mount(<TodoApp />);

    const handleAddTodo = wrapper.find("TodoAdd").prop("handleAddTodo");

    act(() => {
      handleAddTodo(demoTodos[0]);
      handleAddTodo(demoTodos[1]);
    });

    expect(wrapper.find("h1").text().trim()).toBe(
      `TodoApp ( ${demoTodos.length} )`
    );

    expect(localStorage.setItem).toBeCalledTimes(2);
  });

  test("Debe eliminar un todo", () => {
    const handleAdd = wrapper.find("TodoAdd").prop("handleAddTodo");

    handleAdd(demoTodos[0]);

    const handleDelete = wrapper.find("TodoList").prop("handleDelete");

    handleDelete(demoTodos[0].id);

    expect(wrapper.find("h1").text().trim()).toBe("TodoApp ( 0 )");
  });
});
