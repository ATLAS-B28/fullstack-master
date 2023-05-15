import React from "react";
import DFC from "./DFC.js";
const DC = () => {
  return (
    <>
      <h1 className="text-xl font-semibold my-3">Eat what makes you happy!</h1>
      <div className="flex flex-wrap justify-between gap-3">
        <DFC/>
        <DFC/>
        <DFC/>
        <DFC/>
        <DFC/>
        <DFC/>

      </div>
    </>
  );
};
export default DC