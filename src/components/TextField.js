import React from 'react'

function TextField() {
    return (
        <section class="new-task">
            <div class="container">
                <div class="input-group">
                    <div class="input-group__prefix">
                        <svg class="input-group__icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                    </div>
                    <div class="input-group__infix">
                        <label for="task-input" class="input-group__label sr-only">Add a task</label>
                        <input id="task-input" class="input-group__control" type="text" placeholder="Add a task" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TextField
