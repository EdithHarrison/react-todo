import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddTodoForm from '../AddTodoForm/AddTodoForm';
import TodoList from '../TodoList/TodoList';
import styles from './TodoContainer.module.css';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

const ITEMS_PER_PAGE = 5;

const TodoContainer = ({ todoList, onAddTodo, onRemoveTodo }) => {
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortField, setSortField] = useState('title');
  const [currentPage, setCurrentPage] = useState(1);

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleSortFieldChange = (event) => {
    setSortField(event.target.value);
  };

  const sortTodos = (todosToSort) => {
    return [...todosToSort].sort((a, b) => {
      const fieldA = a[sortField] || '';
      const fieldB = b[sortField] || '';

      if (sortField === 'completedAt') {
        return sortOrder === 'asc' 
          ? new Date(fieldA) - new Date(fieldB)
          : new Date(fieldB) - new Date(fieldA);
      }

      return sortOrder === 'asc'
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    });
  };

  const sortedTodos = sortTodos(todoList);

  // Calculate the total number of pages
  const totalPages = Math.ceil(sortedTodos.length / ITEMS_PER_PAGE);

  // Get current todos
  const getCurrentTodos = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedTodos.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      <AddTodoForm onAddTodo={onAddTodo} />
      
      <div className={styles.sortControls}>
        <button className={styles.toggleButton} onClick={toggleSortOrder}>
          {sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
        </button>

        <div className={styles.sortFieldContainer}>
          <label className={styles.label} htmlFor="sortField">Sort by:</label>
          <select
            id="sortField"
            className={styles.dropdown}
            value={sortField}
            onChange={handleSortFieldChange}
          >
            <option value="title">Title</option>
            <option value="completedAt">Completed At</option>
          </select>
        </div>
      </div>

      <TodoList todoList={getCurrentTodos()} onRemoveTodo={onRemoveTodo} />

      {/* Pagination */}
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`${styles.pageButton} ${currentPage === i + 1 ? styles.activePage : ''}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

TodoContainer.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completedAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAddTodo: PropTypes.func.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoContainer;