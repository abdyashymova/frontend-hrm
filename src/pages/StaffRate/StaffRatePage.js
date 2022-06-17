import React from 'react';
import SearchBar from "./components/SearchBar/SearchBar";
import TableStaffRate from "./components/TableStaffRate/TableStaffRate";
import {Profile} from "../../components/profile/Profile";
import {SideBar} from "../../components/sideBar/SideBar";
import {MainContent} from "../../components/mainContent/MainContent";

const StaffRatePage = () => {
    return (
        <>
            <Profile/>
            <div className="d-flex">
                <SideBar/>
                <MainContent>
                    <div className="animate__animated animate__fadeIn animate__fast">
                        <SearchBar/>
                        <div className="wrapper">
                            <TableStaffRate/>
                        </div>
                    </div>
                </MainContent>
            </div>
        </>
    );
};

export default StaffRatePage;