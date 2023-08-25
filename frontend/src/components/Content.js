import ProcHandler from "./cards/ProcHandler"
import MemViewer from "./cards/MemViewer"

const Content = (props) => {
  return (
    <div className="content bg-body flex-grow-1 d-flex p-4">
      <MemViewer></MemViewer>

      <ProcHandler></ProcHandler>
    </div>
  )
}

export default Content
