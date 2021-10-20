import React, { useState, useEffect } from 'react'; // Hooks
import Hero from './components/Hero'; // Hero component
import TextField from './components/TextField'; // TextField component
import Task from './components/Task'; // Task component
import './App.scss'; // Root component styles
import db from './firebase';
import { collection, query, addDoc, getDoc, setDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";

function App() {
  /**
   * useState hook
   * Declare a new state variable, which we'll call "tasks"
   * We can use "setTasks" to change "tasks" at any time
   */
  const [tasks, setTasks] = useState([
    // Initial state
  ]);

  const [input, setInput] = useState('');

  /**
   * useEffect hook
   * This hook lets you perform "side effects". For example, data fetching, setting up a subscription, and manually changing the DOM in React components.
   * The function passed to useEffect will run after every render but ...
   * ... you can tell React to skip applying an effect if certain values haven’t changed between re-renders by passing an array as an optional second argument to useEffect.
   */
  useEffect(() => {
    const q = query(collection(db, "tasks"));
    // Realtime updates
    onSnapshot(q, (querySnapshot) => {
      const tasks = [];
      querySnapshot.forEach((doc) => {
        /**
         * 'tasks' is an array of objects
         * each object structure is:
         * { id: '', title: '', is_active: ''}
         */
        tasks.push({
          id: doc.id,
          /**
           * Spread operator: pass all key:value pairs from doc.data() object
           * (e.g. title: 'Haircut', is_active: 'true')
           */
          ...doc.data()
        });
      });
      // Set the initial state
      setTasks(tasks);
    });
  }, []); // Array is empty, so the function passed will run on first render only.


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
      <TextField value={input} onKeyUp={addTask} onChange={e => setInput(e.target.value)} label="Add a task" />
      <section>
        <div className="container">
          <div>
            <div className="todo-items" id="todo-items">
              {tasks.map(task => (
                // Task component
                <Task text={task.title} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;