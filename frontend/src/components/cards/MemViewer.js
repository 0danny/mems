import { ProcessContext } from "./ProcHandler"
import React, { useContext, useState, useEffect} from "react"
import { SocketContext, registerSubscriber } from "../../socket/SocketHandler"

const MemViewer = () => {
  const socketContext = useContext(SocketContext)
  const { selectedProcess } = useContext(ProcessContext)

  const handleScanClick = (params) => {
    console.log(`Scanning the process:`, selectedProcess, 
    "with value:", params.value, "and type:", params.type, socketContext)

    // Send the scan request to the backend

    socketContext.sendMessage({
      type: "scan",
      data: {
        processId: selectedProcess.id,
        value: params.value,
        type: params.type
      }
    })
  }

  useEffect(() => {
    const scanResultCallback = (data) => {
      //Wait for a reply with results.
    }

    registerSubscriber("scan", scanResultCallback)
  }, [])

  return (
    <div className="d-flex flex-column h-100">
      <Controls onScan={handleScanClick}/>

      <Results />
    </div>
  )
}

const Controls = ({ onScan }) => {
  const [scanParams, setScanParams] = useState({
    value: "",
    type: "dword"
  })

  return (
    <div className="p-3">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a value..."
          value={scanParams.value}
          onChange={(e) => setScanParams(prev => ({ ...prev, value: e.target.value }))}
        />
        <button className="btn btn-primary" type="button" onClick={() => onScan(scanParams)}>
          Scan Value
        </button>
      </div>

      <div className="d-flex flex-row align-items-center justify-content-evenly">
        <select
          className="form-select bg-body"
          value={scanParams.type}
          onChange={(e) => setScanParams(prev => ({ ...prev, type: e.target.value }))}
        >
          <option value="byte">Byte -128 - 127</option>
          <option value="word">Word -32,768 - 32,767</option>
          <option value="dword">Dword -2,147,483,648 - 2,147,483,647</option>
          <option value="qword">Qword -9,223,372,036,854,775,808 - 9,223,372,036,854,775,807</option>
          <option value="float">Float (variable range)</option>
        </select>
        <span className="text-nowrap ms-2 bg-secondary-subtle p-2 rounded">
          <b>0</b> Values Found
        </span>
      </div>
    </div>
  )
}

const Results = () => {
  return (
    <div className="overflow-auto">
      <table className="table table-striped table-hover border-top">
        <thead className="bg-secondary-subtle">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Hex Address</th>
            <th scope="col">Hex Data</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>

        </tbody>
      </table>
    </div>
  )
}

export default MemViewer
