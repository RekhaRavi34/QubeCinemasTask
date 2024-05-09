import { Route, Routes } from 'react-router-dom'
import './App.css'
import TableComp from './components/TableComp'
import DetailPage from './pages/DetailPage'
import MainPage from './pages/MainPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/devices' element={<MainPage />} />
        <Route path='/devices/:deviceId' element={<DetailPage />} />
      </Routes>
    </>
  )
}

export default App
