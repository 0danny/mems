import "./App.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import "./main.scss"

import Content from "./components/Content"
import NavigationBar from "./components/NavigationBar"

const Container = (props) => {
  return <div className="d-flex flex-column h-100 w-100">{props.children}</div>
}

const App = () => {
  return (
    <Container>
      <NavigationBar></NavigationBar>
      <Content></Content>
    </Container>
  )
}

export default App
