
import food1 from '../assets/food-img-1.png';
import food2 from '../assets/food-img-2.png';
import food3 from '../assets/food-img-3.png';
import food4 from '../assets/food-img-4.png';
import food5 from '../assets/food-img-5.png';
import food6 from '../assets/food-img-6.png';
import { useState, useContext } from "react";
import { useNavigate, NavLink } from 'react-router-dom';
import { UserContext } from './Context';
import recipePhoto from '../assets/add-recipe.png'
import mainRecipes from '../assets/main.png'
import caloriesPhoto from '../assets/calories.png'

function Login() {
  const {setUser, setRecipesToDisplay} = useContext(UserContext);
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
    .then((user) => {
        setUser(user)
        setRecipesToDisplay(user.user_recipes)
        navigate('/main')
    })
    .catch((error) => console.error('User Data Not Found', error));
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

    return (
      <div className='login'>
        <nav>
          <NavLink to='/signup' className='nav-link signup' >Sign Up</NavLink>
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
        <div className='login-info'>
          <div className='getting-started'>
            <h1>Getting Started</h1>
            <p>FitFlav is a user-friendly mobile app that empowers individuals to create customized, healthy recipes tailored to their specific dietary needs and goals. With a comprehensive ingredient database, users can easily adjust serving sizes and ingredient quantities to fine-tune the calorie count of their recipes.</p>
          </div>
          <div>
            <form className="login-form" onSubmit={handleLoginSubmit}>
            <h1>Sign In</h1>
              <input type="text" autoComplete='off' required={true} placeholder="Username" onChange={handleLoginChange} name='username' value ={loginForm.username}  />
              <input type="password" autoComplete='off' required={true} placeholder="Password" onChange={handleLoginChange} name='password' value={loginForm.password} />
              {loginFound ? null : <p style={warningStyles}>Username/password not found, please try again!</p>}
              <button className="login-signup-submit">Sign In</button>
            </form>
          </div>
        </div>
        <section className='about-section'>
            <div className='about-card-div'>
                <img src={recipePhoto} alt='recipe form' />
                <div>
                    <h1>Add A Recipe</h1>
                    <h3>Add a Recipe to your profile. Make sure that the ingredients are measured in grams, cups, or a quantity.</h3>
                </div>
            </div>
            <div className='about-card-div'>
            <div>
                <h1>Select Your Recipe</h1>
                <h3>Choose the recipe that you want to cook today. Filter recipes by category if necessary by clicking on one of the categories on the right side of your main page.</h3>
                </div>
                <img src={mainRecipes} alt='recipe library' />
            </div>
            <div className='about-card-div'>
                <img src={caloriesPhoto} alt='calories component' />
                <div>
                    <h1>Adjust Calories</h1>
                    <h3>Adjusting the calories of your recipe will increment or decrement the amount of ingredients to put into your recipe. Allowing for precision when cooking healthy!</h3>
                </div>
            </div>
        </section>
      </div>
  
    )
  }
  
  export default Login;
  