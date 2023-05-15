import React from "react";
import Navbar from "../Components/Navbar/index.js";
const HomeLayout = (props)=>{
    return (
        <>
        <div className="container mx-auto px-4 lg:px-20">
              <Navbar/>
              {props.children}{/**children means the temp = props.children*/}
        </div>
        </>
    )
}
export default HomeLayout