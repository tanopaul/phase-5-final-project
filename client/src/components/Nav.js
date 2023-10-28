import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
function Nav({handleUser}) {

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
                handleUser('');
                navigate('/')

            } else {
              console.error('Logout failed');
            }
          })
        
      };


    return (
        <div className="nav">
            <nav>
                <div>
                    <NavLink to='/main' className='nav-link' >Recipes</NavLink>
                    <NavLink to='/about' className='nav-link' >How it Works</NavLink>
                    <NavLink to='/addrecipe' className='nav-link' >Add A Recipe</NavLink>
                </div>
                <div>
                    <div onClick={handleLogout}>Log Out</div>
                </div>
            </nav>
        </div>
    )
  }
  
  export default Nav;
  