import React, { createContext, useEffect, useState } from "react"

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
}

export const SocketProvider = ({ children }) => {
  const [error, setError] = useState(null)

  useEffect(() => {
    var server_url = `ws://${window.location.host}/websocket`

    console.log(`Connecting to websocket via: ${server_url}`)

    const socket = new WebSocket(server_url)

    socket.onopen = (event) => {
      console.log("Connected to websocket server.")

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

      if (!event.wasClean) {
        setError("Connection died unexpectedly")
      }
    }

    return () => {
      socket.close()
    }
  }, [])

  return (
    <SocketContext.Provider
      value={{ error, registerSubscriber, unregisterSubscriber }}>
      {children}
    </SocketContext.Provider>
  )
}

export { SocketContext, registerSubscriber, unregisterSubscriber }
