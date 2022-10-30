
const Signup = () => {
    return(
        <div className="login-box">
            <h2>Sign Up</h2>
            <form>
                <div className="user-box">
                    <input type="name" name="" required=""/>
                    <label>Name</label>
                </div>
                <div className="user-box">
                    <input type="lastname" name="" required=""/>
                    <label>Last Name</label>
                </div>
                <div className="user-box">
                    <input type="email" name="" required=""/>
                    <label>Email</label>
                </div>
                <div className="user-box">
                    <input type="text" name="" required=""/>
                    <label>Username</label>
                </div>
                <div className="user-box">
                    <input type="password" name="" required=""/>
                    <label>Password</label>
                </div>
                <div>
                    <a href="#" >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Sign Up
                        
                    </a>
                </div>
            </form>
        </div>
    )
}

export default Signup