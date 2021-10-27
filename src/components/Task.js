import { useState, useEffect } from 'react'; // Hooks
import db from '../firebase';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import ActiveButton from './ActiveButton';
import CompletedButton from './CompletedButton';

function Task(props) {

  // 'isEditing' state
  const [isEditing, setEditing] = useState(false);

  // 'newTitle' state
  const [newTitle, setNewTitle] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // Don't add empty tasks
    if (newTitle) {
      props.editTask(props.task.id, newTitle);
      // Clear new title
      setNewTitle('');
      // Return to viewing mode
      setEditing(false)
    }
  }

  let button;

  // Select button component based on task state
  if (props.task.is_active) {
    button = <ActiveButton onClick={props.updateStatus} />
  } else {
    button = <CompletedButton onClick={props.updateStatus} />
  }

  // Viewing template
  const viewTemplate = (
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
        <button onClick={() => props.deleteTask(props.task.id)} className="todo-item__button todo-item__button_danger mr-2" type="button">
          <svg className="todo-item__icon todo-item__icon_danger" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          <span className="visually-hidden">Delete task</span>
        </button>
        <button onClick={() => setEditing(true)} className="todo-item__button todo-item__button_primary" type="button">
          <svg className="todo-item__icon todo-item__icon_primary" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 20 20" height="18px" viewBox="0 0 20 20" width="18px"><rect fill="none" height="20" width="20"/><path d="M3,5h9v1.5H3V5z M3,11.25h6v1.5H3V11.25z M3,8.12h9v1.5H3V8.12z M16.78,11.99l0.65-0.65c0.29-0.29,0.29-0.77,0-1.06 l-0.71-0.71c-0.29-0.29-0.77-0.29-1.06,0l-0.65,0.65L16.78,11.99z M16.19,12.58L11.77,17H10v-1.77l4.42-4.42L16.19,12.58z"/></svg>
          <span className="visually-hidden">Edit task</span>
        </button>
      </div>
    </li>
  );

  // Editing template
  const editTemplate = (
    <li className="todo-item">
      <form class="d-flex justify-content-between align-items-center w-100" onSubmit={handleSubmit}>
        <div className="todo-item__group-left form-text">
          <label className="visually-hidden" htmlFor={props.task.id}>
            New title for {props.task.title}
          </label>
          <input
            className="form-text__input mr-2"
            id={props.task.id}
            type="text"
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
          />
        </div>
        <div className="todo-item__group-right">
          <button onClick={() => setEditing(false)} className="todo-item__button todo-item__button_primary mr-2" type="button">
            <svg className="todo-item__icon todo-item__icon_primary" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"><path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z"/></svg>
            <span className="visually-hidden">Cancel</span>
          </button>
          <button onClick={props.onClick} className="todo-item__button todo-item__button_success" type="submit">
            <svg className="todo-item__icon todo-item__icon_success" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"/></svg>
            <span className="visually-hidden">Save</span>
          </button>
        </div>
      </form>
    </li>
  );

  return (
    isEditing ? editTemplate : viewTemplate
  )
}

export default Task