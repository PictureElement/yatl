import { useState, useEffect } from 'react'; // Hooks
import './Task.scss';

function Task(props) {
  // 'textDecoration' state
  const [textDecoration, setTextDecoration] = useState('');

  // 'editing' state
  const [editing, setEditing] = useState(false);

  // 'newTitle' state
  const [newTitle, setNewTitle] = useState('');

  /**
   * useEffect hook
   * The function passed to useEffect will run after every render but ...
   * ... you can tell React to skip applying an effect if certain values haven’t changed between re-renders by passing an array as an optional second argument to useEffect.
   */
  useEffect(() => {
    if (props.task.completed) {
      setTextDecoration('line-through');
    } else {
      setTextDecoration('');
    }
  }, [props.task.completed]);

  function handleSubmit(e) {
    e.preventDefault();
    // Don't add empty tasks
    if (newTitle) {
      props.onEditTask(props.task.id, newTitle);
      // Clear new title
      setNewTitle('');
      // Return to viewing mode
      setEditing(false)
    }
  }

  function handleCancelClick() {
    // Cancel editing and return to viewing mode
    setEditing(false);
    // Clear new title
    setNewTitle('');
  }

  function handleDeleteTaskClick() {
    // Show confirm dialog
    props.setShowDeleteDialog(true);
    // Set id of task to be deleted
    props.setTaskIdToDelete(props.task.id);
  }

  function handleChange() {

    // Apply a strike-through style to tasks transitioning from active to completed state
    if (props.task.completed === false) {
      setTextDecoration('line-through');
    } else {
      setTextDecoration('');
    }

    props.onUpdateStatus(props.task.id);
  }

  // Viewing template
  const viewTemplate = (
    <li className="todo-item fadeInUp">
      <div className="todo-item__group-left">
        <input
          className="todo-item__input-checkbox"
          id={props.task.id}
          type="checkbox"
          defaultChecked={props.task.completed}
          onChange={handleChange}
        />
        <label className={`todo-item__label ${textDecoration}`} htmlFor={props.task.id}>
          {props.task.title}
        </label>
      </div>
      <div className="todo-item__group-right">
        <button tooltip="Delete" flow="down" onClick={handleDeleteTaskClick} className="todo-item__button todo-item__button_danger mr-2" type="button">
          <svg className="todo-item__icon todo-item__icon_danger" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
          <span className="visually-hidden">Delete task</span>
        </button>
        <button tooltip="Edit" flow="down" onClick={() => setEditing(true)} className="todo-item__button todo-item__button_secondary" type="button">
          <svg className="todo-item__icon todo-item__icon_secondary" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="18px" viewBox="0 0 24 24" width="18px"><g><rect fill="none" height="24" width="24"/></g><g><g><g><path d="M3,21l3.75,0L17.81,9.94l-3.75-3.75L3,17.25L3,21z M5,18.08l9.06-9.06l0.92,0.92L5.92,19L5,19L5,18.08z"/></g><g><path d="M18.37,3.29c-0.39-0.39-1.02-0.39-1.41,0l-1.83,1.83l3.75,3.75l1.83-1.83c0.39-0.39,0.39-1.02,0-1.41L18.37,3.29z"/></g></g></g></svg>
          <span className="visually-hidden">Edit task</span>
        </button>
      </div>
    </li>
  );

  // Editing template
  const editTemplate = (
    <li className="todo-item">
      <form className="d-flex justify-content-between align-items-center w-100" onSubmit={handleSubmit}>
        <div className="todo-item__group-left">
          <label className="visually-hidden" htmlFor={props.task.id}>
            New title for {props.task.title}
          </label>
          <input
            enterkeyhint="done"
            autoFocus
            className="todo-item__input-text mr-2"
            id={props.task.id}
            type="text"
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
            autoComplete="off"
          />
        </div>
        <div className="todo-item__group-right">
          <button tooltip="Cancel" flow="down" onClick={handleCancelClick} className="todo-item__button todo-item__button_secondary mr-2" type="button">            
            <svg className="todo-item__icon todo-item__icon_secondary" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"><path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z"/></svg>
            <span className="visually-hidden">Cancel</span>
          </button>
          <button tooltip="Save" flow="down" className="todo-item__button todo-item__button_success" type="submit">            
            <svg className="todo-item__icon todo-item__icon_success" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"/></svg>
            <span className="visually-hidden">Save</span>
          </button>
        </div>
      </form>
    </li>
  );

  return (
    editing ? editTemplate : viewTemplate
  )
}

export default Task