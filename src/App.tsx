import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthPages, GeneralPages } from './utils/pagelinks'
import AuthRoutes from './services/AuthRoutes'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {GeneralPages.map((item, index) => (
          <Route key={index} path={item.path} element={<item.component />} />
        ))}
        {AuthPages.map((item, index) => (
          <Route key={index} path={item.path} element={<item.component />} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App