import { useState } from "react";

const Togglable = (props) => {
    const [visible, setVisible]=useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
      }
    
   
    return (
        <>
      <div style = {hideWhenVisible}>
        <button onClick={toggleVisibility} className="border-solid border border-orange-400 w-24 text-sm p-2 rounded mb-2">
          {props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
      {props.children}
      <button onClick={toggleVisibility} className="border-solid border border-orange-400 w-24 text-sm p-2 rounded mb-2">
        Cancel</button>
    </div>
        </>
    )
  }

  export default Togglable;