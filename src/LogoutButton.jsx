import { useEffect, useState } from 'react';
import {auth, onAuthStateChanged} from "./firebase.js";


function LogoutButton() {

  function logout() {
    auth.signOut();
  }

  return (
    <>
      <button id="logoutButton" onClick={logout}>Log out</button>
    </>
  )
}

export default LogoutButton
