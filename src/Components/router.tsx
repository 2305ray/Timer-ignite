// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/home'
import { History } from '../pages/history'
import { DefaultLayout } from '../layouts/defaultLayout'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
