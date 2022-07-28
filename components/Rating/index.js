import React from 'react'
import PropTypes from 'prop-types'
// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import * as fas from "@fortawesome/free-solid-svg-icons";
import * as far from "@fortawesome/free-regular-svg-icons";

const Rating = ({value, text, color}) => {
  return (
    <div className='rating'>
        <span>
            <FontAwesomeIcon style={{color}} icon={  value >= 1 ? fas.faStar : value >= 0.5 ? fas.faStarHalfAlt : far.faStar} />
        </span>
        <span>
            <FontAwesomeIcon style={{color}} icon={  value >= 2 ? fas.faStar : value >= 1.5 ? fas.faStarHalfAlt : far.faStar} />
        </span>
        <span>
            <FontAwesomeIcon style={{color}} icon={  value >= 3 ? fas.faStar : value >= 2.5 ? fas.faStarHalfAlt : far.faStar} />
        </span>
        <span>
            <FontAwesomeIcon style={{color}} icon={  value >= 4 ? fas.faStar : value >= 3.5 ? fas.faStarHalfAlt : far.faStar} />
        </span>
        <span>
            <FontAwesomeIcon style={{color}} icon={  value >= 5 ? fas.faStar : value >= 4.5 ? fas.faStarHalfAlt : far.faStar} />
        </span>
        <span>
            {text ? text : ''} 
        </span>
    </div>
  )
}

Rating.defaultProps = {
    color: '#f8e825'
}

// Rating.propTypes = {
//     value: PropTypes.number.isRequired,
//     text: PropTypes.string.isRequired,
//     color: PropTypes.string
// }

export default Rating