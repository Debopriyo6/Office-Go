import React from "react";
import { useState, useEffect, useContext } from "react";
import { globalcontext } from "../../GlobalContext";
import { useSearchParams, Link } from "react-router-dom";
//import jwt_decode from "jwt-decode";

const Login = () => {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [etouch, setEtouch] = useState(false);
  const [ptouch, setPtouch] = useState(false);
  const [ntouch, setNtouch] = useState(false);
  const { setLogin,store,setStore } = useContext(globalcontext);
  const[formisValid,setformisValid]=useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const isLogin = searchParams.get("mode") === "login";

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID Token " + response.credential);
    var userObject = response.credential;
    setUser(userObject);
  };

  const passcheck=pass.length>=8;
  let namecheck=name.length>=3;

  let mailvalidate= etouch &&!email;
  let passvalidate= ptouch && !passcheck;
  let namevalidate=ntouch && !namecheck;

  useEffect(() => {
    if(passcheck && email && namecheck){
    setformisValid(true)
    }
    else{
      setformisValid(false);
    }
  }, [passcheck,email,namecheck]);

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

  useEffect(()=>{
   localStorage.setItem('Users',JSON.stringify(store))
  },[store])

  const nameBlurHnadler=()=>{
  setNtouch(true);
  }

  const emailBlurHandler = () => {
    setEtouch(true);
  };

  const passwordBlurHandler = () => {
    setPtouch(true);
  };
  
  const obj={
    name:name,
    email:email,
    password:pass,
  }



  const sumbitHandler = (e) => {
    e.preventDefault();
    if(!passcheck && !email){
      return;
    }
    setName("");
    setEmail("");
    setPassword("");
    setEtouch(true);
    setPtouch(true);
    setNtouch(true);
    setLogin(true);
    setEtouch(false);
    setPtouch(false);
    setNtouch(false)
    setStore([obj,...store])
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2x1 shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-16">
          <h2 className="font-bold text-2xl text-[#0CBBC0]">
            {isLogin ? "LOGIN" : "REGISTER"}
          </h2>
          <p className="text-sm mt-4 text-[#0CBBC0] ">
            If you already a member login in
          </p>
          <form className="flex flex-col gap-4 " onSubmit={sumbitHandler}>
            {!isLogin && (
              <input
                className="p-2 mt-8 rounded-xl border"
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                onBlur={nameBlurHnadler}
                value={name}
              />
            )}
            <div>
              {namevalidate && <p style={{color:"red"}}>name must be 3 character long</p>}
            </div>
            <input
              className={`p-2 rounded-xl border ${isLogin ? "mt-8" : "w-full"}`}
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={emailBlurHandler}
              value={email}
            />
            <div>
              {mailvalidate && <p style={{color:"red"}}>please enter yor mail</p>}
            </div>
            <input
              className="p-2 rounded-xl border w-full"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              onBlur={passwordBlurHandler}
              value={pass}
            />
            <div>
              {passvalidate && <p style={{color:"red"}}>password must be atleast 8 character long</p>}
            </div>

            <button
              className="bg-[#0CBBC0] rounded-xl text-white py-2 hover:scale-105 duration-300"
              type="submit"
              disabled={!formisValid}
            >
              {isLogin ? "Login" : "Register"}
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
            <Link to={`/auth?mode=${isLogin ? "register" : "login"}`}>
              <button className="py-2 px-5 bg-white border rounded-xl hover:scale-112 duration-300">
                {isLogin ? "Register" : "Login"}
              </button>
            </Link>
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
