import React, { useState, useEffect } from 'react'; // Hooks
import Hero from '../Hero/Hero'; // Hero component
import Task from '../Task/Task'; // Task component
import db from '../../firebase';
import { collection, query, orderBy, addDoc, Timestamp, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import NewTask from '../NewTask/NewTask';
import FilterButton from '../FilterButton/FilterButton';
import Dialog from '@mui/material/Dialog';
import sound from '../../assets/complete.mp3';
import './App.scss';

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

// Array ["All", "Active", "Completed"]
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {

  /**
   * useState() hook creates a piece of state for a component, and its only parameter determines the initial value of that state.
   * It returns two things: the state, and a function that can be used to update the state later.
   */
  const [showDeleteCompletedDialog, setShowDeleteCompletedDialog] = useState(false);
  const [filter, setFilter] = useState('All');
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
  const handleAddTask = async (title) => {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "tasks"), {
      completed: false,
      created: Timestamp.now(),
      title: title
    });
    console.log("Document written with ID: ", docRef.id);
  }

  // Delete document from Firestore
  const handleDeleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  }

  // Delete all completed tasks
  const handleClick = () => {
    // Delete completed tasks from Firestore
    tasks.filter(FILTER_MAP['Completed']).forEach(task => handleDeleteTask(task.id));
    // Close dialog
    setShowDeleteCompletedDialog(false);
  }

  // Edit task title
  const handleEditTask = async (id, title) => {
    const taskRef = doc(db, 'tasks', id);

    // Update task title
    await updateDoc(taskRef, {
      title: title
    });
  }

  // Play sound
  function playSound() {
    const audio = new Audio(sound);
    audio.play();
  }

  // Update task status
  const handleUpdateStatus = async (id) => {
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

  // Array of <FilterButton /> elements. You should always pass a unique key to anything you render with iteration.
  const filterList = FILTER_NAMES.map(name => <FilterButton key={name} name={name} setFilter={setFilter} pressed={name === filter} />);

  // Array of <Task /> elements. You should always pass a unique key to anything you render with iteration.
  const taskList = tasks.filter(FILTER_MAP[filter]).map(task => <Task key={task.id} task={task} onUpdateStatus={handleUpdateStatus} onDeleteTask={handleDeleteTask} onEditTask={handleEditTask} />);

  // Calculate active task count
  const activeTaskCount = tasks.filter(task => task.completed === false).length;
  const headerCountText = `${activeTaskCount} ${activeTaskCount === 1 ? 'task' : 'tasks'} left`;
 
  return (
    <div className="App">

      <Dialog
        className="dialog"
        open={showDeleteCompletedDialog}
        onClose={(e) => setShowDeleteCompletedDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <h2 className="dialog__title" id="alert-dialog-title">Delete all completed tasks?</h2>
        <p className="dialog__text" id="alert-dialog-description">This is a permanent action.</p>
        <div class="dialog__actions">
          <button className="dialog__button mr-2" onClick={(e) => setShowDeleteCompletedDialog(false)}>Cancel</button>
          <button className="dialog__button dialog__button_negative" onClick={handleClick}>Delete all</button>
        </div>
      </Dialog>
      
      <Hero title='To do' />

      <NewTask onAddTask={handleAddTask} />
      
      <section className="mt-12">
        <div className="container">
          <ul
            id="todo-items"
            aria-labelledby="header-count"
          >
            {taskList}
          </ul>
        </div>
      </section>

      <section className="my-12">
        <div className="container">
          <div className="header">
            <div id="header-count" className="header__count">{headerCountText}</div>
            <div className="header__filters" role="group" aria-label="Filter options">
              {filterList}
            </div>
            <button onClick={(e) => setShowDeleteCompletedDialog(true)} className="header__clear" type="button">Delete completed</button>
          </div>
        </div>
      </section>
      
    </div>
  );
}

export default App;