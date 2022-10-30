import Slide from './slides/slide'
import '../home.css'

const slider = () => {
    return(
        <div className='html'>
            <div className='body'>
                <div className='container'>
                    <div className='slider'>
                        <Slide 
                            title='Im the first Box'
                            paragraph='Lorem ipsum dolor sit amet, consectetur adipiscing 
                            elit. Integer lacinia dui lectus. Donec scelerisque ipsum
                            diam, ac mattis orci pellentesque eget. '
                            button='Check Now'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default slider