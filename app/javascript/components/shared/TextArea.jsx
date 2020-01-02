import React from 'react'
import PropTypes from 'prop-types'
import { inputClasses } from '../../shared/helpers'

const TextArea = (props) => (
  <div className="form-group row">
    <label htmlFor={props.name} className="col-md-3 col-form-label">
        {props.title}
    </label>
    <div className="col-md-9">
        <textarea 
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            id={props.name}
            className={inputClasses(`${props.name}`, props.state)}
            placeholder={props.placeholder}
            rows={props.rows}
            autoFocus={props.autoFocus}
        >
        </textarea>
        {props.state.errors[props.name] ? 
            <div className="invalid-feedback">
                {props.state.errors[props.name]}
            </div> : null
        }
    </div>
  </div>
)

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  state: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool.isRequired,
  rows: PropTypes.string.isRequired
}

export default TextArea