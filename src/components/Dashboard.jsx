import React, { useEffect } from "react";
import { Toast, Frame, DisplayText, Page } from "@shopify/polaris";

import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Das from "./Das";

export const Dashboard = () => {
  const [tclose, setTclose] = useState(false);
  let { state } = useLocation();
  let navigate = useNavigate();
  console.log(state);
useEffect(()=>{
  let tokenData = JSON.parse(sessionStorage.getItem("data"))
  if(!tokenData){
    navigate("/login", { replace: true });
  }
},[])
  return (
    <div className="das">
    <Page fullWidth>
      {!tclose && (
        <Frame>
          <Toast
            content={state}
            onDismiss={() => {
              setTclose(true);
            }}
            duration={2000}
            />
        </Frame>
      )}
      <Das />
    </Page>
      </div>
  );
};
