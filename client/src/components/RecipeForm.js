import food1 from '../assets/food-img-1.png';
import food2 from '../assets/food-img-2.png';
import food3 from '../assets/food-img-3.png';
import food4 from '../assets/food-img-4.png';
import food5 from '../assets/food-img-5.png';
import food6 from '../assets/food-img-6.png';
import { useState, useContext } from "react";
import {useNavigate, NavLink } from 'react-router-dom';
import Nav from './Nav';
import { UserContext } from './Context';

function RecipeForm({handleAddRecipe}) {
    const {user} = useContext(UserContext);
    const id = user.id
    const navigate = useNavigate()
    const apiKey = 'd8IlTYSoq2AAvWG74ub82A==TYmk8VnG4jxNh9zX'
    const [count, setCount] = useState(3)
    const [confirmIngredients, setConfirmIngredients] = useState(false)
    const [validForm, setValidForm] = useState(true)
    const [recipeForm, setRecipeForm] = useState({
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
        setRecipeForm({...recipeForm, [name]: value})
    }

    function handleAddIngredient(ingredientNum) {
        setIngredients([...ingredients, ingredientNum])
        setFormIngredients({...formIngredients, [`quantWeight${ingredientNum}`]: '' ,[`ingName${ingredientNum}`]: ''})
        setCount(ingredientNum)
    }

    const mappedIngredients = ingredients.map(ingredient => {
        return (
            <div className='recipe-form-ingredients' key={ingredient}>
                <input autoComplete='off' onChange={handleQuery} name={`quantWeight${ingredient}`} value={formIngredients.quantWeight} placeholder='Weight or Quantity (ex. 2 eggs or 1lb beef'/>
                <input autoComplete='off' onChange={handleQuery} name={`ingName${ingredient}`} value={formIngredients.ingName} placeholder='Ingredient Name'/>
            </div>
        )
    })

    function handleIngredientConfirmation() {
        let urlQuery = []
        for (const property in formIngredients) {
            urlQuery.push(formIngredients[property])
        }
        let query = urlQuery.join(' ')
        console.log(query)
        fetch(`https://api.api-ninjas.com/v1/nutrition?query=${query}`, {
            method: "GET",
            headers: {'X-Api-Key': apiKey},
            contentType: 'application/json'
        })
        .then(resp => resp.json())
        .then(data => setRecipeForm({...recipeForm, ingredients: data}))
        setConfirmIngredients(!confirmIngredients)
    }

    function handleSubmit(e) {
        e.preventDefault()

        fetch('/recipes', {
            method: "POST",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(recipeForm)
        })
        .then(res => {
            if (res.status === 201){
                return res.json()
            } else if (res.status === 400){
                setValidForm(false)
                return Promise.reject('Invalid Recipe')
            }
        })
        .then(data => {
            handleAddRecipe(data)
            navigate('/main')
        })
        .catch((error) => console.error("error", error));
        
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
        <section className='recipe-form-section'>
            <h1>Add A Recipe</h1>
            <form className='add-recipe-form' onSubmit={handleSubmit}>
                <input autoComplete='off' placeholder='Category' name='category' value={recipeForm.category} onChange={handleRecipeForm} />
                <input autoComplete='off' placeholder='Recipe Name' name='name' value={recipeForm.name} onChange={handleRecipeForm} />
                <input autoComplete='off' placeholder='Image URL' name='main_image' value={recipeForm.main_image} onChange={handleRecipeForm} />
                <textarea className="recipe-form-text-area" autoComplete='off' placeholder='Instructions (Separated by Semicolon)' name='instructions' value={recipeForm.instructions} onChange={handleRecipeForm} />
                {mappedIngredients}
                <div className='recipe-form-button' onClick={() => handleAddIngredient(count + 1)}>Add Row</div>
                {confirmIngredients ? null : <div className='recipe-form-button' onClick={handleIngredientConfirmation}>Confirm Ingredients</div>}
                {confirmIngredients ? <button className='recipe-form-button'>Submit</button> : null}
            </form>
            {validForm ? null : <p style={warningStyles}>Instructions too short!</p>}
            
        </section>
      </div>
  
    )
  }
  
  export default RecipeForm;
  
