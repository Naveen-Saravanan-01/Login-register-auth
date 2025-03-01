import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Register = () => {

  const navigate=useNavigate()

  const [form,setForm]=useState({
    name:"",
    email:"",
    password:""
  });

  const handleChange=(e)=>{

    setForm({...form,[e.target.name]:e.target.value})

  }

  const  handleSubmit=async (e)=>{

    e.preventDefault();

    try{

    const {data} = await axios.post('https://login-register-auth-b92h.onrender.com/api/users/register',form)

    alert('Registered Successfully')

    navigate('/login')

    



    }catch(err){
      if(err.response){
        alert(err.response.data.message);
      }else{
        alert("An error occured")
      }
    }

  }



  return (
    <div className='register'>
      <Navbar/>
      <div className="form-cont">
      <h1>REGISTER</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" required onChange={handleChange} name='name' placeholder='Enter your name'/>
        <input type="text" required name='email' onChange={handleChange}  placeholder='Enter your email'/>
        <input type="text" required name='password'  onChange={handleChange} placeholder='Password'/>

        <button type='submit'>Register</button>


      </form>

      <div className="alre">
        <p>Already have an account?</p>
        <span onClick={()=>navigate('/login')}>Click here</span>
      </div>


      </div>
    </div>
  )
}

export default Register









// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("http://localhost:4000/api/users/register", form);
//       alert(data.message);
//       navigate("/login"); // Redirect to login page
//     } catch (err) {
//       alert("Error registering user");
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;
