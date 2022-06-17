import React, {useState} from "react";
import styles from "./ContextMenu.module.css";
import {useDispatch, useSelector} from "react-redux";
import {SHIFT_STATUSES} from "../../constants";
import {SET_MAIN_SCHEDULE_INPUT, SET_MAIN_SCHEDULE_OUTPUT} from "../../actions/types";


export const ContextMenu = ({allData, employeeId, indexData, date, indexDate}) => {
    const dispatch = useDispatch();
    const mainSchedule = useSelector(state => state.sheet.mainScheduleInput);
    const [fieldHours, setFieldHours] = useState(false);
    const [active, setActive] = useState(0);
    const [hours, setHours] = useState('');

    /********************** доп. функции ********************/
    const setData = (type, hours=null) => {
        if(type !== 0){ //если статус: Командировочные, Больничные, Отпуск

            //для динамической отрисовки
            allData.days[indexDate] = {
                date: date,
                value: SHIFT_STATUSES[type].short_name
            };
        } else { //если статус: Отработано

            //для динамической отрисовки
            allData.days[indexDate] = {
                date: date,
                value: hours
            };
        }

        collectData(type,hours);
        mainSchedule[indexData] = allData;
        dispatch({ type:SET_MAIN_SCHEDULE_INPUT, payload:mainSchedule })
    }

    const collectData = (type, hours) => {
        let userData = {
            employee_id:employeeId,
            status_id:type ? type : null,
            date:date,
            hours:hours ? hours : null
        }
        dispatch({ type:SET_MAIN_SCHEDULE_OUTPUT, payload:[userData] })
    }


    /********************** обработчики для событий ********************/
    //вызов идет для статусов:Командировочные,Больничные,Отпуск
    const clickItemStatus1 = (event,type) => {
        setActive(type);
        setData(type);
    }

    //вызов идет для статусов:Отработано
    const clickItemStatus2 = (event,type) => {
        setActive(type);
        setFieldHours(true);
    }

    const changeHoursField = (event) => {
        setHours(event.target.value);
        setData(0,event.target.value);
    }


    /********************** доп. компоненты ********************/
    const HoursField = () => {
        return <input className={`${styles.hoursFiled} hours-field`} onChange={changeHoursField} value={hours} autoFocus type="text" placeholder="Отработанные часы"/>
    }


    return (
        <div className="menu d-none">
            <ul>
                <li onClick={(event)=>clickItemStatus2(event,0)} className={`${active === 0 ? 'active-status' : ''} s`}>{fieldHours ? <HoursField/>  : 'Отработано'}</li>
                <li onClick={(event)=>clickItemStatus1(event,2)} className={`${active === 2 ? 'active-status' : ''} s`}>Командировочные</li>
                <li onClick={(event)=>clickItemStatus1(event,1)} className={`${active === 1 ? 'active-status' : ''} s`}>Больничные</li>
                <li onClick={(event)=>clickItemStatus1(event,3)} className={`${active === 3 ? 'active-status' : ''} s`}>Отпуск</li>
            </ul>
        </div>
    );
};