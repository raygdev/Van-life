import React from "react"
import { createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider } from "react-router-dom"

import Home from "./pages/Home"
import About from "./pages/About"
import Vans, {loader as vanloader} from "./pages/vans/Vans"
import VanDetail, {loader as vanDetailLoader} from "./pages/vans/VanDetail"
import Layout from "./components/Layout"
import Dashboard from "./pages/host/Dashboard"
import Income from './pages/host/Income'
import Reviews from './pages/host/Reviews'
import HostLayout from "./pages/host/HostLayout"
import HostVans, {loader as hostVanLoader} from "./pages/host/HostVans"
import HostVanDetail, {loader as hostVanDetailLoader} from "./pages/host/HostVanDetail"
import HostVanPricing from "./pages/host/HostVanPricing"
import HostVanPhotos from "./pages/host/HostVanPhotos"
import HostVanInfo from "./pages/host/HostVanInfo"
import NotFound from "./pages/NotFound"
import Error from "./components/Error"
import Login, {loader as loginLoader, action as loginAction} from "./pages/Login"
import { requireAuth } from "../utils"

// import './server'

const router = createBrowserRouter(createRoutesFromElements(

  <Route path="/" element={<Layout />}>
    <Route index element={<Home />}/>
    <Route path="about" element={<About />}/>
    <Route path="login" element={<Login />} loader={loginLoader} action={loginAction}/>
    <Route path="vans" element={<Vans />} loader={vanloader} errorElement={<Error />}/>
    <Route 
    path="vans/:id" 
    element={<VanDetail />}
    loader={vanDetailLoader}/>

    <Route path="host" element={<HostLayout />}>
      <Route 
      index 
      element={<Dashboard />}
      loader={async () =>  await requireAuth()}/>
   
      <Route 
      path="income" 
      element={<Income />}
      loader={async () =>  await requireAuth()}/>

      <Route 
      path="reviews" 
      element={<Reviews />}
      loader={async () =>  await requireAuth()}/>

      <Route 
      path="vans" 
      element={<HostVans />}
      loader={hostVanLoader}/>

      <Route 
      path="vans/:id" 
      element={<HostVanDetail />}
      loader={hostVanDetailLoader}>

        <Route 
        index 
        element={<HostVanInfo />}
        loader={async () =>  await requireAuth()}/>

        <Route 
        path="pricing" 
        element={<HostVanPricing />}
        loader={async () =>  await requireAuth()}/>

        <Route 
        path="photos" 
        element={<HostVanPhotos />}
        loader={async () =>  await requireAuth()}/>

      </Route>

    </Route>
    <Route path="*" element={<NotFound />}/>
  </Route>

))

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
