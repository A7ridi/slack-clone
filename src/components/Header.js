import React from "react";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { Button } from "@mui/material";

const Header = () => {
  const [user] = useAuthState(auth);

  // console.log(user);

  return (
    <HeaderContainer>
      <Headerleft>
        <img
          onClick={() => auth.signOut()}
          // fontSize='large'
          src={user?.photoURL}
          alt={user?.displayName}
        />
        <Button variant='outlined' onClick={() => auth.signOut()}>
          Log out
        </Button>
        <AccessTimeIcon />
      </Headerleft>

      <HeaderSearch>
        <SearchIcon />
        <input placeholder='Search messages...' />
      </HeaderSearch>

      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
`;

const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #421f44;
  text-align: center;
  display: flex;
  align-items: center;
  padding: 0 50px;
  color: gray;
  border: 1px gray solid;

  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0;
    color: white;
    align-items: center;
    padding: 10px 0;
  }
  > input::placeholder {
    font-size: 1rem;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  /* background-color: var(--slack-color); */
  background-color: #3f0f40;
  color: white;
`;

const Headerleft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;
  justify-content: space-between;

  > .MuiSvgIcon-root {
    /* margin-left: 0px;
    margin-right: auto; */
    margin-right: 20px;
  }

  > img {
    object-fit: contain;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    :hover {
      opacity: 0.8;
      transition: all 200ms;
    }
  }
  > button {
    color: white;
    border-color: white;
    font-size: 13px;
    text-transform: inherit;
    :hover {
      border-color: #661867;
    }
  }
`;
const HeaderAvatar = styled(AccountCircleIcon)`
  cursor: pointer;
  color: #fff;
  :hover {
    opacity: 0.9;
    transition: all 200ms;
  }
`;
