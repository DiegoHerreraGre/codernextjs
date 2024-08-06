import React, { useState } from 'react';

const Counter = ({ initialValue = 1, onChange }) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    onChange(newCount);
  };

  const decrement = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      onChange(newCount);
    }
  };

  return (
    <div className="flex items-center">
      <button 
        onClick={decrement}
        className="px-2 py-1 bg-gray-200 rounded-l"
        disabled={count <= 1}
      >
        -
      </button>
      <span className="px-4 py-1 bg-gray-100">{count}</span>
      <button 
        onClick={increment}
        className="px-2 py-1 bg-gray-200 rounded-r"
      >
        +
      </button>
    </div>
  );
};

export default Counter;