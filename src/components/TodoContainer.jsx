import React from 'react';
import PropTypes from 'prop-types'; 
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

const TodoContainer = ({ todoList, onAddTodo, onRemoveTodo }) => {
  return (
    <div>
      <AddTodoForm onAddTodo={onAddTodo} />
      <TodoList todoList={todoList} onRemoveTodo={onRemoveTodo} />
    </div>
  );
};

// PropTypes definition
TodoContainer.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired, 
    title: PropTypes.string.isRequired, 
  })).isRequired, 
  onAddTodo: PropTypes.func.isRequired, 
  onRemoveTodo: PropTypes.func.isRequired, 
};

export default TodoContainer;
