import { useState } from 'react'
import PropTypes from 'prop-types'

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  const newTask = (e) => {
    e.preventDefault()

    if (!text) {
      alert('Please add task')
      return
    }

    onAdd({ text, day, reminder })

    setText('')
    setDay('')
    setReminder(false)
  }

  return (
    <form className="add-form" onSubmit={newTask}>
      <div className="form-control">
        <label>Task</label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Add Task"
        />
      </div>
      <div className="form-control">
        <label>Date & Time</label>
        <input
          value={day}
          onChange={(e) => setDay(e.target.value)}
          type="text"
          placeholder="Add Date & Time"
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          checked={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
          type="checkbox"
        />
      </div>
      <input className="btn btn-block" type="submit" value="Save Task" />
    </form>
  )
}

AddTask.propTypes = {
  onAdd: PropTypes.func,
}

export default AddTask
