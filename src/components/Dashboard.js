import React, { useState, useEffect } from 'react';
import { db, auth } from '../api/firebase';
import { collection, query, orderBy, addDoc, Timestamp, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { sendEmailVerification, signOut } from "firebase/auth";
import Hero from './Hero';
import Task from './Task';
import NewTask from './NewTask';
import Dialog from '@mui/material/Dialog';
import Snackbar from '@mui/material/Snackbar';
import Select from './Select';
import sound from '../assets/complete.mp3';
import './Dashboard.scss';
import { useHistory } from "react-router-dom";

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

function Tasks(props) {

  /**
   * useState() hook creates a piece of state for a component, and its only parameter determines the initial value of that state.
   * It returns two things: the state, and a function that can be used to update the state later.
   */
  const [showDeleteCompletedDialog, setShowDeleteCompletedDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [filter, setFilter] = useState('All');
  const [tasks, setTasks] = useState([]);
  const [taskIdToDelete, setTaskIdToDelete] = useState('');
  // Server error
  const [serverError, setServerError] = useState('');
  // By default we are not loading.
  const [loading, setLoading] = useState(false);
  
  // The useHistory hook gives you access to the history instance that you may use to navigate.
  let history = useHistory();

  /**
   * useEffect hook
   * This hook lets you perform "side effects". For example, data fetching, setting up a subscription, and manually changing the DOM in React components.
   * The function passed to useEffect will run after every render but ...
   * ... you can tell React to skip applying an effect if certain values haven’t changed between re-renders by passing an array as an optional second argument to useEffect.
   */
  useEffect(() => {
    // Verify user
    if (props.user.emailVerified === false) {
      verifyEmail();
    }
    
    // Query with descending order by document "created" field
    const q = query(collection(db, props.user.uid), orderBy("created", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
    
    // Detach listeners when the component unmounts
    return () => {
      unsubscribe();
    }
  }, []); // Array is empty, so the function passed will run only on first render.

  // Add document to Firestore
  const handleAddTask = async (title) => {
    // Add a new document with a generated id (uid is collection)
    await addDoc(collection(db, props.user.uid), {
      completed: false,
      created: Timestamp.now(),
      title: title
    });
  }

  // Delete document from Firestore
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, props.user.uid, id));
  }

  // Delete all completed tasks
  const handleDeleteAllClick = () => {
    // Delete completed tasks from Firestore
    tasks.filter(FILTER_MAP['Completed']).forEach(task => deleteTask(task.id));
    // Close dialog
    setShowDeleteCompletedDialog(false);
  }

  function handleDeleteClick() {
    // Delete task from Firestore
    deleteTask(taskIdToDelete);
    // Hide dialog
    setShowDeleteDialog(false);
  }

  // Edit task title
  const handleEditTask = async (id, title) => {
    const taskRef = doc(db, props.user.uid, id);

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
    const taskRef = doc(db, props.user.uid, id);

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

  // Log Out
  function handleLogOut() {
    // Start loading (disable Log out button)
    setLoading(true);
    // No error at the moment
    setServerError('');
    signOut(auth).then(() => {
      // Sign-out successful.
      // Navigate to login page
      history.push("/login");
    }).catch((error) => {
      // An error happened.
      const errorCode = error.code;
      let errorMessage;

      switch (errorCode) {
        default:
          errorMessage = 'Sorry, something went wrong. Try again.';
      }

      // Set error message
      setServerError(errorMessage);
      // Stop loading
      setLoading(false);
    });
  }

  function verifyEmail() {
    sendEmailVerification(props.user)
      .then(() => {
        // Email verification sent!
      }).catch((error) => {
        // An error happened.
        const errorCode = error.code;
        let errorMessage;

        switch (errorCode) {
          case 'auth/too-many-requests':
            errorMessage = 'Too many attempts to resend email. Try again later.';
            break;
          default:
            errorMessage = 'Sorry, something went wrong. Try again.';
        }

        // Set error message
        setServerError(errorMessage);
        // Stop loading
        setLoading(false);
      });
  }

  // Array of <Task /> elements. You should always pass a unique key to anything you render with iteration.
  const taskList = tasks.filter(FILTER_MAP[filter]).map(task => <Task key={task.id} task={task} setTaskIdToDelete={setTaskIdToDelete} setShowDeleteDialog={setShowDeleteDialog} onUpdateStatus={handleUpdateStatus} onEditTask={handleEditTask} />);

  // Active task count
  const activeTaskCount = tasks.filter(FILTER_MAP['Active']).length;
  const toolbarCountText = `${activeTaskCount} ${activeTaskCount === 1 ? 'task' : 'tasks'} left`;
 
  // Complete task count
  const completeTaskCount = tasks.filter(FILTER_MAP['Completed']).length;
  
  return (
    <div className="Tasks">
      {
        props.user === null
          ? (null)
          : props.user.emailVerified === true
            ?
              <>
                <Dialog
                  className="dialog"
                  open={showDeleteCompletedDialog}
                  onClose={() => setShowDeleteCompletedDialog(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <h2 className="dialog__title" id="alert-dialog-title">Delete all completed tasks?</h2>
                  <p className="dialog__text" id="alert-dialog-description">This is a permanent action.</p>
                  <div className="dialog__actions">
                    <button className="dialog__button mr-2" onClick={() => setShowDeleteCompletedDialog(false)}>Cancel</button>
                    <button className="dialog__button dialog__button_negative" onClick={handleDeleteAllClick}>Delete all</button>
                  </div>
                </Dialog>

                <Dialog
                  className="dialog"
                  open={showDeleteDialog}
                  onClose={() => setShowDeleteDialog(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <h2 className="dialog__title" id="alert-dialog-title">Delete task?</h2>
                  <p className="dialog__text" id="alert-dialog-description">This is a permanent action.</p>
                  <div className="dialog__actions">
                    <button className="dialog__button mr-2" onClick={() => setShowDeleteDialog(false)}>Cancel</button>
                    <button className="dialog__button dialog__button_negative" onClick={handleDeleteClick}>Delete</button>
                  </div>
                </Dialog>

                <Hero title='My tasks' loading={loading} onLogOut={handleLogOut} />

                <NewTask onAddTask={handleAddTask} />

                <section className="mt-8">
                  <div className="container">
                    <div className="toolbar">
                      <div id="toolbar-count" className="toolbar__count">{toolbarCountText}</div>
                      <Select setFilter={setFilter} />
                    </div>
                  </div>
                </section>
                
                <section>
                  <div className="container">
                    <ul
                      className="my-8"
                      aria-labelledby="toolbar-count"
                    >
                      {taskList}
                    </ul>
                    {completeTaskCount > 0 &&
                      <button
                        onClick={() => setShowDeleteCompletedDialog(true)}
                        className="toolbar__delete mb-8"
                        type="button"
                      >
                        Delete completed
                      </button>
                    }
                  </div>
                </section>
                
                {serverError && <Snackbar open={true} autoHideDuration={4000} onClose={() => setServerError('')} message={serverError} />}
              </>
            : 
              <>
                <Hero title='Verify Email' loading={loading} onLogOut={handleLogOut} />
                <>
                  <section className="verification">
                    <div className="container">
                      <p className="verification__paragraph">We've sent an email to <strong>{props.user.email}</strong>. Click the link in the email to confirm your address and activate your account.</p>
                      <hr></hr>
                      <p className="verification__microcopy">Still can't find the email? <button onClick={verifyEmail} className="verification__button">Resend Email</button></p>
                    </div>
                  </section>
                </>
                {serverError && <Snackbar open={true} autoHideDuration={4000} onClose={() => setServerError('')} message={serverError} />}
              </>
      }
    </div>
  );
}

export default Tasks;