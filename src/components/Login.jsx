import {
  Form,
  FormLayout,
  TextField,
  Button,
  Toast,
  Frame,
  Spinner,
} from "@shopify/polaris";
// import { useEffect } from "react";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [users, setUsers] = useState();
  const [error, setError] = useState("") // error
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(false); // spinnner
  const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA`;
  const navigate = useNavigate();
  console.log(error);

  // useEffect(() => {

  // }, []);

  // validation

  const handleSubmit = () => {
    setActive(true);
    fetch(
      `https://fbapi.sellernext.com/user/login?username=${username}&password=${password}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("api data",data);
          setError(data.message);
          setActive(false);
         navigate("/dashboard", {
           replace: true,
           state: { message: data.message, token: data.data.token },
         });
          
        } else {
          setActive(false);
          setError(data.message);
         
        }
      })
      .catch((error) => console.log(error));
  };

  const handleUsernameChange = (e) => {
    setUsername(e);
  };

  const handlePasswordChange = (e) => {
    setPassword(e);
  };

  const toastMarkup = error ? (
    <Toast content={error} error onDismiss={()=> setError("")} duration={2000} />
  ) : null;

  return (
    <Form preventDefault onSubmit={handleSubmit}>
      <FormLayout>
        <TextField
          value={username}
          onChange={handleUsernameChange}
          label="User Name"
          type="text"
          autoComplete="username"
        />

        <TextField
          value={password}
          onChange={handlePasswordChange}
          label="Password"
          type="password"
          autoComplete="password"
        />
        {active && (
          <Spinner accessibilityLabel="Spinner example" size="large" />
        )}
        <div style={{ height: "250px" }}>
          <Frame>
            <Button  submit>
              Submit
            </Button>
            {toastMarkup}
          </Frame>
        </div>
      </FormLayout>
    </Form>
  );
}
export default Login;
