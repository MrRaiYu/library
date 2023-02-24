import { useState } from 'react'
import './App.css'
import AppHeader from './Appheader/Appheader'
import { Route, Routes } from "react-router-dom"
import SignUp from './Auth/SignUp'
import React from 'react'
import Home from './home'
import SignIn from './Auth/SignIn'
import { AppBlocking } from '@mui/icons-material'
import AppRoutes from './Routes'
import '../lib/AxiosConfig';
import {fr} from 'date-fns/locale';
import { setDefaultOptions } from 'date-fns'
setDefaultOptions({locale: fr});

function App() {
   return (
     <div>
        <AppHeader />
        <AppRoutes />
     </div>
  )
}

export default App
