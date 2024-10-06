import './App.css'
import React from "react"
import TaskList from './componets/TaskList.tsx'

const App: React.FC = () => {
  return (
    <div className="App">
      <TaskList />
    </div>
  )
}

export default App