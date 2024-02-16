import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "./Main";
import Signup from "./Signup";
import Login from "./Login";
import RecipeForm from "./RecipeForm";
import Recipe from "./Recipe";
import About from "./About";
import { UserContext } from "./Context";
import Community from "./Community";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [recipe, setRecipe] = useState('');
  const [recipesToDisplay, setRecipesToDisplay] = useState("")
  const [posts, setPosts] = useState('')
  const [noPosts, setNoPosts] = useState(true)

  useEffect(() => {
    fetch('/auto_login')
      .then((res) => res.json())
      .then((user) => {
        setUser(user)
        setRecipesToDisplay(user.user_recipes)
        if (user.user_recipes.length === 0) {
          setNoPosts(true)
        } else {
          setNoPosts(false)
        }
      })
      .catch((error) => console.error('Error fetching posts:', error));

    fetch('/posts')
    .then(resp => resp.json())
    .then(data => setPosts(data))
   
  }, []);


  function handleDeleteRecipe(id) {
    const newRecipes = user.user_recipes.filter(recipe => recipe.id !== id)
    setUser({...user, user_recipes: newRecipes})
    setRecipesToDisplay(newRecipes)
  }

  function handleAddRecipe(recipe) {
    setUser({...user, user_recipes: [...user.user_recipes, recipe]})
    setRecipesToDisplay([...recipesToDisplay, recipe])
    setNoPosts(false)
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
    setRecipesToDisplay(updatedRecipes)
  }


  return (
    <UserContext.Provider value={{user, noPosts,  setUser, setPosts, setRecipe, setNoPosts , recipe, recipesToDisplay, setRecipesToDisplay, posts}}>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path= "/signup" element={<Signup/>}/>
        <Route path="/main" element={<Main handleDeleteRecipe={handleDeleteRecipe} />}/>
        <Route path="/addrecipe" element={<RecipeForm handleAddRecipe={handleAddRecipe} />}/>
        <Route path={`/recipe/${recipe.id}`} element={<Recipe handleUpdateRecipes={handleUpdateRecipes} />}/>
        <Route path={'/about'} element={ <About/>} />
        <Route path="/community" element={<Community />}/>
      </Routes>
    </UserContext.Provider>

  )
}

export default App;


