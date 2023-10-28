import food1 from '../assets/food-img-1.png';
import food2 from '../assets/food-img-2.png';
import food3 from '../assets/food-img-3.png';
import food4 from '../assets/food-img-4.png';
import food5 from '../assets/food-img-5.png';
import food6 from '../assets/food-img-6.png';
import { useState, useEffect } from "react";
import { Link, NavLink } from 'react-router-dom';
import Nav from './Nav';

function Main({user, handleUser, handleRecipePage, handleDeleteRecipe}) {

    // console.log(user.user_recipes[0].name) 

    function handleDelete(id) {
        fetch(`/recipes/${id}`, {
            method: "DELETE",
            headers:{ "Content-Type": "application/json"},
        })
        .then(resp => resp.json())
        .then(data => handleDeleteRecipe(id))
    }



    

    const userRecipes = user.user_recipes.map(recipe => {
        return (
            <div key={recipe.id}>
                <div>
                    <img src={recipe.main_image} alt={recipe.name} />
                </div>
                <div>
                    <Link onClick={() => handleRecipePage(recipe)} exact to={`/recipe/${recipe.id}`} >{recipe.name}</Link>
                    <h4>{recipe.category}</h4>
                </div>
                <div>
                    <button onClick={() => handleDelete(recipe.id)}>Delete</button>
                </div>

            </div>
        )
    })

    const categoryList = user.user_recipes.map(recipe => {
        return <li>{recipe.category}</li>
    })

    return (
        <div>
            <Nav handleUser={handleUser} />
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
                    {userRecipes}
                </div>
                <div>
                    <ul>
                        {categoryList}
                    </ul>
                </div>
            </div>

        </div>
  
    )
  }
  
  export default Main;
  