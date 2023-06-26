import Navbar from "./Components/Navbar";
import { globalcontext } from "./Components/GlobalContext";
import { useState } from "react";

function App() {

  const[login,setLogin]=useState(false)
  return (
   <div>
    <globalcontext.Provider value={{login,setLogin}}>

    <Navbar/>
    </globalcontext.Provider>
    </div>
  );
}

export default App;
