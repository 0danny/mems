import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import "./main.scss"

import Content from "./components/Content"
import NavigationBar from "./components/NavigationBar"
import DeviceStats from "./components/DeviceStats"

import { SocketProvider } from "./socket/SocketHandler"
import { ProcessProvider } from "./components/cards/ProcHandler"

const Container = (props) => {
  return <div className="d-flex flex-column h-100 w-100">{props.children}</div>
}

const App = () => {
  return (
    <Providers>
      <Container>
        <NavigationBar />
        <Content />
      </Container>
    </Providers>
  )
}

const Providers = (props) => {
  return (
    <ProcessProvider>
      <SocketProvider>{props.children}</SocketProvider>
    </ProcessProvider>
  )
}

export default App
