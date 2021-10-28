import React, { useState, useEffect } from 'react'; // Hooks
import Hero from './components/Hero'; // Hero component
import Task from './components/Task'; // Task component
import db from './firebase';
import { collection, query, orderBy, addDoc, Timestamp, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import NewTask from './components/NewTask';
import FilterButton from './components/FilterButton';
import sound from './assets/complete.mp3';

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

// Array ["All", "Active", "Completed"]
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  // 'filter' state 
  const [filter, setFilter] = useState('All');
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
         * { id: '', title: '', completed: ''}
         */
        tasks.push({
          id: doc.id,
          /**
           * Spread operator: pass all key:value pairs from doc.data() object
           * (e.g. title: 'Haircut', completed: 'true')
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
      completed: false,
      created: Timestamp.now(),
      title: title
    });
    console.log("Document written with ID: ", docRef.id);
  }

  // Clear completed tasks
  const clearCompleted = () => {
    if (window.confirm('Clear all completed tasks? This is a permanent action.')) {
      tasks.filter(FILTER_MAP['Completed']).forEach(task => deleteTask(task.id));
    }
  }

  // Delete document from Firestore
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  }

  // Edit task title
  const editTask = async (id, title) => {
    const taskRef = doc(db, 'tasks', id);

    // Update task title
    await updateDoc(taskRef, {
      title: title
    });
  }

  // Update task status
  const updateStatus = async (id) => {
    const taskRef = doc(db, 'tasks', id);

    // Find task
    const task = tasks.find(task => task.id === id);

    // Play sound only for tasks transitioning from active to completed state
    if (task.completed === false) {
      playSound();
    }

    // Update task status
    await updateDoc(taskRef, {
      completed: !task.completed
    });
  }

  // Play sound when task in completed
  function playSound() {
    const audio = new Audio(sound);
    audio.play();
  }

  // Array of <FilterButton /> elements. You should always pass a unique key to anything you render with iteration.
  const filterList = FILTER_NAMES.map(name => <FilterButton key={name} name={name} setFilter={setFilter} isPressed={name === filter} />);

  // Array of <Task /> elements. You should always pass a unique key to anything you render with iteration.
  const taskList = tasks.filter(FILTER_MAP[filter]).map(task => <Task key={task.id} task={task} updateStatus={updateStatus} deleteTask={deleteTask} editTask={editTask} />);

  // Calculate active task count
  const activeTaskCount = tasks.filter(task => task.completed === false).length;
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
              {filterList}
            </div>
            <button onClick={clearCompleted} className="header__button header__button_clear" type="button">Clear completed</button>
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