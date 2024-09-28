import React from 'react';
import PropTypes from 'prop-types'; 
import TodoListItem from '../TodoListItem/TodoListItem';
import styles from './TodoList.module.css';

const TodoList = ({ todoList, onRemoveTodo }) => {
  return (
    <ul className={styles.list}>
      {todoList.map(todo => (
        <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />
      ))}
    </ul>
  );
};

// PropTypes definition
TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired, 
    title: PropTypes.string.isRequired, 
  })).isRequired, 
  onRemoveTodo: PropTypes.func.isRequired, 
};

export default TodoList;
