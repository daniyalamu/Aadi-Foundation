import React from 'react'

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid " >
          
          <a class="navbar-brand" href="#">
            <img src="./assets/whole.png" className='app-logo' alt="logo" />
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search for your favorite groups in ATG" aria-label="Search" />
            </form>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar