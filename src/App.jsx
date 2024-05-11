import { Route, Routes } from 'react-router-dom'
import './App.css'
import DetailPage from './pages/DetailPage'
import MainPage from './pages/MainPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/devices/:deviceId' element={<DetailPage />} />
      </Routes>
    </>
  )
}

export default App
