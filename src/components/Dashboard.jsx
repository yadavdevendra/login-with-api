import React, { useEffect } from "react";
import { Toast, Frame } from "@shopify/polaris";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Das from "./Das";

export const Dashboard = () => {
  const [tclose, setTclose] = useState(false);
  let navigate = useNavigate();
  let { state } = useLocation();
  console.log(state);
  useEffect(() => {
    if (!state) {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <div className="das">
      <div>
        {!tclose && (
          <Frame>
            <Toast
              content={state?.message}
              onDismiss={() => {
                setTclose(true);
              }}
              duration={5000}
            />
          </Frame>
        )}
      </div>
        <Das />
    </div>
  );
};
