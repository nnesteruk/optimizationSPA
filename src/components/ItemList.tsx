import React, { useMemo } from 'react';

export const ItemList = ({ list, search }) => {
  const result = useMemo(() => {
    return search ? list.filter((item) => item.name.toLowerCase() === search.toLowerCase()) : list;
  }, [search, list]);

  return (
    <div>
      {result.length > 0 ? (
        result.map((item) => <li key={item.id}>{item.name}</li>)
      ) : (
        <p>Ничего не найдено</p>
      )}
    </div>
  );
};
