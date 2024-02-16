import food1 from '../assets/food-img-1.png';
import food2 from '../assets/food-img-2.png';
import food3 from '../assets/food-img-3.png';
import food4 from '../assets/food-img-4.png';
import food5 from '../assets/food-img-5.png';
import food6 from '../assets/food-img-6.png';
import { useState, useEffect, useContext } from "react";
import { Link, NavLink } from 'react-router-dom';
import Nav from './Nav';
import { UserContext } from './Context';
import Divider from '@mui/material/Divider';
import RecipeCard from './RecipeCard';

function Main({ handleDeleteRecipe}) {
    const {user, noPosts , setRecipe, recipesToDisplay, setRecipesToDisplay} = useContext(UserContext);
    
    const [categoryArray, setCategoryArray] = useState([])

    useEffect(() => {
        let categoryArray = []
        if (user) {
            for (let i = 0; i < user.user_recipes.length; i++) {
                categoryArray.push(user.user_recipes[i].category)
            }
            setCategoryArray([...new Set(categoryArray)])
        }
        
    }, [recipesToDisplay])


    function handleFilterRecipes(e) {
        if (e.target.innerText === 'All Recipes') {
            setRecipesToDisplay(user.user_recipes)
        } else {
            const filteredRecipes = user.user_recipes.filter(recipe => recipe.category === e.target.innerText)
            setRecipesToDisplay(filteredRecipes)
        }
    }



    return (
        <div>
            <Nav/>
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
            
            {user && noPosts  ? 
                <div className='main-no-recipe-message'>
                    <h1>No Recipes</h1>
                    <h3>Add a Recipe to your profile. Make sure that the ingredients are measured in grams, cups, or a quantity.</h3>
                    <Link className='main-add-recipe-btn'  exact="true" to={"/addrecipe"} >Add Recipe</Link>
                </div>
                
                : null }
                <div className='recipe-info-section'>
                <div>
                    {user && !noPosts ? recipesToDisplay.map(recipe => {
                        return <RecipeCard recipe={recipe} handleDeleteRecipe={handleDeleteRecipe} />
                    }) : null}
                </div>
                <div className='category-section'>
                    <h1>Categories</h1>
                    <ul className='category-list'>
                        {user ? <li onClick={handleFilterRecipes}>All Recipes</li> : "Loading..."}
                        {user ? categoryArray.map(recipe => <li onClick={handleFilterRecipes}>{recipe}</li>) : 'Loading...'}
                    </ul>
                </div>
            </div>
            
        </div>
  
    )
  }
  
  export default Main;
  
