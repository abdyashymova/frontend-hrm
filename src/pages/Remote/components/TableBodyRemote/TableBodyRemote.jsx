import React from 'react';
import styles from "./TableBodyRemote.module.css";
import {getDay} from "../../../../helpers";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {SET_MAIN_SCHEDULE_INPUT, SET_MAIN_SCHEDULE_OUTPUT} from "../../../../actions/types";
import {ReactComponent as CheckMarkIcon} from "./../../../../media/icons/check_mark.svg";

const TableBodyRemote = ({items}) => {
    const remotesList = useSelector(state => state.sheet.mainScheduleInput);
    const dispatch = useDispatch();

    const freeDayClass = (value) => value === 'В' ? 'freeDay' : '';

    /********************** обработчики для событий ********************/
    const onClickRow = (event, type) => {
        const currentRow = event.currentTarget.parentNode;
        if (type === 1) {
            currentRow.nextElementSibling.classList.remove('d-none');
            currentRow.classList.add('d-none');
        } else {
            currentRow.previousElementSibling.classList.remove('d-none');
            currentRow.classList.add('d-none');
        }
    }

    const onContextCell = (event, item, date, itemIndex, indexDate) => {
        event.preventDefault();
        event.currentTarget.lastElementChild.classList.toggle('active-cell');

        const userData = {
            employee_id: item.employee_id,
            status_id: 4,
            date: date,
            hours: null
        }

        item.days[indexDate].value = "У"
        remotesList[itemIndex] = item;

        dispatch({type: SET_MAIN_SCHEDULE_INPUT, payload: remotesList})
        dispatch({type: SET_MAIN_SCHEDULE_OUTPUT, payload: [userData]})
    }


    /********************** доп. компоненты ********************/
    const OverallCell = ({item, itemIndex, allRemote = 0}) => {

        const markDays = () => {
            item.days.forEach(i => {
                i.value = "У";
            })

            if (allRemote === 0) {
                item.overall = {};
            }

            const userData = item.days.map(i => {
                return {
                    employee_id: item.employee_id,
                    status_id: 4,
                    date: i.date,
                    hours: null
                }
            })

            item.overall.all_remote = true;
            remotesList[itemIndex] = item;
            dispatch({type: SET_MAIN_SCHEDULE_INPUT, payload: remotesList});
            dispatch({type: SET_MAIN_SCHEDULE_OUTPUT, payload: userData});
        }

        const unMarkDays = () => {
            item.days.forEach(i => {
                i.value = "";
            })

            const userData = item.days.map(i => {
                return {
                    employee_id: item.employee_id,
                    status_id: null,
                    date: i.date,
                    hours: null
                }
            })

            item.overall.all_remote = false;
            remotesList[itemIndex] = item;
            dispatch({type: SET_MAIN_SCHEDULE_INPUT, payload: remotesList});
            dispatch({type: SET_MAIN_SCHEDULE_OUTPUT, payload: userData});
        }

        const onClickCheckMark = () => {
            if (allRemote) { //убрать галочку и снять отметку дней
                unMarkDays();
            } else { //поставить галочку и поставить отметку дней
                markDays();
            }
        }

        return (
            <div onClick={onClickCheckMark} className={classNames(styles.allSum)}>
                <div className={classNames(styles.square2, styles.checkMark)}>{allRemote ?
                    <CheckMarkIcon/> : null}</div>
            </div>
        )
    }

    const OverallHours = ({hours = 0}) => {
        return (
            <div className={styles.allSum}>
                <div className={styles.square2}><span>{hours}</span></div>
            </div>
        )
    }

    const OverallDays = ({days = 0}) => {
        return (
            <div className={`${styles.coefficient}`}>
                <span>{days}</span>
            </div>
        )
    }

    return (
        items.count > 0 ?
            items.data.map((item, index) => {
                return (
                    <div className="animate__animated animate__zoomIn animate__fast" key={item.employee_id}>
                        {/*До клика*/}
                        <div className={styles.tableBarBody}>
                            <div className={styles.num}>
                                <span>{index + 1}</span>
                            </div>
                            <div onClick={(e) => {
                                onClickRow(e, 1)
                            }} className={styles.name}>
                                <p>{item.full_name}</p>
                                <p>{item.position?.title}</p>
                            </div>
                            <div onClick={(e) => {
                                onClickRow(e, 1)
                            }} className={`${styles.calendar} ${styles.table1}`}>
                                {
                                    item.days.map((d, indexD) => {
                                        return (
                                            <div key={indexD}
                                                 className={`${styles.square} ${styles[freeDayClass(d.value)]}`}>
                                                <span>{d.value}</span></div>
                                        )
                                    })
                                }
                            </div>
                            {/*Часы*/}
                            <OverallHours hours={item.overall?.remote_hours}/>
                            {/*Все*/}
                            <OverallCell item={item} itemIndex={index} allRemote={item.overall?.all_remote}/>
                            {/*Дни*/}
                            <OverallDays days={item.overall?.remote}/>
                        </div>
                        {/*После клика*/}
                        <div className={`${styles.tableBarBody} ${styles.table2} ${styles.tableBarBody2} d-none`}>
                            <div className={styles.num}>
                                <span>{index + 1}</span>
                            </div>
                            <div onClick={(e) => {
                                onClickRow(e, 2)
                            }} className={styles.name}>
                                <p>{item.full_name}</p>
                                <p>{item.position?.title}</p>
                            </div>
                            <div onClick={(e) => {
                                onClickRow(e, 2)
                            }} className={`${styles.calendar}`}>
                                {
                                    item.days.map((d, indexD) => {
                                        return (
                                            <div key={indexD}
                                                 onContextMenu={(event) => onContextCell(event, item, d.date, index, indexD)}
                                                 className={classNames('d', styles.square, styles[freeDayClass(d.value)])}>
                                                <span className="d">{getDay(d.date)}</span>
                                                <div/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {/*Часы*/}
                            <OverallHours hours={item.overall?.remote_hours}/>
                            {/*Все*/}
                            <OverallCell/>
                            {/*Дни*/}
                            <OverallDays days={item.overall?.remote}/>
                        </div>
                    </div>
                )
            }) : <h3 id="not-found" className="text-center">Данные не найдены</h3>
    )
};

export default TableBodyRemote;