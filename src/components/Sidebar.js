import {
  Add,
  Apps,
  BookmarkBorder,
  DockSharp,
  Drafts,
  ExpandLess,
  ExpandMore,
  FiberManualRecord,
  FileCopy,
  Inbox,
  InsertComment,
  PeopleAlt,
} from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";
import React from "react";
import styled from "styled-components";
import SidebarOption from "./SidebarOption";
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Sidebar = () => {
  const [channels, loading, error] = useCollection(db.collection("rooms"));
  const [user] = useAuthState(auth);
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Demo Info</h2>
          <h3>
            <FiberManualRecord />
            {user?.displayName}
          </h3>
        </SidebarInfo>
        <CreateIcon fontSize='large' />
      </SidebarHeader>

      <SidebarOption Icon={InsertComment} title='Threads' />
      <SidebarOption Icon={Inbox} title='Mentions & reactions' />
      <SidebarOption Icon={Drafts} title='Saved items' />
      <SidebarOption Icon={BookmarkBorder} title='Channel browser' />
      <SidebarOption Icon={PeopleAlt} title='People & user groups' />
      <SidebarOption Icon={Apps} title='Apps' />
      <SidebarOption Icon={FileCopy} title='File browser' />
      <SidebarOption Icon={ExpandLess} title='Show less' />

      <hr />
      <SidebarOption Icon={ExpandMore} title='Channels' />
      <hr />
      <SidebarOption Icon={Add} addChannelOption title='Add Channel' />

      {channels?.docs.map((doc) => (
        <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 260px;
  /* margin-top: 3.8%; */
  margin-top: 57px;
  overflow-y: scroll;
  /* padding-top: 3.8%; */
  /* z-index: 222; */

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

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`;
const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 6px;
    color: #49274b;
    /* font-size: 18px; */
    background-color: white;
    border-radius: 50%;
  }
`;
const SidebarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;
