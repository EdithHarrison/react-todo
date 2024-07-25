import React from 'react';

const AddTodoForm = (props) => {
  const handleAddTodo = (event) => {
    event.preventDefault();
    const todoTitle = event.target.elements.title.value;
    props.onAddTodo(todoTitle);
    event.target.reset();
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input type="text" id="todoTitle" name="title" />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;