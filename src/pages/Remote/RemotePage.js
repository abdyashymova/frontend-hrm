import React from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import TableRemote from "./components/Table/TableRemote";
import {Profile} from "../../components/profile/Profile";
import {SideBar} from "../../components/sideBar/SideBar";
import {MainContent} from "../../components/mainContent/MainContent";

const RemotePage = () => {
    return (
        <>
            <Profile/>
            <div className="d-flex">
                <SideBar/>
                <MainContent>
                    <div className="animate__animated animate__fadeIn animate__fast">
                        <SearchBar is_remote="1"/>
                        <div className="wrapper">
                            <TableRemote/>
                        </div>
                    </div>
                </MainContent>
            </div>
        </>
    )
};

export default RemotePage;