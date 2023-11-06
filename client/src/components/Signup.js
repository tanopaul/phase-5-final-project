
import food1 from '../assets/food-img-1.png';
import food2 from '../assets/food-img-2.png';
import food3 from '../assets/food-img-3.png';
import food4 from '../assets/food-img-4.png';
import food5 from '../assets/food-img-5.png';
import food6 from '../assets/food-img-6.png';
import { useState, useContext } from "react";
import { useNavigate, NavLink } from 'react-router-dom';
import { UserContext } from './Context';
function Signup() {
    const {setUser, setRecipesToDisplay, setNoPosts} = useContext(UserContext);
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
        .then((user) => {
            setUser(user)
            setRecipesToDisplay(user.user_recipes)
            setNoPosts(true)
            navigate('/main')
        })
        .catch((error) => console.error('Error', error));
    }
    
    const warningStyles = {
        color: "white",
        marginBottom: "10px",
        width: "80%",
        textAlign: 'center',
        textShadow: '0 0 2px red',
        backgroundColor: 'red',
        borderRadius: "10px",
        padding: '5px'
    }

    const warningStyles2 = {
        color: "white",
        marginBottom: "10px",
        width: "80%",
        textAlign: 'center',
        textShadow: '0 0 2px red',
        backgroundColor: 'red',
        borderRadius: "10px",
        padding: '5px'
    }

    return (
        <div>
        <nav>
          <NavLink to='/' className='nav-link signup' >Log In</NavLink>
        </nav>
        <header className='header'>
          <div className='header-food-images'>
            <img src={food5} alt='food' className='food-5' />
            <img src={food1} alt='food' className='food-1' />
            <img src={food2} alt='food' className='food-2' />
            <img src={food3} alt='food' className='food-3' />
            <img src={food4} alt='food' className='food-4' />
            <img src={food6} alt='food' className='food-6' />
          </div>
          <div className='header-title'>
            <span className='header-fit'>FIT</span><span className='header-x'>x</span><span className='header-flav'>FLAV</span>
          </div>
        </header>
        <div className='signup-form-section'>
                <h1>Sign Up</h1>
                <form className="signup-form" onSubmit={handleSignupSubmit}>
                    <input type="text" required={true} autoComplete='off' placeholder="Username" onChange={handleSignupChange} name='username' value ={signupForm.username}  />
                    {userExists ? <p style={warningStyles}>Username already exists, please try again!</p> : null}
                    <input type="password" required={true} autoComplete='off' placeholder="Password" onChange={handleSignupChange} name='password' value={signupForm.password} />
                    <input type="text" required={true} autoComplete='off' placeholder="Email" onChange={handleSignupChange}  name='email' value={signupForm.email} />
                    {validationError ? <p style={warningStyles2}>Password must be more than 6 characters and email must be valid.</p> : null}
                    <button className="login-signup-submit">Sign Up</button>
                </form>
        </div>
      </div>
  
    )
  }
  
  export default Signup;
  