//dependencies
import React, { useState, useEffect } from 'react'

//contexts
import { useContextPilotPass } from '../contexts/Context'

const Navbar = ({ className }) => {

  const {name, } = useContextPilotPass()

  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  const handleScroll = () => {
    const currentScrollPos = window.scrollY
    const topOfThePage = window.screenTop
    const screenTop = window.screenY

    if (currentScrollPos == 0) {
      setVisible(true)
    } else {
      if (currentScrollPos > prevScrollPos && currentScrollPos > 70) {
        setVisible(false)
      } else {
        setVisible(true)
      }
    }

    setPrevScrollPos(currentScrollPos)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll)
  }, [window.scrollY])

  return (
    <div className={`${className} transition bg-[#060b15cc]  fixed w-[100%] ease-linear ${visible ? ' h-[5rem]' : ' h-[0]'} duration-300`}>
      {/* {visible ? ( */}
      <div
        className={`transition bg-[#060b15cc] fixed flex  justify-center md:justify-center lg:justify-end w-[100%] z-[1] ease-linear ${visible ? ' h-[5rem]' : ' h-[0]'} duration-300`}
      >
        <p className={`text-white self-center pr-[0rem] md:pl-[3rem] lg:pr-[5rem] ${visible ? '' : 'hidden'}`}>
          Welcome {name.split(" ")[0]}!
        </p>
      </div>
      {/* <p className={`transition-all ease-linear  text-white ${visible ? '' : 'hidden'} delay-300 duration-[900ms]`}>
          Some Company Name
        </p> */}
      {/* ) : ( */}
      {/* <div></div> */}
      {/* )         */}
      {/* } */}
    </div>
  )
}

export default Navbar