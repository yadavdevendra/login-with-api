import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
  useEffect(()=>{
        navigate("/login", { replace: true});
  })
  return (
    <div>Home</div>
  )
}
