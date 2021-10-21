import React, { useState, useEffect } from 'react'; // Hooks
import Hero from './components/Hero'; // Hero component
import TextField from './components/TextField'; // TextField component
import Task from './components/Task'; // Task component
import './App.scss'; // Root component styles
import db from './firebase';
import { collection, query, orderBy, addDoc, Timestamp, onSnapshot } from "firebase/firestore";

function App() {
  /**
   * useState hook
   * Declare a new state variable, which we'll call "tasks"
   * We can use "setTasks" to change "tasks" at any time
   */
  const [tasks, setTasks] = useState([]);

  const [input, setInput] = useState('');

  /**
   * useEffect hook
   * This hook lets you perform "side effects". For example, data fetching, setting up a subscription, and manually changing the DOM in React components.
   * The function passed to useEffect will run after every render but ...
   * ... you can tell React to skip applying an effect if certain values haven’t changed between re-renders by passing an array as an optional second argument to useEffect.
   */
  useEffect(() => {
    // Query with descending order by document "created" field
    const q = query(collection(db, "tasks"), orderBy("created", "desc"));
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
      // Set state variable 'tasks'
      setTasks(tasks);
    });
  }, []); // Array is empty, so the function passed will run on first render only.


  // Run this when a key is released on input element
  const addTask = (e) => {
    // Ignore keyup during IME composition
    if (e.isComposing || e.keyCode === 229) {
      return;
    }
    // Run this only on 'Enter' key
    if (e.key === 'Enter' || e.keyCode === 13) {
      // Check if input is not empty
      if (e.target.value) {
        // Update state variable "tasks"
        addDocument();
      }
    }
  };

  // Add document to Firestore
  const addDocument = async () => {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "tasks"), {
      is_active: true,
      created: Timestamp.now(),
      title: input
    });
    console.log("Document written with ID: ", docRef.id);
    // Clear input
    setInput('');
  }

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
                <Task key={task.id} text={task.title} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;