
import React from 'react'

const BlackBtn = ({text,loading}) => {
  return (
    <button type='submit' value={text} className="black-btn">
      {loading ? <div className="animate-spin h-6 w-6 border-t-4 border-b-4 border-white rounded-full"></div> : <span>{text}</span>}
      
    </button>
  )
}

export default BlackBtn
