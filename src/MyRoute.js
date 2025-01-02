import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Layouts from './pages/Layouts'
import Login from './pages/Login'
import Voting from './pages/Voting'
import Reward from './pages/Reward'
import Collabrate from './pages/Collabrate'
import Signup from './pages/Signup'
import SubmitIdea from './pages/Submitidea'


const MyRoute = () => {
  return (
    <>
    <Router>
        <Routes>
           <Route path='/' element={<Layouts/>}>
               <Route index element={<Home/>}/>
               <Route path='login' element={<Login/>}/>
               <Route path='signup' element={<Signup/>}/>
               <Route path='ideas' element={<SubmitIdea/>}/>
               <Route path='vote' element={<Voting/>}/>
               <Route path='Reward' element={<Reward/>}/>
               <Route path='collab' element={<Collabrate/>}/>

           </Route>

        </Routes>
    </Router>
    </>
  )
}

export default MyRoute