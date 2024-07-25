import React, { useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'The Little Mermaid' },
    { id: 2, title: 'Toy Story' },
    { id: 3, title: 'Moana' }
  ]);

  const handleAddTodo = (title) => {
    const newTodo = { id: todos.length + 1, title };
    setTodos([...todos, newTodo]);
  };

  return (
    <div>
      <h1>Favorite Disney Movies</h1>
      <AddTodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} />
    </div>
  );
}

export default App;