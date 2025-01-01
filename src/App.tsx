import { useCallback, useState } from 'react';
import './App.css';
import { SearchInput } from './components/SearchInput';
import { ItemList } from './components/ItemList';
import { CounterButton } from './components/CounterButton';
import { ThemeToggle } from './components/ThemeToggle';
import { ThemeContext, themes } from './contexts/ThemeContext';
import { Registration } from './components/registration/Registration';

function App() {
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState('');
  const [list, setList] = useState([
    { id: 1, name: 'stella', value: 16, isActive: true },
    { id: 2, name: 'lera', value: 67, isActive: false },
    { id: 3, name: 'sasha', value: 34, isActive: false },
    { id: 4, name: 'natasha', value: 28, isActive: false },
    { id: 5, name: 'igor', value: 2, isActive: false },
    { id: 6, name: 'slava', value: 66, isActive: false },
    { id: 7, name: 'vasya', value: 69, isActive: true },
    { id: 8, name: 'yulya', value: 29, isActive: false },
    { id: 9, name: 'dima', value: 15, isActive: false },
    { id: 10, name: 'kostya', value: 66, isActive: true },
  ]);

  const getSearch = useCallback((search) => {
    setSearch(search);
  }, []);

  const getNewCount = useCallback((count) => {
    setCount(count);
  }, []);

  return (
    <>
      <SearchInput search={search} change={getSearch} />
      <ItemList list={list} search={search} />
      <CounterButton count={count} getCount={getNewCount} />
      <ThemeContext.Consumer>
        {({ theme, setTheme }) => (
          <ThemeToggle
            value={theme === themes.dark}
            onChange={() => {
              if (theme === themes.light) setTheme(themes.dark);
              if (theme === themes.dark) setTheme(themes.light);
            }}
          />
        )}
      </ThemeContext.Consumer>
      <Registration />
    </>
  );
}

export default App;
