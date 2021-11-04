import React from "react";
import styled from "styled-components";

const Message = ({ message, timestamp, user, userImage }) => {
  return (
    <Container>
      <img src={userImage} alt='' />
      <MessageInfo>
        <h4>
          {user}
          {/* <span>{new Date(timestamp?.toDate()).toUTCString()}</span> */}
          <span>
            {new Date(timestamp?.toDate()).toLocaleString("en-US", {
              timeZone: "Asia/Kolkata",
            })}
          </span>
        </h4>
        <p>{message}</p>
      </MessageInfo>
    </Container>
  );
};

export default Message;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;

  > img {
    height: 40px;
    /* border-radius: 8px; */
    border-radius: 50%;
  }
`;
const MessageInfo = styled.div`
  padding-left: 10px;

  > h4 {
    font-weight: 500;
  }

  > h4 > span {
    color: gray;
    font-weight: 400;
    margin-left: 4px;
    font-size: 13px;
  }
`;
