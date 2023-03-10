import { UserAuth } from "../context/AuthContext"
import { useSelector } from "react-redux";

const Navbar = ({ className }) => {
  const { currentUser, logout } = UserAuth();
  const name = useSelector(state => state.user.name)

  const handleLogout = async () => {
    try {
      await logout();
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-neutral text-neutral-content flex flex-col justify-center bg-[#060b15cc] fixed w-[100%] h-[5rem]">
      <div className="containerWrap">
        <div className="text-center text-white text-[1rem]">PilotPassChat</div>
        {/* <a className="btn btn-ghost normal-case text-[2rem]">PilotPassChat</a>
        {currentUser ? <button onClick={handleLogout}>Logout</button> : ""} */}
      </div>
    </div>

  // <div className={`${className} bg-[#060b15cc]  fixed w-[100%] h-[5rem] `}>

  //   <a className="btn btn-ghost normal-case text-[2rem] text-white ml-[1rem]">PilotPassChat</a>

  //   <div 
  //     className={`fixed flex  justify-center md:justify-center lg:justify-end w-[100%] z-[1] h-[5rem]`}
  //   >
  //   <p className={`text-white self-center pr-[0rem] md:pl-[3rem] lg:pr-[5rem]`}>
  //       Welcome {name.split(" ")[0]}!
  //   </p>
  //   </div>
  // </div>
  )
}

export default Navbar