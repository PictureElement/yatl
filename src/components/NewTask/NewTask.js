import React, { useState } from 'react';
import './NewTask.scss';

function NewTask(props) {

  // 'title' state
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // Don't add empty tasks
    if (title) {
      props.onAddTask(title);
      // Clear title
      setTitle('');
    }
  }

  return (
    <section className="new-task">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="task-input" className="visually-hidden">Add a task</label>
          <input
            enterkeyhint="done"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            id="task-input"
            className="new-task__input"
            autoComplete="off" 
            placeholder="Add a task"
          />
        </form>
      </div>
    </section>
  )
}

export default NewTask
