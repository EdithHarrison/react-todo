import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = (props) => {
  return (
    <ul>
      {props.todos.map(item => (
        <TodoListItem key={item.id} todo={item} />
      ))}
    </ul>
  );
};

export default TodoList;
