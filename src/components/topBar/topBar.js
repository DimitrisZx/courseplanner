import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, selectIsLoggedIn, selectIsAdmin } from '../../features/store/stateSlice';

import { useSelector } from 'react-redux';

export default function TopBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border shadow-sm">
      <Link className="navbar-brand" to="/my-schedule">My Schedule</Link>
      {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button> */}
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" href="#" to='/my-schedule'>Αρχική <span className="sr-only">(current)</span></Link>
          </li>
          {isLoggedIn && 
            <>
              {/* <li className="nav-item"><Link className="nav-link" to="/edit-profile">Ρυθμίσεις</Link></li> */}
              <li className="nav-item"><Link className="nav-link" to="/edit-selected-lessons">Επιλεγμένα Μαθήματα</Link></li>
            </>
          }
          {isAdmin &&
            <>
              <li className="nav-item"><Link className="nav-link" to="/admin-panel">Διαχείριση</Link></li>
            </>
          }
        </ul>
      </div>
      {isLoggedIn && <div className="my-2 my-lg-0">
        <button className="btn btn-warning my-2 my-sm-0" onClick={handleLogout} type="submit">Logout</button>
      </div>}
      
  </nav>
  )
}
