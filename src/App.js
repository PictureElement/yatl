import React, { useState } from 'react';
import Task from './components/Task';
import TextField from '@mui/material/TextField';
import './App.scss';
import Hero from './components/Hero';

function App() {
  /**
   * useState hook
   * Declare a new state variable, which we'll call "tasks"
   * We can use "setTasks" to change "tasks" at any time
   */
  const [tasks, setTasks] = useState([
    'Go to dentist',
    'Go shopping'
  ]);

  const [input, setInput] = useState('');

  // Run this when enter key is released on input element
  const addTask = (e) => {
    // Ignore keyup during IME composition
    if (e.isComposing || e.keyCode === 229) {
      return;
    }
    if (e.key === 'Enter' || e.keyCode === 13) {
      // Check if input is not empty
      if (e.target.value) {
        // Update state variable "tasks"
        setTasks([...tasks, e.target.value]);
        // Clear input
        setInput('');
      }
    }
  };

  return (
    <div className="App">
      <Hero title='Todo' />
      {/* MUI component */}
      <TextField value={input} onKeyUp={addTask} onChange={e => setInput(e.target.value)} label="Add a task" variant="outlined" />
      <ul>
        {tasks.map(task => (
          // Functional component
          <Task text={task} />
        ))}
      </ul>
    </div>
  );
}

export default App;
