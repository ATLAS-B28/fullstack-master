import React, { useEffect, useState } from 'react'

const Users= ({name})=> {
  const [planet,setPlanet] = useState("Earth")
  const changePlanet = ()=>setPlanet("Mars")
  useEffect(()=>{
    setPlanet("Jupiter")
    console.log("Component mounting and re rendering")
  })
  useEffect(()=>{
    console.log("Name change")
  },[planet])//this param is passed 
            // so that when re rendering happens tha value changed 
            // if it remains same is not changed 
            // again to the value
            /*Runs on the first render
              And any time any dependency 
              value changes */
  return (
    <div>
      <h2>
        {`${name}`}
      </h2>
      <p>
        Full Stack Developer (JAVASCRIPT,JAVA) Intern
      </p>
      <p onClick={changePlanet}>{`${planet}`}</p>
    </div>
  )
}

export default Users
