import { useState, useEffect } from 'react'; // Hooks
import db from '../firebase';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import ActiveButton from './ActiveButton';
import CompletedButton from './CompletedButton';

function Task(props) {
  
  let button;

  // Select button component based on task state
  if (props.task.is_active) {
    button = <ActiveButton onClick={props.updateStatus} />
  } else {
    button = <CompletedButton onClick={props.updateStatus} />
  }

  return (
    <li className="todo-item">
      <div className="todo-item__group-left form-check">
        <input
          className="form-check__input"
          id={props.task.id}
          type="checkbox"
          defaultChecked={props.task.is_active}
          onChange={() => props.updateStatus(props.task.id)}
        />
        <label className="todo-item__label form-check__label" htmlFor={props.task.id}>
          {props.task.title}
        </label>
      </div>
      <div className="todo-item__group-right">
        <button onClick={props.onClick} className="todo-item__button todo-item__button_delete" type="button">
          <svg className="todo-item__icon todo-item__icon_delete" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
        </button>
        <button onClick={props.onClick} className="todo-item__button todo-item__button_edit" type="button">
          <svg className="todo-item__icon todo-item__icon_edit" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 20 20" height="18px" viewBox="0 0 20 20" width="18px"><rect fill="none" height="20" width="20"/><path d="M3,5h9v1.5H3V5z M3,11.25h6v1.5H3V11.25z M3,8.12h9v1.5H3V8.12z M16.78,11.99l0.65-0.65c0.29-0.29,0.29-0.77,0-1.06 l-0.71-0.71c-0.29-0.29-0.77-0.29-1.06,0l-0.65,0.65L16.78,11.99z M16.19,12.58L11.77,17H10v-1.77l4.42-4.42L16.19,12.58z"/></svg>
        </button>
      </div>
    </li>
  )
}

export default Task