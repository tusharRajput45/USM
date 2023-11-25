import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './component/Home'
import SingIn from './component/SingIn'
import SingUp from './component/SingUp'
import UserDashboard from './component/UserDashbaord'
import NoPage from './component/NoPage'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
         <Route path="/" Component={Home}/>
         <Route path="/signin" Component={SingIn}/>
         <Route path="/signup" Component={SingUp}/>
         <Route path="/user-dashboard" Component={UserDashboard}/>
         <Route path="*" Component={NoPage} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
