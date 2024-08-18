import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = new Promise((resolve, reject) => {
      setTimeout(() => {
        const savedTodoList = JSON.parse(localStorage.getItem("savedTodoList")) || [];
        resolve({
          data: {
            todoList: savedTodoList.length > 0 ? savedTodoList : [
              { id: 1, title: 'The Little Mermaid' },
              { id: 2, title: 'Toy Story' },
              { id: 3, title: 'Moana' },
            ],
          },
        });
      }, 2000);
    });

    fetchData.then(result => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  return (
    <>
      <h1>Favorite Disney Movies</h1>
      <AddTodoForm onAddTodo={newTodo => setTodoList([...todoList, newTodo])} />
      {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} />}
    </>
  );
}

export default App;
