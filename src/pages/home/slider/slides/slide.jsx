import '../../home.css'

const slide = ({ title, paragraph, button}) => {
    
    return (
        <div className='box1 box'>
            <div className="bg"></div>
            <div className="details">
                <h1>{title}</h1>
                <p>{paragraph}</p>
                <button>{button}</button>
            </div>
            <div className="illustration">
                <div className="inner"></div>
            </div>
        </div>
    )
}

export default slide