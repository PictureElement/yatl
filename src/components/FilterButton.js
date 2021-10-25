import React from 'react'

function FilterButton(props) {
  return (
    <button className="filters__button filters__button_main" type="button" aria-pressed="true">
      <span className="visually-hidden">Show </span>
      {props.name}
      <span className="visually-hidden"> tasks</span>
    </button>
  )
}

export default FilterButton
