import "./NavigationBar.css"
import DeviceStats from "./DeviceStats"

const NavigationBar = (props) => {
  return (
    <div className="d-flex flex-column w-100" style={{height: "calc(170px + 1rem)"}}>
      <div className="navigation-bar bg-primary p-1 d-flex flex-column align-items-center justify-content-center">
        <Logo />

        <Credits />
      </div>
      <DeviceStats />
      <TabController />

    </div>

  )
}

const TabController = () => {
  return (
    <ul class="nav nav-pills p-3" role="tablist">
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
          id="processes-tab"
          data-bs-toggle="tab"
          data-bs-target="#processes-tab-pane"
          type="button"
          role="tab"
          aria-controls="processes-tab-pane"
          aria-selected="true">
          Processes
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

const Logo = () => {
  return (
    <>
      <div className="d-flex flex-column">
        <div className="d-flex flex-row align-items-center justify-content-center">
          <i className="bi bi-memory fs-1 me-2"></i>
          <span className="display-6">Mems</span>
        </div>
        <span>Android web-based memory tool.</span>
      </div>
    </>
  )
}

const Credits = () => {
  return (
    <div className="device-stats-credits d-flex flex-row align-items-center">
      <a
        className="bi bi-github fs-2"
        href="https://github.com/0danny/mems"></a>
      <span className="ms-2">github.com/0danny/mems</span>
    </div>
  )
}

export default NavigationBar
