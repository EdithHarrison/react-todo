import React from 'react';
import PropTypes from 'prop-types'; 
import styles from './TodoListItem.module.css';
import { FaTrash } from 'react-icons/fa';  

const TodoListItem = ({ todo, onRemoveTodo }) => {
  return (
    <li className={styles.listItem}>
      <div className={styles.checkbox}>✔</div> {/* Checkbox */}
      <span className={styles.title}>{todo.title}</span>
      <button
        className={styles.removeButton}
        onClick={() => onRemoveTodo(todo.id)}
        aria-label={`Remove ${todo.title}`} // Added aria-label for accessibility
      >
        <FaTrash className={styles.trashIcon} /> {/* Trash icon */}
      </button>
    </li>
  );
};

// PropTypes definition
TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired, 
    title: PropTypes.string.isRequired, 
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
