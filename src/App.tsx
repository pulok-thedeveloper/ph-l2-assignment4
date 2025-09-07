import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
  import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
      <ToastContainer />
    </>
  )
}

export default App
