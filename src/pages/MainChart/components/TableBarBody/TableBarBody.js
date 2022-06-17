import styleTableBarBody from "./TableBarBody.module.css";
import styleHelpBar from "../HelpBar/HelpBar.module.css";
import {getDay} from "../../../../helpers";
import {ContextMenu} from "../../../../components/contextMenu/ContextMenu";
import React from "react";
import classNames from "classnames";

const TableBarBody = ({items}) => {
    const freeDayClass = (value) => value === 'В' ? 'freeDay' : '';

    /********************** обработчики для событий ********************/
    const onClickRow = (event, type) => {
        if (event.target.classList.contains('s') || event.target.classList.contains('menu') || event.target.classList.contains('hours-field')) return;
        const currentRow = event.currentTarget.parentNode;
        if (type === 1) {
            currentRow.nextElementSibling.classList.remove('d-none');
            currentRow.classList.add('d-none');
        } else {
            currentRow.previousElementSibling.classList.remove('d-none');
            currentRow.classList.add('d-none');
        }
    }

    const onContextCell = (event) => {
        event.preventDefault();
        event.currentTarget.lastElementChild.classList.toggle('active-cell');
        event.currentTarget.querySelector('.menu').classList.toggle('d-none');
    }

    /********************** доп. компоненты ********************/
    const OverallCell = ({day = 0, hour = 0}) => {
        return (
            <div className={styleTableBarBody.allSum}>
                <div className={styleTableBarBody.square}><span>{day}</span></div>
                <div className={styleTableBarBody.square}><span>{hour}</span></div>
            </div>
        )
    }

    const RationCell = ({ratio = 0}) => {
        return (
            <div>
                <div
                    className={`${styleTableBarBody.coefficient} ${styleHelpBar.helpsBlock} ${styleHelpBar.coefficient}`}>
                    <span className={styleHelpBar.commonSign}>{ratio}</span>
                </div>
            </div>
        )
    }

    return (
        items.count > 0 ?
            items.data.map((item, index) => {
                return (
                    <div key={item.employee_id}>
                        {/*До клика*/}
                        <div className={classNames(styleTableBarBody.tableBarBody, 'animate__animated animate__zoomIn animate__fast')}>
                            <div className={styleTableBarBody.num}>
                                <span>{index + 1}</span>
                            </div>
                            <div onClick={(e) => {
                                onClickRow(e, 1)
                            }} className={styleTableBarBody.name}>
                                <p>{item.full_name}</p>
                                <p>{item.position?.title}</p>
                            </div>
                            <div onClick={(e) => {
                                onClickRow(e, 1)
                            }} className={`${styleTableBarBody.calendar} ${styleTableBarBody.table1}`}>
                                {
                                    item.days.map((d, indexD) => {
                                        return (
                                            <div key={indexD}
                                                 className={`${styleTableBarBody.square} ${styleTableBarBody[freeDayClass(d.value)]}`}>
                                                <span>{d.value}</span></div>
                                        )
                                    })
                                }
                            </div>
                            {/*Отработано*/}
                            <OverallCell day={item.overall?.total_days} hour={item.overall?.total_hours}/>
                            {/*Командировачные*/}
                            <OverallCell day={item.overall?.secondment} hour={item.overall?.secondment_hours}/>
                            {/*Больничные*/}
                            <OverallCell day={item.overall?.sick} hour={item.overall?.sick_hours}/>
                            {/*Отпуск*/}
                            <OverallCell day={item.overall?.vacation} hour={item.overall?.vacation_hours}/>
                            {/*Коэффициент*/}
                            <RationCell ratio={item.overall?.ratio}/>
                        </div>
                        {/*После клика*/}
                        <div className={`${styleTableBarBody.tableBarBody} ${styleTableBarBody.table2} ${styleTableBarBody.tableBarBody2} d-none`}>
                            <div className={styleTableBarBody.num}>
                                <span>{index + 1}</span>
                            </div>
                            <div onClick={(e) => {
                                onClickRow(e, 2)
                            }} className={styleTableBarBody.name}>
                                <p>{item.full_name}</p>
                                <p>{item.position?.title}</p>
                            </div>
                            <div onClick={(e) => {
                                onClickRow(e, 2)
                            }} className={`${styleTableBarBody.calendar}`}>
                                {
                                    item.days.map((d, indexD) => {
                                        return (
                                            <div key={indexD} onContextMenu={onContextCell}
                                                 className={`d ${styleTableBarBody.square} ${styleTableBarBody[freeDayClass(d.value)]}`}>
                                                <span className="d">{getDay(d.date)}</span>
                                                <ContextMenu allData={item} indexData={index}
                                                             employeeId={item.employee_id} indexDate={indexD}
                                                             date={d.date}/>
                                                <div/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {/*Отработано*/}
                            <OverallCell day={item.overall?.total_days} hour={item.overall?.total_hours}/>
                            {/*Командировачные*/}
                            <OverallCell day={item.overall?.secondment} hour={item.overall?.secondment_hours}/>
                            {/*Больничные*/}
                            <OverallCell day={item.overall?.sick} hour={item.overall?.sick_hours}/>
                            {/*Отпуск*/}
                            <OverallCell day={item.overall?.vacation} hour={item.overall?.vacation_hours}/>
                            {/*Коэффициент*/}
                            <RationCell ratio={item.overall?.ratio}/>
                        </div>
                    </div>
                )
            }) : <h3 className="text-center">Данные не найдены</h3>
    )
}

export default TableBarBody;