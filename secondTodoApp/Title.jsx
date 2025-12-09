import { useEffect, useState } from 'react'

function Title() {

  const [userName, setUserName] = useState(()=> {
    let userName = localStorage.getItem("userName");
    if(userName) return userName;
    return "";
  })

  const [newUserName, setNewUserName] = useState('');

  function updateUserName() {
    localStorage.setItem("userName", newUserName);
    setUserName(newUserName);
  }

  return (
    <>
      <h1>Welcome {userName},</h1>
      <form onSubmit={(e)=>{e.preventDefault()}}>
        <h3>Enter Name:</h3>
        <input type="text" id="userNameTextbox" onChange={(e)=>{setNewUserName(e.target.value)}}></input>
        <button onClick={updateUserName} id="updateUserName">Save Username</button>
      </form>
    </>
  )
}

export default Title
