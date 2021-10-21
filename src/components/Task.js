import db from '../firebase';
import { doc, deleteDoc } from "firebase/firestore";
import ActiveButton from './ActiveButton';
import CompletedButton from './CompletedButton';

function Task(props) {
  // Delete document from db
  const deleteTask = async (id) => {
    //await deleteDoc(doc(db, "tasks", id));
    alert('delete document');
  }
  
  let button;

  // Select button component based on task active state
  if (props.task.is_active) {
    button = <ActiveButton onClick={e => deleteTask(props.task.id)} />
  } else {
    button = <CompletedButton onClick={e => deleteTask(props.task.id)} />
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