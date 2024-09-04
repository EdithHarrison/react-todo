import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';

// Airtable API URL and Token
const AIRTABLE_API_URL = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/Default`;
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_TOKEN;

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState('');

  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  const postTodo = async (todo) => {
    try {
      const airtableData = {
        fields: {
          title: todo,
        },
      };

      const response = await fetch(AIRTABLE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
        body: JSON.stringify(airtableData),
      });

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const dataResponse = await response.json();
      return dataResponse;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const handleAddTodo = async (event) => {
    event.preventDefault();

    if (todoTitle.trim() === '') {
      alert('Todo title cannot be empty');
      return;
    }

    // Send new todo to Airtable
    const newTodoFromAirtable = await postTodo(todoTitle);
    
    if (newTodoFromAirtable) {
      const newTodo = {
        id: newTodoFromAirtable.id,
        title: newTodoFromAirtable.fields.title,
      };
      
      // Update parent component with new todo
      onAddTodo(newTodo);
      setTodoTitle(''); // Clear the input field
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
      >
        Title
      </InputWithLabel>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodoForm;
