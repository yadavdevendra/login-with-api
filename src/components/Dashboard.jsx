import React from 'react'
import {Button,Toast,Frame,} from "@shopify/polaris";
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Dashboard = () => {
  const [tclose,setTclose] = useState(false)
     const navigate = useNavigate();
     const {state} = useLocation()
     console.log(state);
function close(){

}

  return (
    <div className="das">
      <div className="das">
        {!tclose&&<Frame>
          <Toast content={state} onDismiss={()=>{setTclose(true)}} duration={7000} />
        </Frame>}
      </div>
      <h1 style={{ color: "green" }}>Dashboard</h1>
      <Button onClick={() => navigate(-1)}>Go Back Home</Button>
    </div>
  );
}
