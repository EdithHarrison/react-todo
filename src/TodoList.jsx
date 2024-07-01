import React from 'react';

const todoList = [
  { id: 1, title: 'The Little Mermaid' },
  { id: 2, title: 'Toy Story' },
  { id: 3, title: 'Moana' }
];

const TodoList = () => {
    return (
        <ul>
            {todoList.map(item => (
                <li key={item.id}>{item.title}</li>
            ))}
        </ul>
    );
};

export default TodoList;