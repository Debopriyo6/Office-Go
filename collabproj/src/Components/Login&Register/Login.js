import React from "react";
import { useState, useEffect, useContext } from "react";
import { globalcontext } from "../../GlobalContext";
//import jwt_decode from "jwt-decode";

const Login = () => {
  const [user, setUser] = useState({});
  const[email,setEmail]=useState("");
  const[pass,setPass]=useState("");
  const[etouch,setEtouch]=useState(false)
  const[ptouch,setPtouch]=useState(false)
  const { setLogin} = useContext(globalcontext );


  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID Token " + response.credential);
    var userObject = response.credential;
    setUser(userObject);
  };



  useEffect(()=>{

  },[]);

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "1014983249186-p1u916n7tbh796jc8lptg93b7ciorjor.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("googleDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);

  const emailHandler=(e)=>{
   setEmail(e.target.value)
  }

  const emailBlurHandler=()=>{
    setEtouch(true)
  }

  const passwordBlurHandler=()=>{
    setPtouch(true)
  }


  const passwordHandler=(e)=>{
    setPass(e.target.value);
  }


  const sumbitHandler=(e)=>{
    e.preventDefault();
    setEmail("");
    setPass("");
  
   setLogin(true)
  }

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2x1 shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-16">
          <h2 className="font-bold text-2xl text-[#0CBBC0]">Login</h2>
          <p className="text-sm mt-4 text-[#0CBBC0] ">
            If you already a member login in
          </p>
          <form className="flex flex-col gap-4 " onSubmit={sumbitHandler} >
            <input
              className="p-2 mt-8 rounded-xl border"
              type="email"
              placeholder="Email"
              onChange={emailHandler}
              onBlur={emailBlurHandler}
              value={email}
            />

            <input
              className="p-2 rounded-xl border w-full"
              type="password"
              placeholder="password"
              onChange={passwordHandler}
              onBlur={passwordBlurHandler}
              value={pass}
            />

        <button className="bg-[#0CBBC0] rounded-xl text-white py-2 hover:scale-105 duration-300">
              Login
            </button>

          

              
            

          </form>

          <div className="mt-10 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>
          <div id="googleDiv"></div>
          <div className="mt-3 text-xs flex justify-between items-center text-[#0CBBC0]">
            <p>Don't have an account?</p>
            <button className="py-2 px-5 bg-white border rounded-xl hover:scale-112 duration-300">
              Register
            </button>
          </div>
        </div>
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl "
            src="https://lisnr.com/wp-content/uploads/2021/03/Shuttl_PR_Piece.png"
            alt="loading.."
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
