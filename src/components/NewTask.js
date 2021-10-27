import React, { useState } from 'react'

function NewTask(props) {

  // 'title' state
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // Don't add empty tasks
    if (title) {
      props.addTask(title);
      // Clear title
      setTitle('');
    }
  }

  return (
    <section className="new-task">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="task-input" className="input__label visually-hidden">Add a task</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              id="task-input"
              className="input__control"
              autoComplete="off" 
              placeholder="Add a task"
            />
          </div>
        </form>
      </div>
    </section>
  )
}

export default NewTask
