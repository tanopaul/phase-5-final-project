import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "./Context";
import {useContext} from 'react'
function Nav() {
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate()
    const handleLogout = () => {
        fetch('/logout', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
            if (response.status === 204) {
                setUser('');
                navigate('/')

            } else {
              console.error('Logout failed');
            }
          })
        
      };


    return (
        <div className="nav">
            <nav>
                <div className="nav-links">
                    <NavLink to='/main' className='nav-link' >Recipes</NavLink>
                    <NavLink to='/about' className='nav-link' >How it Works</NavLink>
                    <NavLink to='/addrecipe' className='nav-link' >Add A Recipe</NavLink>
                    <NavLink to='/community' className="nav-link">Community</NavLink>
                </div>
                <div>
                    <div className="logout" onClick={handleLogout}>Log Out</div>
                </div>
            </nav>
        </div>
    )
  }
  
  export default Nav;
  