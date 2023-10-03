import "./ProcHandler.css"

import { registerSubscriber } from "../../socket/SocketHandler"

import React, { createContext, useContext, useState, useEffect } from "react"

export const ProcessContext = createContext()

export const ProcessProvider = ({ children }) => {
  const [selectedProcess, setSelectedProcess] = useState({
    id: -1,
    name: "None",
  })

  return (
    <ProcessContext.Provider value={{ selectedProcess, setSelectedProcess }}>
      {children}
    </ProcessContext.Provider>
  )
}

const ProcHandler = () => {
  const [processes, setProcesses] = useState([])
  const { setSelectedProcess } = useContext(ProcessContext)

  useEffect(() => {

    /* For debugging */
    setProcesses([
      { id: 1, name: "Test Process" },
      { id: 2, name: "Test Process 2" },
      { id: 3, name: "Test Process 3" },
      { id: 4, name: "Test Process 4" },
      { id: 5, name: "Test Process 5" },
      { id: 6, name: "Test Process 6" },
      { id: 7, name: "Test Process 7" },
      { id: 8, name: "Test Process 8" },
      { id: 9, name: "Test Process 9" },
      { id: 10, name: "Test Process 10" },
    ])

    const processCallback = (data) => {
      console.log("Received process data: ", data)

      setProcesses(data.data)
    }

    registerSubscriber("processes", processCallback)
  }, [])

  const handleProcessClick = (id, name) => {
    setSelectedProcess({ id, name })
  }

  return (
    <div className="d-flex flex-column h-100 p-2">
      <span className="p-2 bg-secondary-subtle rounded mb-3">
        Below all of the processes on the device are displayed.
        <br/><b>{processes.length}</b> processes have been fetched from the device.
      </span>

      <div className="process-list list-group mb-1">
      {processes
        .sort((a, b) => b.id - a.id) //Sort by highest PID first.
        .map((proc) => (
          <Process
            key={proc.id}
            proc_id={proc.id}
            name={proc.name}
            onClick={() => handleProcessClick(proc.id, proc.name)}
          />
        ))}
      </div>
    </div>
  )
}

const Process = ({ proc_id, name, onClick }) => {
  return (
    <a
      className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
      onClick={onClick}>
      {name}
      <span className="badge bg-primary rounded-pill">{proc_id}</span>
    </a>
  )
}

export default ProcHandler
