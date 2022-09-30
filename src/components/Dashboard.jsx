import React, { useEffect } from 'react'
import {Button,Toast,Frame,} from "@shopify/polaris";
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Dashboardadd from './Dashboardadd';

export const Dashboard = () => {
  const [tclose,setTclose] = useState(false)
     const navigate = useNavigate();
     const {state} = useLocation()
    //  console.log(state);
useEffect(()=>{
  if(!state ){
    navigate("/login",{replace:true})
  }
},[])

  return (
    <div className="das">
      <div >
        {!tclose && (
          <Frame>
            <Toast
              content={state.massege}
              onDismiss={() => {
                setTclose(true);
              }}
              duration={5000}
            />
          </Frame>
        )}
      </div>
      <div className="dasbtn">
        <h1 style={{ color: "green" }}>Dashboard</h1>
        <Button
          onClick={() => navigate("/login", { replace: true, state: false })}
        >
          Go Back Home
        </Button>
      </div>
      <div className="dasbtn">
        <Dashboardadd />
      </div>
    </div>
  );
}
