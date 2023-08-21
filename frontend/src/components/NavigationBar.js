import "./NavigationBar.css"

const NavigationBar = (props) => {
  return (
    <div className="navigation-bar bg-primary p-1 d-flex flex-row align-items-center justify-content-center">
      <Logo></Logo>
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

export default NavigationBar
