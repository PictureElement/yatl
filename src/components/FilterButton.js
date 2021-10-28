import React from 'react'

function FilterButton(props) {
  return (
    <button
      onClick={() => props.setFilter(props.name)}
      className={`header__button header__button_filter ${props.isPressed ? 'header__button_active' : ''}`}
      type="button"
      aria-pressed={props.isPressed}
    >
      <span className="visually-hidden">Show </span>
      {props.name}
      <span className="visually-hidden"> tasks</span>
    </button>
  )
}

export default FilterButton