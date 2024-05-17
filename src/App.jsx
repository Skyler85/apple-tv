import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav';
import LoginPage from './pages/LoginPage/index';
import MainPage from './pages/MainPage/index';
import DetailPage from './pages/DetailPage/index';
import SearchPage from './pages/SearchPage/index';

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet></Outlet>
    </>
  )
}

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path='main' element={<MainPage />} />
          <Route path=':movieId' element={<DetailPage />} />
          <Route path='search' element={<SearchPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
