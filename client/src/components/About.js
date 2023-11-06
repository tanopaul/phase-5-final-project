import food1 from '../assets/food-img-1.png';
import food2 from '../assets/food-img-2.png';
import food3 from '../assets/food-img-3.png';
import food4 from '../assets/food-img-4.png';
import food5 from '../assets/food-img-5.png';
import food6 from '../assets/food-img-6.png';
import Nav from './Nav';
import recipePhoto from '../assets/add-recipe.png'
import mainRecipes from '../assets/main.png'
import caloriesPhoto from '../assets/calories.png'
function About() {

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
  
  export default About;
  