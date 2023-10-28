
import food1 from '../assets/food-img-1.png';
import food2 from '../assets/food-img-2.png';
import food3 from '../assets/food-img-3.png';
import food4 from '../assets/food-img-4.png';
import food5 from '../assets/food-img-5.png';
import food6 from '../assets/food-img-6.png';
import { useState } from "react";
import { useNavigate, NavLink } from 'react-router-dom';

function Login({userToDisplay}) {

  const initialValue = {
    username: '',
    password: ''
}
const navigate = useNavigate()
const [loginFound, setLoginFound] = useState(true)
const [loginForm, setLoginForm] = useState(initialValue)

function handleLoginChange(e) {
    const name = e.target.name
    const value = e.target.value
    setLoginForm({
        ...loginForm, 
        [name]: value
    })
    console.log(loginForm)
}

  function handleLoginSubmit(e) {
    e.preventDefault()
    fetch('/login', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(loginForm)
    })
    .then((res) => {
        if (res.status === 201){
            return res.json()
        } else if (res.status === 400){
            setLoginFound(false)
            console.error('User Data Not Found')
            setLoginForm(initialValue)
            return Promise.reject('User Data Not Found')
        }
    })
    .then((data) => {
        userToDisplay(data)
        navigate('/main')
    })
    .catch((error) => console.error('User Data Not Found', error));
}

const warningStyles = {
        color: "red",
        marginBottom: "10px"
    }

    return (
      <div>
        <nav>
          <NavLink to='/signup' className='nav-link' >Signup</NavLink>
        </nav>
        <div>
          <div>
            <img src={food1} alt='food' />
            <img src={food2} alt='food' />
            <img src={food3} alt='food' />
            <img src={food4} alt='food' />
            <img src={food5} alt='food' />
            <img src={food6} alt='food' />
          </div>
          <div>
            <span>FIT</span><span>x</span><span>FLAV</span>
          </div>
        </div>
        <div>
          <div>
            <h1>Getting Started</h1>
            <p>FitFlav is a user-friendly mobile app that empowers individuals to create customized, healthy recipes tailored to their specific dietary needs and goals. With a comprehensive ingredient database, users can easily adjust serving sizes and ingredient quantities to fine-tune the calorie count of their recipes.</p>
          </div>
          <div>
            <form className="login-form" onSubmit={handleLoginSubmit}>
              <input type="text" autoComplete='off' placeholder="Username" onChange={handleLoginChange} name='username' value ={loginForm.username}  />
              <input type="password" autoComplete='off' placeholder="Password" onChange={handleLoginChange} name='password' value={loginForm.password} />
              {loginFound ? null : <p style={warningStyles}>Username/password not found, please try again!</p>}
              <button className="login-signup-submit">Log In</button>
            </form>
          </div>
        </div>
      </div>
  
    )
  }
  
  export default Login;
  