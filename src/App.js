import React, { useState, useEffect } from 'react'; // Hooks
import Hero from './components/Hero'; // Hero component
import Task from './components/Task'; // Task component
import './App.scss'; // Root component styles
import db from './firebase';
import { collection, query, orderBy, addDoc, Timestamp, onSnapshot } from "firebase/firestore";
import NewTask from './components/NewTask';

function App() {
  /**
   * useState() hook creates a piece of state for a component, and its only parameter determines the initial value of that state.
   * It returns two things: the state, and a function that can be used to update the state later.
   */
  const [tasks, setTasks] = useState([]);

  const [filter, setFilter] = useState('all');

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
  }, []); // Array is empty, so the function passed will run only on first render.

  // Add document to Firestore
  const addDocument = async (title) => {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "tasks"), {
      is_active: true,
      created: Timestamp.now(),
      title: title
    });
    console.log("Document written with ID: ", docRef.id);
  }

  // You should always pass a unique key to anything you render with iteration. 
  const taskList = tasks.map(task => <Task key={task.id} task={task} />);
 
  return (
    <div className="App">
      <Hero title='Todo' />

      <NewTask addDocument={addDocument} />

      <section>
        <div className="container">
          <div>
            <ul
              className="todo-items"
              id="todo-items"
              aria-labelledby="list-heading"
            >
              {taskList}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div>
            <div className="todo-items" id="todo-items"></div>
            <div className="filters">
              <div id="list-heading" className="filters__count">0 tasks left</div>
              <div id="filters-group" className="filters__group" role="group" aria-label="Filter options">
                <button id="filter-all" className="filters__button filters__button_main filters__button_active" type="button">All</button>
                <button id="filter-active" className="filters__button filters__button_main" type="button">Active</button>
                <button id="filter-completed" className="filters__button filters__button_main" type="button">Completed</button>
              </div>
              <button id="clear-completed" className="filters__button filters__button_clear" type="button">Clear completed</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default App;