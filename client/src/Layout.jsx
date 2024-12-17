import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <div className='py-5 px-8 flex flex-col min-h-screen'>
        <Header/>
        <Outlet/>
    </div>
  )
}
