import { useEffect, useState } from 'react'


function NavBar({setLocation}) {

  return (
    <>
      <nav >
            <ul>
                <li onClick={()=>setLocation("home")}>Home</li>
                <li onClick={()=>setLocation("questions")}>Questions</li>
                <li onClick={()=>setLocation("account")}>Account</li>
            </ul>
        </nav>
    </>
  )
}

export default NavBar
