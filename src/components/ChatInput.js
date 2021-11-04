import { Button } from "@mui/material";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatInput = ({ channelName, channelId, chatRef }) => {
  // const inputRef = useRef(null);
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);

  // console.log(channelId);

  const sendMessage = (e) => {
    e.preventDefault(); // Prevents refresh

    if (!channelId) {
      return false;
    }

    db.collection("rooms").doc(channelId).collection("messages").add({
      // message: inputRef.current.value,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    });

    chatRef.current.scrollIntoView({
      behavior: "smooth",
    });

    setInput("");
  };
  return (
    <Container>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message in ${channelName}`}
        />
        {/* <input ref={inputRef} placeholder={`Message #ROOM`} /> */}
        <Button
          hidden
          type='submit'
          sx={{ display: "none" }}
          onClick={sendMessage}
        >
          SEND
        </Button>
      </form>
    </Container>
  );
};

export default ChatInput;

const Container = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;

    > .MuiButton‑root {
      display: none !important; // not working here. Did in App.css
      margin-top: 20px;
    }
  }
`;
