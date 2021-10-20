import React from 'react'

function TextField(props) {
    return (
        <section className="new-task">
            <div className="container">
                <div className="input-group">
                    <div className="input-group__prefix">
                        <svg className="input-group__icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                    </div>
                    <div className="input-group__infix">
                        <label htmlFor="task-input" className="input-group__label sr-only">{props.label}</label>
                        <input value={props.input} id="task-input" className="input-group__control" type="text" placeholder={props.label} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TextField
