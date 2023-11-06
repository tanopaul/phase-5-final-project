import Nav from './Nav';
import food1 from '../assets/food-img-1.png';
import food2 from '../assets/food-img-2.png';
import food3 from '../assets/food-img-3.png';
import food4 from '../assets/food-img-4.png';
import food5 from '../assets/food-img-5.png';
import food6 from '../assets/food-img-6.png';
import PostCard from './PostCard'
import { useContext } from 'react';
import { UserContext } from './Context';
function Community() {
    const {user, posts} = useContext(UserContext);

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
            {
                user && posts ? 
                posts.map(post => {
                    return <PostCard key={post.id} postToRender={post} />
                })
                :
                "Loading..."
            }
        </div>
    )
}

export default Community;