import "./NavigationBar.css"
import DeviceStats from "./DeviceStats"

const NavigationBar = (props) => {
  return (
    <div className="navigation-bar bg-primary p-1 d-flex flex-row align-items-center justify-content-center">
      <Logo />
      <Credits />
    </div>
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
