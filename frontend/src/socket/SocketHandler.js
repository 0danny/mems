import React, { createContext, useEffect, useState, useRef } from "react"

const SocketContext = createContext()

let subscribers = {}

const registerSubscriber = (type, callback) => {
  if (!subscribers[type]) {
    subscribers[type] = []
  }
  subscribers[type].push(callback)
}

const unregisterSubscriber = (type, callback) => {
  if (subscribers[type]) {
    subscribers[type] = subscribers[type].filter((cb) => cb !== callback)
  }
}

const notifySubscribers = (type, data) => {
  if (subscribers[type]) {
    subscribers[type].forEach((callback) => callback(data))
  }
}

const prepareData = (socket) => {
  socket.send(JSON.stringify({ type: "processes" }))
  socket.send(JSON.stringify({ type: "device-info" }))
}

export const SocketProvider = ({ children }) => {
  const [error, setError] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef(null) // Use a ref to store the socket

  useEffect(() => {
    var server_url = `ws://${window.location.host}/websocket`

    console.log(`Connecting to websocket via: ${server_url}`)

    const socket = new WebSocket(server_url)

    socketRef.current = socket

    socket.onopen = (event) => {
      console.log("Connected to websocket server.")
      setIsConnected(true)
      prepareData(socket)
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      const type = data.type

      console.log(`Received a socket message - `, data)

      notifySubscribers(type, data)
    }

    socket.onerror = (err) => {
      setError("WebSocket Error: " + err.message)
    }

    socket.onclose = (event) => {
      console.log("Closing WS connection.")
      setIsConnected(false)
      if (!event.wasClean) {
        setError("Connection died unexpectedly")
      }
    }

    return () => {
      socket.close()
    }
  }, [])

  const sendMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message))
    }
  }

  return (
    <SocketContext.Provider
      value={{ error, isConnected, registerSubscriber, unregisterSubscriber, sendMessage }}>
      {children}
    </SocketContext.Provider>
  )
}

export { SocketContext, registerSubscriber, unregisterSubscriber }
