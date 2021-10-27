import React, { useState } from 'react'

function NewTask(props) {

  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (title) {
      props.addDocument(title);
      // Clear title
      setTitle('');
    }
  }

  function handleOnChange(e) {
    setTitle(e.target.value);
  }

  return (
    <section className="new-task">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="task-input" className="input__label visually-hidden">Add a task</label>
            <input
              onChange={handleOnChange}
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
