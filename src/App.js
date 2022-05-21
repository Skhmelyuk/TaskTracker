import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import About from './components/About'
import AddTask from './components/AddTask'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : { ...task }
      )
    )
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()
    setTasks([...tasks, data])

    // setTasks([...tasks, { id: Date.now(), ...task }])
  }

  return (
    <div className="container">
      <Header
        showAddTask={showAddTask}
        onAdd={() => setShowAddTask(!showAddTask)}
      />

      {showAddTask && <AddTask onAdd={addTask} />}

      <Routes>
        <Route
          path="/"
          element={
            tasks.length ? (
              <Tasks
                tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleReminder}
              />
            ) : (
              <p>No Tasks To Show</p>
            )
          }
        />
        <Route path="about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
