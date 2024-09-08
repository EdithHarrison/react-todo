import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

// Airtable API URL and token
const AIRTABLE_API_URL = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_TOKEN;

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch todos from Airtable
  const fetchData = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
      };

      const response = await fetch(AIRTABLE_API_URL, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();

      const todos = data.records.map(todo => ({
        id: todo.id,
        title: todo.fields.title,
      }));

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching todos:", error.message);
      setIsLoading(false);
    }
  };

  // Handle the delete operation (removing a todo)
  const handleDeleteTodo = async (id) => {
    try {
      const deleteUrl = `${AIRTABLE_API_URL}/${id}`;  // URL for deleting the todo

      const options = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
      };

      const response = await fetch(deleteUrl, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      // Remove the todo from the local state after successful deletion
      setTodoList(todoList.filter(todo => todo.id !== id));
    } catch (error) {
      console.log("Error deleting todo:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Root Route - This will display Disney Movie List */}
        <Route path="/" element={
          <>
            <h1>Favorite Disney Movies</h1>
            <AddTodoForm onAddTodo={newTodo => setTodoList([...todoList, newTodo])} />
            {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={handleDeleteTodo} />}
          </>
        } />

        {/* New Route - Display a simple heading */}
        <Route path="/new" element={<h1>Favorite Marvel Movies</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
