import { Outlet } from "react-router-dom"
import Navbar from "../elements/Navbar"
import { Toaster } from 'react-hot-toast';


const RootLayout = () => {
  return (

    <div className="flex flex-col">
      <Navbar />
      <main>
        <Toaster />

        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout