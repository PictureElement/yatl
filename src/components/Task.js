import db from '../firebase';
import { doc, deleteDoc } from "firebase/firestore";

function Task(props) {
  // Delete document from db
  const deleteTask = async (id) => {
    //await deleteDoc(doc(db, "tasks", id));
    alert('delete document');
  }

  return (
    <article className="todo-item">
      <button onClick={e => deleteTask(props.task.id)} className="todo-item__button" type="button">
        <svg className="todo-item__icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
      </button>
      <div className="todo-item__title">
        <span>{props.task.title}</span>
      </div>
    </article>
  )
}

export default Task