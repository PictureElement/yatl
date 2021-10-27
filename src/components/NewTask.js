import React from 'react'

function NewTask(props) {

  function handleSubmit(e) {
    e.preventDefault();
    alert('Submit');
  }

  function handleOnChange(e) {
    props.updateTitle(e.target.value);
  }

  return (
    <section className="new-task">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="task-input" className="input__label visually-hidden">Add a task</label>
            <input
              onChange={handleOnChange}
              value={props.title}
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
