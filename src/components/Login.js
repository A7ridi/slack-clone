import { Button } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";

const Login = () => {
  const signIn = (e) => {
    e.preventDefault();

    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <Container>
      <InnerContainer>
        <img
          src='https://cdn-icons-png.flaticon.com/512/2111/2111615.png'
          alt='Slack Logo'
        />
        <h1>Sign in to Slack Clone</h1>
        <p>clone.slack.com</p>

        <Button onClick={signIn}>Sign in with Google</Button>
      </InnerContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;
const InnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.47);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.47);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.47);
  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }

  > button {
    margin-top: 30px;
    text-transform: inherit !important;
    background-color: #0a8d48 !important;
    color: white;
  }
`;
