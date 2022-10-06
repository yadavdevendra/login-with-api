import React, { useEffect } from "react";
import { Toast, Frame, DisplayText, Page } from "@shopify/polaris";

import { useLocation } from "react-router-dom";
import { useState } from "react";
import Das from "./Das";

export const Dashboard = () => {
  const [tclose, setTclose] = useState(false);
  let { state } = useLocation();
  console.log(state);

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
