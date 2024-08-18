import React, { useRef, useEffect } from 'react';

const InputWithLabel = ({ todoTitle, handleTitleChange, children }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); 
  }, []);  

  return (
    <>
      <label htmlFor="todoTitle">{children}</label>
      <input
        type="text"
        id="todoTitle"
        name="title"
        value={todoTitle}
        onChange={handleTitleChange}
        ref={inputRef}  
      />
    </>
  );
};

export default InputWithLabel;
