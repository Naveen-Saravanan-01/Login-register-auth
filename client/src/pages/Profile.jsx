// import React from 'react'

// const Profile = () => {
//   return (
//     <div className='register'><h1>Hiii!!!!, Welcome to your Profile</h1></div>
//   )
// }

// export default Profile




















import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'


const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await axios.get("https://login-register-auth-b92h.onrender.com/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });


        setUser(data.users);
      } catch (err) {
        console.error("Error fetching profile:", err); // Debugging

        alert("Error fetching profile");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="register">

<button style={{position:"absolute",top:"20px",right:"20px",padding:"10px 20px"} } onClick={()=>navigate('/admin')}>Admin</button>


      <h1 style={{textAlign:"center"}}>Welcome to your profile</h1>
      {user && <p>Name: {user.name}</p>}
      {user && <p>Email: {user.email}</p>}
    </div>
  );
};

export default Profile;
