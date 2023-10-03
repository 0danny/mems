import ProcHandler from "./cards/ProcHandler"
import MemViewer from "./cards/MemViewer"

const Content = (props) => {
  return (
    <div className="content ps-3 pe-3" style={{height: "calc(100% - 170px - 1rem)"}}>
      <TabContents />
    </div>
  )
}

const TabContents = () => {
  return (
    <div className="tab-content">
      <div
        className="tab-pane fade show active"
        id="scanner-tab-pane"
        role="tabpanel"
        aria-labelledby="scanner-tab"
        tabIndex="0">
        <MemViewer />
      </div>
      <div
        className="tab-pane fade"
        id="processes-tab-pane"
        role="tabpanel"
        aria-labelledby="processes-tab"
        tabIndex="1">
        <ProcHandler />
      </div>
      <div
        className="tab-pane fade"
        id="region-viewer-tab-pane"
        role="tabpanel"
        aria-labelledby="region-viewer-tab"
        tabIndex="2">
        <span>Region Viewer Tab (WIP)</span>
      </div>
    </div>
  )
}

export default Content
