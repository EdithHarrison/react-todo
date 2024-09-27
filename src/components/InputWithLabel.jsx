import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types'; 

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

// PropTypes definition
InputWithLabel.propTypes = {
  todoTitle: PropTypes.string.isRequired, 
  handleTitleChange: PropTypes.func.isRequired, 
  children: PropTypes.node.isRequired, 
};

export default InputWithLabel;
