import React from 'react';
import styles from './TodoListItem.module.css';
import { FaTrash } from 'react-icons/fa';  

const TodoListItem = ({ todo, onRemoveTodo }) => {
  return (
    <li className={styles.listItem}>
      <div className={styles.checkbox}>✔</div>  {/* Checkbox */}
      <span className={styles.title}>{todo.title}</span>
      <button className={styles.removeButton} onClick={() => onRemoveTodo(todo.id)}>
        <FaTrash className={styles.trashIcon} /> {/* Trash icon */}
      </button>
    </li>
  );
};

export default TodoListItem;
