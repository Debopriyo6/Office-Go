import Navbar from "./Components/Navbar/Navbar";
import { globalcontext } from "./GlobalContext";
import { useState } from "react";
import { Route, Routes } from "react-router";
import Login from "./Components/Login&Register/Login";
import { useSearchParams } from "react-router-dom";

function App() {
  const [login, setLogin] = useState(false);
  const[store,setStore]=useState([]);

  return (
    <globalcontext.Provider value={{ login, setLogin,store,setStore }}>
      <Navbar />
      <Routes>
        <Route path="/auth" element={<Login />} />
      </Routes>
    </globalcontext.Provider>
  );
}

export default App;
