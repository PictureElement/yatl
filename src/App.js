import React, { useState, useEffect } from 'react'; // Hooks
import Hero from './components/Hero'; // Hero component
import Task from './components/Task'; // Task component
import './App.scss'; // Root component styles
import db from './firebase';
import { collection, query, orderBy, addDoc, Timestamp, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import NewTask from './components/NewTask';

function App() {
  /**
   * useState() hook creates a piece of state for a component, and its only parameter determines the initial value of that state.
   * It returns two things: the state, and a function that can be used to update the state later.
   */
  const [tasks, setTasks] = useState([]);
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
      // Set 'tasks' state
      setTasks(tasks);
    });
  }, []); // Array is empty, so the function passed will run only on first render.

  // Add document to Firestore
  const addTask = async (title) => {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "tasks"), {
      is_active: true,
      created: Timestamp.now(),
      title: title
    });
    console.log("Document written with ID: ", docRef.id);
  }

  // Delete document from Firestore
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  }

  // Update task status
  const updateStatus = async (id) => {
    const taskRef = doc(db, 'tasks', id);

    // Find task
    const task = tasks.find(task => task.id === id);

    // Update task status
    await updateDoc(taskRef, {
      is_active: !task.is_active
    });
  }

  // You should always pass a unique key to anything you render with iteration. 
  const taskList = tasks.map(task => <Task key={task.id} task={task} updateStatus={updateStatus} deleteTask={deleteTask} />);

  const activeTaskCount = tasks.filter(task => task.is_active === true).length;
  const headerCountText = `${activeTaskCount} ${activeTaskCount === 1 ? 'task' : 'tasks'} left`;
 
  return (
    <div className="App">
      <Hero title='Todo' />

      <NewTask addTask={addTask} />

      <section>
        <div className="container">
          <div className="header">
            <div id="header-count" className="header__count">{headerCountText}</div>
            <div className="header__filters" role="group" aria-label="Filter options">
              <button className="header__button header__button_filter header__button_active" type="button">All</button>
              <button className="header__button header__button_filter" type="button">Active</button>
              <button className="header__button header__button_filter" type="button">Completed</button>
            </div>
            <button className="header__button header__button_clear" type="button">Clear completed</button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <ul
            className="todo-items"
            id="todo-items"
            aria-labelledby="header-count"
          >
            {taskList}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default App;