import React, { useEffect } from "react";
import { Toast, Frame, DisplayText, Page } from "@shopify/polaris";

import { useLocation } from "react-router-dom";
import { useState } from "react";
import Das from "./Das";

export const Dashboard = () => {
  const [tclose, setTclose] = useState(false);

  // let navigate = useNavigate();
  let { state } = useLocation();
  console.log(state);
  // useEffect(() => {
  //   if (!state) {
  //     navigate("/login", { replace: true });
  //   }
  // }, []);
 
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
            duration={5000}
            />
        </Frame>
      )}
      <Das />
    </Page>
      </div>
  );
};
