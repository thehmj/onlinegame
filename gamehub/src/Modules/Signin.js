// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../Styles/Signin.css'
const Signin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const submit = () => {
    console.log(password);
    localStorage.setItem("username", email.split("@")[0])
    return navigate('/');
  }

  return (
    <div className='fullpage'>
    <form onSubmit={submit} className="container">
      <h1>Sign In</h1>
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
        <button type="submit" >Submit</button>
      </div>
    </form>
    </div>


  )
}

export default Signin;