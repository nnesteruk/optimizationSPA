import React, { useEffect, useState } from 'react';

export const CounterButton = ({ count, getCount }) => {
  const [newCount, setNewCount] = useState(count);

  useEffect(() => {
    getCount(newCount);
  }, [newCount]);

  const handleClick = () => setNewCount((prev) => prev + 1);
  return (
    <div>
      <h1>{newCount}</h1>
      <button onClick={handleClick}>Увеличить</button>
    </div>
  );
};
