import React from 'react'
const Button = ({ children, onClick }) => {return(<button className='border-solid border border-orange-400 w-24 text-sm p-2 rounded' onClick={onClick}>{children}</button>)}

export default Button