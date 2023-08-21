import ProcHandler from "./ProcHandler"
import { SocketProvider } from "../socket/SocketHandler"

const Content = (props) => {
  return (
    <SocketProvider>
      <div className="bg-body flex-grow-1 d-flex justify-content-center align-items-center p-4">
        <ProcHandler></ProcHandler>
      </div>
    </SocketProvider>
  )
}

export default Content
