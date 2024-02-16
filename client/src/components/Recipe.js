import { useState, useEffect, useContext } from "react";
import Nav from './Nav'
import { UserContext } from "./Context";

function Recipe({handleUpdateRecipes}) {
    const {recipe, user} = useContext(UserContext);
    const [recipeIngredients, setRecipeIngredients] = useState(recipe.recipe_ingredients)
    const [recipeCalories, setRecipeCalories] = useState([])
    const [recipeToRender, setRecipeToRender] = useState(recipe)
    const [refresh, setRefresh] = useState(false)
    const [editName, setEditName] = useState(false)
    const [editCategory, setEditCategory] = useState(false)
    const [editInstructions, setEditInstructions] = useState(false)
    const initForm = {
        name: '',
        instructions: '',
        category: ''
    }
    const [updateForm, setUpdateForm] = useState(initForm)
    

    function handleChange(e) {
        const {name, value} = e.target
        setUpdateForm({...updateForm, [name]:value})
    }

    useEffect(() => {
        let calArray = []
        for (let i = 0; i < recipeIngredients.length; i++) {
            calArray.push(recipeIngredients[i].ingredient.calories)
        }
        setRecipeCalories(calArray)
    }, [refresh])
    
    function handleMinus() {
        const updatedCalories = recipeIngredients.map(recipeIngredient => {
            return {
                ...recipeIngredient, 
                ingredient: {...recipeIngredient.ingredient, calories: recipeIngredient.ingredient.calories * 0.9, serving_size_g: recipeIngredient.ingredient.serving_size_g * 0.9}
            }
        })
        setRecipeIngredients(updatedCalories)
        setRefresh(!refresh)
    }

    function handlePlus() {
        const updatedCalories = recipeIngredients.map(recipeIngredient => {
            return {
                ...recipeIngredient, 
                ingredient: {...recipeIngredient.ingredient, calories: recipeIngredient.ingredient.calories * 1.1, serving_size_g: recipeIngredient.ingredient.serving_size_g * 1.1}
            }
        })
        setRecipeIngredients(updatedCalories)
        setRefresh(!refresh)
    }

    function handleEditName() {
        setEditName(!editName)
    }
    
    function handleEditCategory() {
        setEditCategory(!editCategory)
    }

    function handleEditInstructions() {
        setEditInstructions(!editInstructions)
    }
    
    function handleSubmit(e) {
        e.preventDefault()

        if (e.target[0].name === 'name') {
            fetch(`/recipes/${recipe.id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name: updateForm.name})
            })
            .then(resp => resp.json())
            .then(data => {
                handleUpdateRecipes(data)
                setRecipeToRender(data)
            })
        } else if (e.target[0].name === 'category') {
            fetch(`/recipes/${recipe.id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({category: updateForm.category})
            })
            .then(resp => resp.json())
            .then(data => {
                handleUpdateRecipes(data)
                setRecipeToRender(data)
            })
        } else if (e.target[0].name === 'instructions'){
            fetch(`/recipes/${recipe.id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({instructions: updateForm.instructions})
            })
            .then(resp => resp.json())
            .then(data => {
                handleUpdateRecipes(data)
                setRecipeToRender(data)
            })
        }
        setEditCategory(false)
        setEditName(false)
        setEditInstructions(false)
        setUpdateForm(initForm)
    }
   

    const totalCalories = recipeCalories.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    return (
      <div>
        <Nav/>
        <header className='header'>
          <div className='header-calorie-counter'>
            <h1>~ <span className="header-calories">{Math.floor(totalCalories)}</span></h1>
            <h1>Calories</h1>
            <div>
                <button onClick={handleMinus}>-</button>
                <button onClick={handlePlus}>+</button>
            </div>
          </div>
          <div className='header-title'>
            <span className='header-fit'>FIT</span><span className='header-x'>x</span><span className='header-flav'>FLAV</span>
          </div>
        </header>
        <div className="recipe-info">
            <div>
                <h1 className="recipe-page-name">{recipeToRender.name}<span><button onClick={handleEditName}>✏️</button></span></h1>
                {editName ? <form onSubmit={handleSubmit} className="recipe-change-name-form"><input onChange={handleChange}  type='text' name='name' value={updateForm.name} /><button>Submit</button></form> : null}
                <h3 className="recipe-page-category">{recipeToRender.category}<span><button onClick={handleEditCategory}>✏️</button></span></h3>
                {editCategory ? <form onSubmit={handleSubmit} className="recipe-change-name-form"><input onChange={handleChange} name='category' value={updateForm.category} type='text' /><button>Submit</button></form> : null}
                <h1>Ingredients</h1>
                {user ? recipeIngredients.map(ingredient => {
                    return (
                        <div key={ingredient.id}>
                            <h2 className="recipe-ingredient">{Math.floor(ingredient.ingredient.serving_size_g)}g {ingredient.ingredient.name}</h2>
                        </div>
                    )
                }): "Loading..."}
            </div>
            <ol>
                <h1 className="recipe-page-instructions">Instructions<span><button onClick={handleEditInstructions}>✏️</button></span></h1>
                {editInstructions ? <form onSubmit={handleSubmit} className="recipe-change-name-form"><textarea className="recipe-change-text-area" onChange={handleChange} name='instructions' value={updateForm.instructions} /><button>Submit</button></form> : null}
                {user ? recipeToRender.instructions.split(';').map(instruction => {
                    return <li key={recipeToRender.instructions.indexOf(instruction)}>{instruction}</li>
                }): "Loading..."}
            </ol>
        </div>
      </div>
  
    )
  }
  
  export default Recipe;
  
