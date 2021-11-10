import React from 'react'
import './Alert.scss';

function Alert(props) {
  return (
    <div className={`alert alert_${props.variant}`} role="alert">
      {props.text}
    </div>
  )
}

export default Alert;
