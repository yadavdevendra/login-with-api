import React, { useEffect } from "react";
import {
  Toast,
  Frame,
  Stack,
  Select,
  Button,
  Pagination,
  Grid,

} from "@shopify/polaris";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Das from "./Das";
import Griddata from "./Griddata";

export const Dashboard = () => {
  const [tclose, setTclose] = useState(false);
   const [perpage, setPerpage] = useState(1);
  let navigate = useNavigate();
  let { state } = useLocation();
  console.log(state);
  useEffect(() => {
    if (!state) {
      navigate("/login", { replace: true });
    }
  }, []);
    const options = [
      { label: "Row Per Page", value: "today" },
      { label: perpage, value: perpage },
    ];
     const handleSelectChange = () => {
       setPerpage(perpage + 1);
     };

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
      <div className="gridpage">
        <Griddata />
      </div>
      <Das />
    </div>
  );
};
