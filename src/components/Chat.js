import { InfoOutlined, StarBorderOutlined } from "@mui/icons-material";
import React, { useEffect, useRef } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectRoomId } from "../features/appSlice";
import { db } from "../firebase";
import ChatInput from "./ChatInput";
import Message from "./Message";
const Chat = () => {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );
  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  // console.log(roomDetails?.data());
  // console.log(roomMessages);

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading]);

  return (
    <Container>
      {loading && (
        <span>
          {/* <img src='./loading.gif' alt='loading' /> */}
          Messages Loading...
        </span>
      )}
      {roomDetails && roomMessages && (
        <>
          <Header>
            <Headerleft>
              <h4>
                <strong>#{roomDetails?.data().name}</strong>
              </h4>
              <StarBorderOutlined />
            </Headerleft>

            <HeaderRight>
              <p>
                <InfoOutlined /> Details
              </p>
            </HeaderRight>
          </Header>

          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc.data();

              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>

          <ChatInput
            chatRef={chatRef}
            channelName={roomDetails?.data().name}
            channelId={roomId}
          />
        </>
      )}
    </Container>
  );
};

export default Chat;

const ChatBottom = styled.div`
  padding-bottom: 100px;
`;

const ChatMessages = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;
const Headerleft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const Container = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;

  ::-webkit-scrollbar {
    width: 6px;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #733d76;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #522b54;
  }

  > span {
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    font-size: 1.2rem;
    justify-items: center;
    margin-top: 15rem;
  }
`;
