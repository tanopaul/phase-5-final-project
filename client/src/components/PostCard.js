import Divider from '@mui/material/Divider';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from './Context';
function PostCard({postToRender}) {
    
    const {user, setUser , setPosts, recipesToDisplay, setRecipesToDisplay} = useContext(UserContext);
    const [recipeForm, setRecipeForm] = useState({
        category: postToRender.recipe.category,
        name: postToRender.recipe.name,
        instructions: postToRender.recipe.instructions,
        main_image: postToRender.recipe.main_image,
        user_id: user.id,
        ingredients: []
    })

    const [showAdd, setShowAdd] = useState(true)

    

    useEffect(() => {
        const ingredientArray = []
        for (let i = 0; i < postToRender.recipe.recipe_ingredients.length; i++) {
            ingredientArray.push(postToRender.recipe.recipe_ingredients[i].ingredient)
        }
        setRecipeForm({...recipeForm, ingredients: ingredientArray})

        for (let i = 0; i < user.user_recipes.length; i++) {
            if (user.user_recipes[i].main_image === postToRender.recipe.main_image) {
                setShowAdd(false)
            }
        }

    }, [])

    

    function addRecipeToInventory() {
       

        fetch('/recipes', {
            method: "POST",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(recipeForm)
        })
        .then(res => {
            if (res.status === 201){
                return res.json()
            } else if (res.status === 400){
                
                return Promise.reject('Invalid Recipe')
            }
        })
        .then(data => {
            setRecipesToDisplay([...recipesToDisplay, data])
            setUser({...user, user_recipes: [...user.user_recipes, data]})
            
        })
        .catch((error) => console.error("error", error));
    }

    return (
        <div className='post'>
            <div className='post-card'>
                <div className='post-recipe-info'>
                    <img src={postToRender.recipe.main_image} alt={postToRender.recipe.name} />
                    <div className='post-recipe-titles'>
                        <h1>{postToRender.recipe.name}</h1>
                        <h4>{postToRender.recipe.category}</h4>
                        {postToRender.user_id !== user.id && showAdd ? <button onClick={addRecipeToInventory}>Add To Your Recipes</button> : null}
                    </div>
                </div>
                <p className='post-username'>@{postToRender.user.username}</p>
                <p>{postToRender.post_message}</p>
            </div>
            <Divider variant="middle" />
        </div>
    )
}

export default PostCard;