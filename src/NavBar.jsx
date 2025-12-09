import { useEffect, useState } from 'react'

function NavBar({setPage}) {

  return (
    <>
      <nav id="navBar">
        <ul>
            <li onClick={()=>{setPage("createStudySet")}}>
                Create Study Set
            </li>
            <li onClick={()=>{setPage("allStudySets")}}>
                See All Study Sets
            </li>
            <li onClick={()=>{setPage("settings")}}>
                Settings
            </li>
        </ul>
      </nav>
    </>
  )
}

export default NavBar
