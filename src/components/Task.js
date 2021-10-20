function Task(props) {
    return (
        <article class="todo-item">
            <button data-completed="" data-id="qx7JADarsb6BnuN9H3Cj" class="todo-item__button" type="button">
                <svg class="todo-item__icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
            </button>
            <div class="todo-item__title">
                <span>{props.text}</span>
            </div>
        </article>
    )
}

export default Task
