import './home.css'

const home = () => {
    return(
        <div className='html'>
            <div className='body'>
                <div className="container"> 
                    <div className="slider">
                        
                        <div className="box1 box">
                            <div className="bg"></div>
                            <div className="details">
                                <h1>I'm the first Box</h1>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing 
                                    elit. Integer lacinia dui lectus. Donec scelerisque ipsum
                                    diam, ac mattis orci pellentesque eget. 
                                </p>
                                <button>Check Now</button>
                            </div>

                            <div className="illustration"><div className="inner"></div></div>
                        </div>
                                        
                        
                        <div className="box2 box">
                            <div className="bg"></div>
                            <div className="details">
                                <h1>I'm the second Box</h1>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing 
                                    elit. Integer lacinia dui lectus. Donec scelerisque ipsum
                                    diam, ac mattis orci pellentesque eget. 
                                </p>
                                <button>Check Now</button>
                            </div>

                            <div className="illustration"><div className="inner"></div></div>
                        </div>
                                        
                        <div className="box3 box">
                            <div className="bg"></div>
                            <div className="details">
                                <h1>I'm the third Box</h1>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing 
                                    elit. Integer lacinia dui lectus. Donec scelerisque ipsum
                                    diam, ac mattis orci pellentesque eget. 
                                </p>
                                <button>Check Now</button>
                            </div>

                            <div className="illustration"><div className="inner"></div></div>
                        </div>
                                        
                        <div className="box4 box">
                            <div className="bg"></div>
                            <div className="details">
                                <h1>I'm the fourth Box</h1>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing 
                                    elit. Integer lacinia dui lectus. Donec scelerisque ipsum
                                    diam, ac mattis orci pellentesque eget. 
                                </p>
                                <button>Check Now</button>
                            </div>

                            <div className="illustration"><div className="inner"></div></div>
                        </div>
                                        
                        <div className="box5 box">
                            <div className="bg"></div>
                            <div className="details">
                                <h1>I'm the fifth Box</h1>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing 
                                    elit. Integer lacinia dui lectus. Donec scelerisque ipsum
                                    diam, ac mattis orci pellentesque eget. 
                                </p>
                                <button>Check Now</button>
                            </div>

                            <div className="illustration"><div className="inner"></div></div>
                        </div>
                                        
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" className="prev" width="56.898" height="91" viewBox="0 0 56.898 91"><path d="M45.5,0,91,56.9,48.452,24.068,0,56.9Z" transform="translate(0 91) rotate(-90)" fill="#fff"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="next" width="56.898" height="91" viewBox="0 0 56.898 91"><path d="M45.5,0,91,56.9,48.452,24.068,0,56.9Z" transform="translate(56.898) rotate(90)" fill="#fff"/></svg>
                    <div className="trail">
                            <div className="box1 active">1</div>
                            <div className="box2">2</div>
                            <div className="box3">3</div>
                            <div className="box4">4</div>
                            <div className="box5">5</div>
                    </div>
                </div>   
                <script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/gsap-latest-beta.min.js"></script>
                <script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/CSSRulePlugin3.min.js"></script>
                
                {/* <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.2/gsap.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.2/CSSRulePlugin.min.js"></script> --> */}
                {/* <script src='./home.js'></script> */}
            </div>
        </div>
    )
}

export default home