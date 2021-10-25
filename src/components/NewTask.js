import React from 'react'

function NewTask(props) {
  return (
    <section className="new-task">
      <div className="container">
        <div className="input">
          <label htmlFor="task-input" className="input__label sr-only">Add a task</label>
          <input
            onChange=""
            value=""
            type="text"
            id="task-input"
            className="input__control"
            autoComplete="off" 
            placeholder="Add a task"
          />
        </div>
      </div>
    </section>
  )
}

export default NewTask
