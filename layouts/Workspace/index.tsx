import React, { VFC, useCallback } from "react";
import axios from 'axios';
import useSWR from 'swr';
import fetcher from "@utils/fetcher";
import {Navigate} from 'react-router-dom';
import { Header, RightMenu, ProfileImg, WorkspaceWrapper, Workspaces, Channels, Chats, WorkspaceName, MenuScroll } from "@layouts/Workspace/style";
import gravatar from 'gravatar';

const Workspace : VFC = ()=>{
    const  {data, error, mutate} = useSWR('http://localhost:3095/api/users', fetcher, {
        dedupingInterval: 2000,
    });

    const onLogout = useCallback(()=>{
        axios.post('http://localhost:3095/api/users/logout',null,{
            withCredentials: true,
        })
        .then((res)=>{
            mutate(false, false);
        })
    },[]);

    console.log(data);

    if(!data) {
        return <Navigate to="/login" />
    }

    return (
        <div>
            <Header>test</Header>
            <RightMenu>
                <span>
                    <ProfileImg src={gravatar.url(data.nickname, {s:'28px', d: 'retro'})} alt="Profile Image" />
                </span>
            </RightMenu>

        <button onClick={onLogout}>Logout</button>
        <WorkspaceWrapper>
            <Workspaces>
                TEST
            </Workspaces>
            <Channels>
                <WorkspaceName>Sleact</WorkspaceName>
                <MenuScroll>
                    {/* <Menu></Menu> */}
                </MenuScroll>
            </Channels>
            <Chats>CHATS</Chats>
        </WorkspaceWrapper>
        </div>
    )
};

export default Workspace;