import React from 'react';
import './Select.scss';

function Select(props) {
  function handleChange(e) {
    props.setFilter(e.target.value);
  }

  return (
    <div>
      <label className="visually-hidden" htmlFor="filter-select">Choose a filter:</label>
      <select className="filter" defaultValue="All" onChange={handleChange} name="filters" id="filter-select">
        <option className="filter__option" value="All">All</option>
        <option className="filter__option" value="Active">Active</option>
        <option className="filter__option" value="Completed">Completed</option>
      </select>
    </div>
  )
}

export default Select
