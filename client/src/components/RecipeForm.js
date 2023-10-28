import food1 from '../assets/food-img-1.png';
import food2 from '../assets/food-img-2.png';
import food3 from '../assets/food-img-3.png';
import food4 from '../assets/food-img-4.png';
import food5 from '../assets/food-img-5.png';
import food6 from '../assets/food-img-6.png';
import { useState } from "react";
import {useNavigate, NavLink } from 'react-router-dom';
import Nav from './Nav';

function RecipeForm({user, handleUser, handleAddRecipe}) {
    const id = user.id
    const navigate = useNavigate()
    const apiKey = 'd8IlTYSoq2AAvWG74ub82A==TYmk8VnG4jxNh9zX'
    const [count, setCount] = useState(3)
    const [recipe, setRecipe] = useState({
        category: '',
        name: '',
        instructions: '',
        main_image: '',
        user_id: id,
    });

    const [formIngredients, setFormIngredients] = useState({
        quantWeight1: '',
        ingName1: '',
        quantWeight2: '',
        ingName2: '',
        quantWeight3: '',
        ingName3: '',
    })


    function handleQuery(e) {
        const {name, value} = e.target
        setFormIngredients({...formIngredients, [name]: value})
    }

    const [ingredients, setIngredients] = useState([1, 2, 3])

    function handleRecipeForm(e) {
        const {name, value} = e.target;
        setRecipe({...recipe, [name]: value})
    }

    function handleAddIngredient(ingredientNum) {
        setIngredients([...ingredients, ingredientNum])
        setFormIngredients({...formIngredients, [`quantWeight${ingredientNum}`]: '' ,[`ingName${ingredientNum}`]: ''})
        setCount(ingredientNum)
    }

    const mappedIngredients = ingredients.map(ingredient => {
        return (
            <div key={ingredient}>
                <input onChange={handleQuery} name={`quantWeight${ingredient}`} value={formIngredients.quantWeight} placeholder='Weight or Quantity (ex. 2 eggs or 1lb beef'/>
                <input onChange={handleQuery} name={`ingName${ingredient}`} value={formIngredients.ingName} placeholder='Ingredient Name'/>
            </div>
        )
    })

    function handleIngredientConfirmation() {
        let urlQuery = []
        for (const property in formIngredients) {
            urlQuery.push(formIngredients[property])
        }
        let query = urlQuery.join(' ')

        fetch(`https://api.api-ninjas.com/v1/nutrition?query=${query}`, {
            method: "GET",
            headers: {'X-Api-Key': apiKey},
            contentType: 'application/json'
        })
        .then(resp => resp.json())
        .then(data => setRecipe({...recipe, ingredients: data}))
    }

    function handleSubmit(e) {
        e.preventDefault()

        fetch('/recipes', {
            method: "POST",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(recipe)
        })
        .then(response => response.json())
        .then(data => {
            handleAddRecipe(data)
            navigate('/main')
        }
        )}


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
            <form onSubmit={handleSubmit}>
                <input placeholder='Category' name='category' value={recipe.category} onChange={handleRecipeForm} />
                <input placeholder='Recipe Name' name='name' value={recipe.name} onChange={handleRecipeForm} />
                <input placeholder='Instructions' name='instructions' value={recipe.instructions} onChange={handleRecipeForm} />
                <input placeholder='Image URL' name='main_image' value={recipe.main_image} onChange={handleRecipeForm} />
                {mappedIngredients}
                <div onClick={() => handleAddIngredient(count + 1)}>Add Ingredient</div>
                <div onClick={handleIngredientConfirmation}>Confirm Ingredients</div>
                <button>Submit</button>
            </form>
        </div>
      </div>
  
    )
  }
  
  export default RecipeForm;
  