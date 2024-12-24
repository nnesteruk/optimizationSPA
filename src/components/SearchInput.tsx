import React, { useEffect, useState } from 'react';

export const SearchInput = ({ search, change }) => {
  const [newSearch, setNewSearch] = useState(search);
  const searchChange = (event) => {
    setNewSearch(event.target.value);
  };
  useEffect(() => {
    change(newSearch);
  }, [newSearch]);

  return (
    <div>
      <input onChange={searchChange} placeholder="search something" />
    </div>
  );
};
