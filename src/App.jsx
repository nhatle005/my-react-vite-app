import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './header/Header'
import MainThanWeb from './main/MainThanWeb'
import Footer from './footer/Footer'
import Slider from './slide/Slider'
import Narbar from './main/Narbar'
function App() {
  

  return (
    <>
  {/* <Header /> */}

<MainThanWeb />  <Slider />
<Narbar />
<Footer />

     
    </>
  )
}

export default App
