import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./Main";
import Signup from "./Signup";
import Login from "./Login";
import RecipeForm from "./RecipeForm";
import Recipe from "./Recipe";

function App() {

  const [user, setUser] = useState('');
  const [recipe, setRecipe] = useState('');

  useEffect(() => {
    fetch('/auto_login')
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  function handleUser(user) {
    setUser(user);
  }

  function handleRecipePage(recipe) {
    setRecipe(recipe)
  }

 

  function handleDeleteRecipe(id) {
    const newRecipes = user.user_recipes.filter(recipe => recipe.id !== id)
    setUser({...user, user_recipes: newRecipes})
  }

  function handleAddRecipe(recipe) {
    console.log(recipe)
    setUser({...user, user_recipes: [...user.user_recipes, recipe]})
  }

  function handleUpdateRecipes(updatedRecipe) {
    const updatedRecipes = user.user_recipes.map(recipe => {
      if (recipe.id === updatedRecipe.id) {
        return updatedRecipe
      } else {
        return recipe
      }
    })
    setUser({...user, user_recipes: updatedRecipes})
    
  }


  return (
    <div>
      <Routes>
        <Route path="/" element={<Login userToDisplay={handleUser} handleUser={handleUser} />}/>
        <Route path= "/signup" element={<Signup userToDisplay={handleUser} />}/>
        <Route path="/main" element={<Main handleDeleteRecipe={handleDeleteRecipe} user={user} handleUser={handleUser} handleRecipePage={handleRecipePage} />}/>
        <Route path="/addrecipe" element={<RecipeForm handleAddRecipe={handleAddRecipe} user={user} handleUser={handleUser} />}/>
        <Route path={`/recipe/${recipe.id}`} element={<Recipe handleUpdateRecipes={handleUpdateRecipes} recipe={recipe} handleUser={handleUser} />}/>

      </Routes>
    </div>

  )
}

export default App;


