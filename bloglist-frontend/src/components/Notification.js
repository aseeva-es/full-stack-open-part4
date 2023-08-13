const Notification = ({ text, type = 'message' }) => {
  if (text === null) {
    return null
  }

  return (
    <div className={type}>
      {text}
    </div>
  )
}

export default Notification