
import food1 from '../assets/food-img-1.png';
import food2 from '../assets/food-img-2.png';
import food3 from '../assets/food-img-3.png';
import food4 from '../assets/food-img-4.png';
import food5 from '../assets/food-img-5.png';
import food6 from '../assets/food-img-6.png';
import { useState } from "react";
import { useNavigate, NavLink } from 'react-router-dom';

function Signup({userToDisplay}) {

    const initialValue = {
        username: '',
        password: '',
        email: ''
    }
    const navigate = useNavigate()
    const [userExists, setUserExists] = useState(false)
    const [validationError, setValidationError] = useState(false)
    const [signupForm, setSignupForm] = useState(initialValue)

    function handleSignupChange(e) {
        const name = e.target.name
        const value = e.target.value
        setSignupForm({
            ...signupForm, 
            [name]: value
        })
    }

    function handleSignupSubmit(e) {
        e.preventDefault()
        fetch('/signup', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(signupForm)
        })
        .then((res) => {
            if (res.status === 201){
                return res.json()
            } else if (res.status === 500){
                setUserExists(true)
                setValidationError(false)
                console.error('Username Already Exists')
                setSignupForm({
                    ...signupForm, 
                    username: ''
                })
                return Promise.reject('Username Already Exists')
            } else if(res.status === 400){
                setUserExists(false)
                setValidationError(true)
                console.error('Username and Password must be present and age must be 16 years or older')
                return Promise.reject('Username and Password must be present and age must be 16 years or older')
            }
        })
        .then((data) => {
            userToDisplay(data)
            navigate('/main')
        })
        .catch((error) => console.error('Error', error));
    }
    
    const warningStyles = {
        color: "red",
        marginTop: "-10px",
        marginBottom: "10px",
        textAlign: "center"
    }

    const warningStyles2 = {
        color: "red",
        marginTop: "-10px",
        marginBottom: "10px",
        width: "90%",
        textAlign: "center"
    }

    return (
        <div>
        <nav>
          <NavLink to='/' className='nav-link' >Log In</NavLink>
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
                <form className="signup-form" onSubmit={handleSignupSubmit}>
                    <input type="text" autoComplete='off' placeholder="Username" onChange={handleSignupChange} name='username' value ={signupForm.username}  />
                    {userExists ? <p style={warningStyles}>Username already exists, please try again!</p> : null}
                    <input type="password" autoComplete='off' placeholder="Password" onChange={handleSignupChange} name='password' value={signupForm.password} />
                    <input type="text" autoComplete='off' placeholder="Email" onChange={handleSignupChange}  name='email' value={signupForm.email} />
                    {validationError ? <p style={warningStyles2}>Username and Password must be present and age must be 16 years or older, please try again!</p> : null}
                    <button className="login-signup-submit">Sign Up</button>
                </form>
          </div>
        </div>
      </div>
  
    )
  }
  
  export default Signup;
  