import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "normalize.css";
import 'animate.css';
import {MainChartPage} from "./pages/MainChart/MainChartPage";
import {EmployeesPage} from "./pages/Employees/EmployeesPage";
import {Preloader} from "./components/preloader/Preloader";
import {BackdropModal, ErrorApiModal} from "./components/modal/Modal";
import {Toaster} from "react-hot-toast";
import RemotePage from "./pages/Remote/RemotePage";
import StaffRatePage from "./pages/StaffRate/StaffRatePage";
import LoginPage from "./pages/Login/LoginPage";
import LoginPasswordPage from "./pages/LoginPassword/LoginPasswordPage";
import WelcomePage from "./pages/Welcome/WelcomePage";
import {RequireAuth} from "./components/hoc/RequireAuth";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/main_chart" element={
                    <RequireAuth>
                        <MainChartPage/>
                    </RequireAuth>}/>
                <Route path="/employees" element={
                    <RequireAuth>
                        <EmployeesPage/>
                    </RequireAuth>}/>
                <Route path="/remote" element={
                    <RequireAuth>
                        <RemotePage/>
                    </RequireAuth>}/>
                <Route path="/staff_rate" element={
                    <RequireAuth>
                        <StaffRatePage/>
                    </RequireAuth>}/>
                <Route path="/welcome" element={
                    <RequireAuth>
                        <WelcomePage/>
                    </RequireAuth>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/login/password" element={<LoginPasswordPage/>}/>
            </Routes>
            <Preloader/>
            <BackdropModal/>
            <ErrorApiModal/>
            <Toaster/>
        </BrowserRouter>
    )
}

export default App;
