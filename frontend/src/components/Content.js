import ProcHandler from "./cards/ProcHandler"
import MemViewer from "./cards/MemViewer"

const Content = (props) => {
  return (
    <div className="bg-body flex-grow-1 d-flex justify-content-center align-items-center p-4">
      <MemViewer></MemViewer>

      <ProcHandler></ProcHandler>
    </div>
  )
}

export default Content
