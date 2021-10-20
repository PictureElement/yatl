import React, { useState } from 'react';
import Task from './components/Task';
import TextField from './components/TextField';
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
      {/* Hero component */}
      <Hero title='Todo' />
      {/* TextField component */}
      <TextField />
      <section>
        <div class="container">
          <div>
            <div class="todo-items" id="todo-items">
              {tasks.map(task => (
                // Task component
                <Task text={task} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
