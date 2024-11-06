import React from 'react'
import {HashLoader} from 'react-spinners'
import './Loader.css'
function Loader() {
  return (
    <div className="Loader">
      
        <HashLoader color="#294861" size={30} />
        <b>Loading... </b>
    </div>
  )
}

export default Loader