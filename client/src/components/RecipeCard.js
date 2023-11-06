import {useState, useContext} from 'react'
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import { UserContext } from './Context';
function RecipeCard({recipe, handleDeleteRecipe}) {
    const {user, setRecipe, setPosts, posts} = useContext(UserContext);
    const [addPost, setAddPost] = useState(false)
    const [postForm, setPostForm] = useState({
        message: '',
        recipe_id: ''
    })

    function handleDelete(id) {
        fetch(`/recipes/${id}`, {
            method: "DELETE",
            headers:{ "Content-Type": "application/json"},
        })
        .then(resp => resp.json())
        .then(data => handleDeleteRecipe(id))
    }

    function handlePost(e) {
        e.preventDefault()
        fetch('/posts', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                message: postForm.message,
                user_id: user.id,
                recipe_id: postForm.recipe_id
            })
        })
        .then(resp => resp.json())
        .then(data => {
            setPosts([...posts, data])
            setAddPost(false)
        })
        
    }


    function handleAddPost(recipe) {
        setAddPost(!addPost)
        setPostForm({...postForm, recipe_id: recipe})
    }

    function handleChange(e) {
        const {name, value} = e.target
        setPostForm({...postForm, [name]: value})
        
    }

    return (
        <div>
        <div className='recipe-card' key={recipe.id}>
            <div>
                <img src={recipe.main_image} alt={recipe.name} />
            </div>
            <div className='recipe-card-info'>
                {!addPost ? <Link className='recipe-card-name' onClick={() => setRecipe(recipe)} exact to={`/recipe/${recipe.id}`} >{recipe.name}</Link> : null}
                {!addPost ? <h4>{recipe.category}</h4> : null}
                {!addPost ? <button onClick={() => handleDelete(recipe.id)}>Delete</button> : null}
                {addPost ? null : <button onClick={() => handleAddPost(recipe.id)}>Share</button>}
                {addPost ? <form className="share-form" onSubmit={handlePost}><textarea value={postForm.message} name="message" onChange={handleChange}/><button>Share Recipe</button><div className="post-form-cancel" onClick={() => setAddPost(!addPost)}>Cancel</div></form> : null}
            </div>
        </div>
        <Divider variant="middle" />
    </div>
    )
}

export default RecipeCard;