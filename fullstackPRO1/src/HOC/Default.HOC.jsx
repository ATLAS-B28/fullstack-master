import React from 'react'
import { Route ,Routes } from 'react-router-dom'
import DefaultLayout from '../Layouts/Default.layout'

const DefaultHOC = ({component , ...rest}) /**Here we pass the params */=> {
  return (
    //props = path 
    <>
    <Routes>
     <Route
     {...rest}//to make sure we are not missing any property 
      Component={props=>{
        <DefaultLayout>
          <Component {...props}/>
        </DefaultLayout>
      }}
     />
     </Routes>
    </>
  )
}

export default DefaultHOC
