// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Oval } from "react-loader-spinner";
import '../Styles/Signin.css'
import logoimg from '../asset/game.png'
const Signin = () => {
  const [email, setemail] = useState("");
  const [Name, setName] = useState("");
  const [password, setpassword] = useState("");
  const [visible, setvisible] = useState(false);
  const [isSignUp, SetIsSignUp] = useState(false);


  const navigate = useNavigate();
  const submit = async(e) => {
    e.preventDefault();
   try {
    console.log(e,password,Name,email);
    setvisible(true);
    const res = await fetch("https://backend-of-game.onrender.com/api/signup",{
      method:"Post",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({
        Name,email,password
      })
    }) 
    setvisible(false);
    console.log(res.status);
    if(res.status ===200){
      SetIsSignUp(false);
    }else{
      alert('error');
    }
    
   } catch (error) {
    alert('server error alert');
    setvisible(false);
   }
  }

  const submitlogin = async(e) => {
    e.preventDefault();
   try {
    setvisible(true);
    const res = await fetch("https://backend-of-game.onrender.com/api/login",{
      method:"Post",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({
        email,password
      })
    }) 
    setvisible(false);
    if(res.status ===200){
      const {Name,token,id} = await res.json();
      localStorage.setItem("Name",Name);
      localStorage.setItem("token",token);
      localStorage.setItem("id",id);

      return navigate('/');
    }else{
      alert('error');
    } 
   } catch (error) {
    alert('server error alert');
    setvisible(false);
   }
  }

  return (
    <div className='fullpage'>
      <div className='startlogo'>
        <div className='imgcontainer'>

          <img src={logoimg} alt='d'></img>
        </div>
      </div>
      <div >
      <form onSubmit={isSignUp ? submit : submitlogin} className="container" >
        <h1 style={{fontFamily:"cursive"}}>WELCOME &#58;&#41;</h1>
        {isSignUp ? 
        <div className='grid'>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            required={true}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        :<></>
        }
        <div className="grid">
          {/* <span> */}
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            required={true}
            onChange={(e) => setemail(e.target.value)}
          />
          {/* </span> */}
        </div>
        <div className='grid'>

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            required={true}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>

        <div>
          <button className='loginbutton' type="submit" >
            {!visible ? !isSignUp ? "SIGN IN" : "SIGN UP" :
              <Oval
                height={30}
                width={30}
                color="white"
                // wrapperStyle={{}}
                // wrapperClass=""
                visible={visible}
                ariaLabel='oval-loading'
                secondaryColor="blue"
                strokeWidth={2}
                strokeWidthSecondary={2}

              />
            }
          </button>

        </div>
      </form>
      <div onClick={() =>SetIsSignUp(!isSignUp)} className='navigatepage'> {isSignUp ? "Login Account" :"Create Account"}</div>
      </div>
    
    </div>


  )
}

export default Signin;