import { useState, useEffect } from 'react'; // Hooks
import db from '../firebase';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import ActiveButton from './ActiveButton';
import CompletedButton from './CompletedButton';

function Task(props) {
  
  // Update task status
  const updateStatus = async () => {
    const taskRef = doc(db, 'tasks', props.task.id);

    if (props.task.is_active) {
      await updateDoc(taskRef, {
        is_active: false
      });
    } else {
      await updateDoc(taskRef, {
        is_active: true
      });
    }
  }

  let button;

  // Select button component based on task active state
  if (props.task.is_active) {
    button = <ActiveButton onClick={updateStatus} />
  } else {
    button = <CompletedButton onClick={updateStatus} />
  }

  return (
    <article className="todo-item">
      {button}
      <div className="todo-item__title">
        <span>{props.task.title}</span>
      </div>
    </article>
  )
}

export default Task