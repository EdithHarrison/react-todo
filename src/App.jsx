import React from 'react';

const todoList = [
  { id: 1, title: 'The Little Mermaid' },
  { id: 2, title: 'Toy Story' },
  { id: 3, title: 'Moana' }
];

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

