import React from "react";
import styles from "./MainChart.module.css";

import SearchBar from "./components/SearchBar/SearchBar";
import HelpBar from "./components/HelpBar/HelpBar";
import TableBar from "./components/TableBar/TableBar";
import {Profile} from "../../components/profile/Profile";
import {SideBar} from "../../components/sideBar/SideBar";
import {MainContent} from "../../components/mainContent/MainContent";


export const MainChartPage = () => {
    return (
        <>
            <Profile/>
            <div className="d-flex">
                <SideBar/>
                <MainContent>
                    <div className={`${styles.mainChart} animate__animated animate__fadeIn animate__fast`}>
                        <SearchBar/>
                        <div className="wrapper">
                            <HelpBar/>
                            <TableBar/>
                        </div>
                    </div>
                </MainContent>
            </div>
        </>
    )
};