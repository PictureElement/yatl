import React from 'react';
import './FilterButton.scss';

function FilterButton(props) {
  return (
    <button
      onClick={() => props.setFilter(props.name)}
      className={`filter-button ${props.isPressed ? 'filter-button_active' : ''}`}
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