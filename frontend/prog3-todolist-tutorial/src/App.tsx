import { useState, useEffect } from 'react'
import './App.css'

interface Todo {
  id: number;
  name: string;
  isDone: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetch('http://localhost/api/get')
      .then(response => response.json())
      .then(setTodos);
  }, []);

  function addTodo() {
    fetch('http://localhost/api/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: input, isDone: false })
    })
      .then(response => response.json())
      .then(newTodo => setTodos([...todos, newTodo]));

    setInput('');
  }

  function checkTodo(id: number) {
    fetch('http://localhost/api/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
      .then(() => setTodos(todos.map(todo => todo.id === id ? { ...todo, isDone: true } : todo)));
  }

  function uncheckTodo(id: number) {
    fetch('http://localhost/api/uncheck', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
      .then(() => setTodos(todos.map(todo => todo.id === id ? { ...todo, isDone: false } : todo)));
  }

  function deleteCheckedTodos() {
    fetch('http://localhost/api/delete', { method: 'POST' })
      .then(() => setTodos(todos.filter(todo => !todo.isDone)));
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={() => todo.isDone ? uncheckTodo(todo.id) : checkTodo(todo.id)}
            />
            {todo.name}
          </li>
        ))}
      </ul>
      <button onClick={deleteCheckedTodos}>Delete Checked</button>
    </div>
  )
}

export default App

