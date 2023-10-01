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
    <div class="tab-content">
      <div
        class="tab-pane fade show active"
        id="scanner-tab-pane"
        role="tabpanel"
        aria-labelledby="scanner-tab"
        tabindex="0">
        <MemViewer />
      </div>
      <div
        class="tab-pane fade"
        id="processes-tab-pane"
        role="tabpanel"
        aria-labelledby="processes-tab"
        tabindex="1">
        <ProcHandler />
      </div>
      <div
        class="tab-pane fade"
        id="region-viewer-tab-pane"
        role="tabpanel"
        aria-labelledby="region-viewer-tab"
        tabindex="2">
        <span>Region Viewer Tab (WIP)</span>
      </div>
    </div>
  )
}

export default Content
