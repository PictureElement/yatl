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
    <li className="todo-item">
      <div class="todo-item__group-left">
        <input id="todo-0" type="checkbox" defaultChecked={true} />
        <label className="todo-item__label" htmlFor="todo-0">
          {props.task.title}
        </label>
      </div>
      <div class="todo-item__group-right">
        <button onClick={props.onClick} className="todo-item__button todo-item__button_delete" type="button">
          {/* <svg className="todo-item__icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><g><rect fill="none" height="24" width="24"/></g><g><path d="M12,2C6.47,2,2,6.47,2,12c0,5.53,4.47,10,10,10s10-4.47,10-10C22,6.47,17.53,2,12,2z M12,20c-4.42,0-8-3.58-8-8 c0-4.42,3.58-8,8-8s8,3.58,8,8C20,16.42,16.42,20,12,20z"/></g></svg> */}
          <svg className="todo-item__icon todo-item__icon_delete" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
        </button>
        <button onClick={props.onClick} className="todo-item__button todo-item__button_edit" type="button">
          {/* <svg className="todo-item__icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><g><rect fill="none" height="24" width="24"/></g><g><path d="M12,2C6.47,2,2,6.47,2,12c0,5.53,4.47,10,10,10s10-4.47,10-10C22,6.47,17.53,2,12,2z M12,20c-4.42,0-8-3.58-8-8 c0-4.42,3.58-8,8-8s8,3.58,8,8C20,16.42,16.42,20,12,20z"/></g></svg> */}
          <svg className="todo-item__icon todo-item__icon_edit" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px"><rect fill="none" height="24" width="24"/><path d="M3,10h11v2H3V10z M3,8h11V6H3V8z M3,16h7v-2H3V16z M18.01,12.87l0.71-0.71c0.39-0.39,1.02-0.39,1.41,0l0.71,0.71 c0.39,0.39,0.39,1.02,0,1.41l-0.71,0.71L18.01,12.87z M17.3,13.58l-5.3,5.3V21h2.12l5.3-5.3L17.3,13.58z"/></svg>
        </button>
      </div>
    </li>
  )
}

export default Task