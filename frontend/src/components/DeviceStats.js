import React, { useContext, useState, useEffect } from "react"

import { SocketContext, registerSubscriber } from "../socket/SocketHandler"
import { ProcessContext } from "./cards/ProcHandler"

const DeviceStats = () => {
  const { isConnected } = useContext(SocketContext)
  const { selectedProcess } = useContext(ProcessContext)

  const [deviceInfo, setDeviceInfo] = useState({
    deviceName: "Unknown",
    user: "Unknown",
    version: "Unknown",
  })

  useEffect(() => {
    const deviceInfoCallback = (data) => {
      console.log("Received device info: ", data)

      setDeviceInfo(data.data)
    }

    registerSubscriber("device-info", deviceInfoCallback)
  }, [])

  return (
    <div className="device-stats bg-secondary-subtle p-2 d-flex flex-row">
      <i
        className={`bi-circle-fill me-2 ${
          isConnected ? "text-success" : "text-danger"
        }`}></i>
      <span>Socket Status</span>
      <span>
        Mems Version: <b>{deviceInfo.version}</b>
      </span>
      <span>
        Device Name: <b>{deviceInfo.deviceName}</b>
      </span>
      <span>
        Whoami: <b>{deviceInfo.user}</b>
      </span>
      <span>
        Selected Process:{" "}
        <b>
          {selectedProcess.name} ({selectedProcess.id})
        </b>
      </span>
    </div>
  )
}

export default DeviceStats
