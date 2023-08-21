import "./ProcHandler.css"

import React, { useContext, useState, useEffect } from "react"
import { registerSubscriber } from "../socket/SocketHandler"

const ProcHandler = () => {
  const [processes, setProcesses] = useState([])

  useEffect(() => {
    const processCallback = (data) => {
      console.log("Received process data: ", data)

      setProcesses(data.data)
    }

    registerSubscriber("processes", processCallback)
  }, [])

  return (
    <div
      className="card border-primary mb-3 h-100"
      style={{ maxWidth: "30rem" }}>
      <div className="card-header">Process Handler</div>
      <div className="card-body ">
        <p className="card-text">
          Below all of the processes on the device are displayed.
        </p>
        <div className="process-list list-group">
          {processes
            .sort((a, b) => b.id - a.id)
            .map((proc) => (
              <Process proc_id={proc.id} name={proc.name} />
            ))}
        </div>
      </div>
    </div>
  )
}

const Process = ({ proc_id, name }) => {
  return (
    <a
      href="#"
      className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
      {name}
      <span className="badge bg-primary rounded-pill">{proc_id}</span>
    </a>
  )
}

export default ProcHandler
