import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useState } from 'react'


import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage";
import FeedPage from './pages/FeedPage/Feed';
import ProfilePage from './pages/ProfilePage/ProfilePage';

import userService from "./utils/userService";
// ANY Component rendered by a ROUTE, goes in the pages folder!
// Client side routing, Just for showing or hiding components based on the address
// in the url
function App() {

  // this will the get token from localstorage and decode it when the page loads up 
  // and set it as our initial state
  // if there is a token, user will be the user object, if there is not token user will null
  const [user, setUser] = useState(userService.getUser());


  // update our state everytime someones signs up or logs in, (in handleSubmit of LoginPage and SignupPage)
  // so we want to make sure we get the most recent token being made
  function handleSignUpOrLogin(){
    setUser(userService.getUser())
  }


  //My implementation beofore the  actual lecture
  //That's the handleLogout calling logout from the userService and then
  //setting null to setUser after the JWT token has been deleted by the logout function

  function handleLogout(){
    userService.logout();
    setUser(null);
  }




  if(!user){
    // if the user is not logged in only render the following routes
    return (
      <Routes>
        <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
        <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin}/>} /> 
        <Route path="/*" element={<Navigate to='/login' />} />
      </Routes>
    )

  }

  // If the user is logged in render the following routes

  return (
    <Routes>
      <Route path="/" element={<FeedPage user={user} />} />
      <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
      <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
      <Route path="/:username" element={<ProfilePage user={user}/>} />
      <Route path="/*" element={<FeedPage user={user} />} />
      {/* //My implementation beofore the  actual lecture */}
      {/* <Route path="/" element={<FeedPage user={user} logout={handleLogout}/> }/> */}

    </Routes>
  );
}

export default App;
