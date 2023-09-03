import ProcHandler from "./cards/ProcHandler"
import MemViewer from "./cards/MemViewer"

const Content = (props) => {
  return (
    <div className="content bg-body flex-grow-1 d-flex p-4">
      <TabWrapper />
      <ProcHandler />
    </div>
  )
}

const TabWrapper = () => {
  return (
    <div className="flex-grow-1 d-flex flex-column">
      <TabController />
      <TabContents />
    </div>
  )
}

const TabContents = () => {
  return (
    <div class="tab-content w-100">
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
        id="region-viewer-tab-pane"
        role="tabpanel"
        aria-labelledby="region-viewer-tab"
        tabindex="0">
        <span>Region Viewer Tab (WIP)</span>
      </div>
    </div>
  )
}

const TabController = () => {
  return (
    <ul class="nav nav-tabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="scanner-tab"
          data-bs-toggle="tab"
          data-bs-target="#scanner-tab-pane"
          type="button"
          role="tab"
          aria-controls="scanner-tab-pane"
          aria-selected="true">
          Scanner
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="region-viewer-tab"
          data-bs-toggle="tab"
          data-bs-target="#region-viewer-tab-pane"
          type="button"
          role="tab"
          aria-controls="region-viewer-tab-pane"
          aria-selected="false">
          Region Viewer
        </button>
      </li>
    </ul>
  )
}

export default Content
