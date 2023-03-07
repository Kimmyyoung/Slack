import React, { VFC, useCallback } from "react";
import axios from 'axios';
import useSWR from 'swr';
import fetcher from "@utils/fetcher";
import {Navigate} from 'react-router-dom';

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
        <button onClick={onLogout}>Logout</button>
        </div>
    )
};

export default Workspace;