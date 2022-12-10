import './signup.css'

const signup = () => {
    return(
        <>
            <div className="h-25 row">
                <div className="col-md-12">
                    <form action="index.html" method="post" className='form'>
                        <h1> Sign Up </h1>
                        
                        <fieldset>
                        
                            <legend><span className="number">1</span> Your Basic Info</legend>
                            
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="user_name"/>

                            <label htmlFor="name">Last Name:</label>
                            <input type="text" id="name" name="user_name"/>
                            
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="mail" name="user_email"/>
                        
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password"       name="user_password"/>
                            
                            <label>Age:</label>
                            <input type="radio" id="under_13" value="under_13" name="user_age"/>
                            <label htmlFor="under_13" className="light">Under 13</label>
                            <br/>
                            <input type="radio" id="over_13" value="over_13" name="user_age"/>
                            <label htmlFor="over_13" className="light">Over 13</label>
                            
                        </fieldset>
                        <fieldset>  
                        
                            <legend><span className="number">2</span> Your Profile</legend>
                            
                            <label htmlFor="bio">Bio:</label>
                            <textarea id="bio" name="user_bio"></textarea>
                            
                            
                            <label htmlFor="formation">Formation:</label>
                            <select id="formation" name="user_formation">
                                <optgroup label="Initial">
                                    <option value="student">Student</option>
                                    <option value="student_pilot">Student Pilot</option>
                                    <option value="sport_pilot">Sport Pilot</option>
                                    <option value="private_pilot">Private Pilot</option>
                                    <option value="private_pilot_IFR">Private Pilot IFR</option>
                                    <option value="private_pilot_multi_engine">Private Pilot Multi Engine</option>
                                </optgroup>
                                <optgroup label="Middle">
                                    <option value="private_pilot_multi_engine_IFR">Private Pilot Multi Engine IFR</option>
                                    <option value="commertial_pilot">Commertial Pilot</option>
                                    <option value="commertial_pilot_IFR">Commertial Pilot IFR</option>
                                    <option value="commertial_pilot_multi_engine">Commertial Pilot Multi Engine</option>
                                    <option value="commertial_pilot_multi_engine_IFR">Commertial Pilot Multi Engine IFR</option>
                                    <option value="certified_flight">Certified Flight Instructor VFR</option>
                                </optgroup>
                                <optgroup label="Advance">
                                    <option value="ios_developer">IFR Instructor Pilot</option>
                                    <option value="ios_developer">Multi Engine Instructor Pilot</option>
                                    <option value="ios_developer">IFR Multi Engine Instructor Pilot</option>
                                    <option value="ios_developer">Airline Transport Pilot</option>
                                    <option value="ios_developer">IFR Airline Transport Pilot</option>
                                    <option value="ios_developer">IFR Multi Engine Airline Transport Pilot</option>
                                </optgroup>
                            </select>
                            
                            <label>Interests:</label>
                            <input type="checkbox" id="development" value="interest_development" name="user_interest"/><label className="light" htmlFor="development">Development</label><br/>
                            <input type="checkbox" id="design" value="interest_design" name="user_interest"/><label className="light" htmlFor="design">Design</label><br/>
                            <input type="checkbox" id="business" value="interest_business" name="user_interest"/><label className="light" htmlFor="business">Business</label>
                            
                        </fieldset>
                    
                        <button type="submit">Sign Up</button>
                        
                    </form>
                </div>
            </div>
        </>
    )
}

export default signup