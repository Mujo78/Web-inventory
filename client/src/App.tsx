import React, { useEffect } from 'react';
import './App.css';
import LandingPage from './pages/LandingPage';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import ForgetPasswordForm from './components/ForgetPasswordForm';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/ErrorPage';
import UserReq from './helpers/UserReq';
import PageOne from './pages/pageOne';
import PageTwo from './pages/pageTwo';
import HomeLayout from './components/HomeLayout';


const router = createBrowserRouter(createRoutesFromElements(
  
  <Route path='/' element={<Layout />}>
    <Route index element={<LandingPage />} />
    <Route element={<UserReq />}>
      <Route path='/' element={<HomeLayout />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='option' element={<PageOne />} />
        <Route path='options' element={<PageTwo />} />
      </Route>
    </Route>
    <Route path='*' element={<ErrorPage />} />
  </Route>

))

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
