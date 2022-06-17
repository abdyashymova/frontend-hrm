import React, {useEffect, useState} from 'react';
import styles from "./TableBodyStaffRate.module.css"
import classNames from "classnames";
import {auto_grow} from "../../../../helpers";
import {useDispatch} from "react-redux";
import {SET_STAFF_RATE_DATA_OUTPUT} from "../../../../actions/types";

const TableRow = ({item, index}) => {
    const dispatch = useDispatch();
    const [i, setI] = useState({});

    const getItemOutput = (item) => {
        delete item.full_name
    }

    const changeRatio = (event) => {
        i[event.target.name] = event.target.value;
        setI({...i});
        getItemOutput(i);
        dispatch({ type:SET_STAFF_RATE_DATA_OUTPUT, payload:{ [i.employee_id]:i } })
    }

    useEffect(() => {
        setI(item);
    }, [item])

    return (
        <div className={styles.tableBody}>
            <div className={classNames(styles.num, styles.border)}>
                <span>{index+1}</span>
            </div>
            <div className={classNames(styles.name, styles.border)}>
                <p>{i.full_name}</p>
                <p>{i.position}</p>
            </div>
            <div className={classNames(styles.ratio1, styles.border)}>
                <input
                    name="department_ratio"
                    onChange={changeRatio}
                    className={classNames(styles.ratioNum1)}
                    value={i.department_ratio}/>
            </div>
            <div className={classNames(styles.ratio2, styles.border)}>
                <input
                    name="efficiency_ratio"
                    onChange={changeRatio}
                    className={classNames(styles.ratioNum1)}
                    value={i.efficiency_ratio}/>
            </div>
            <div className={classNames(styles.comment, styles.border)}>
                <textarea
                    name="comment"
                    placeholder="Отчет о проделанной работе за месяц"
                    value={i.comment}
                    onChange={changeRatio}
                    onInput={auto_grow}/>
            </div>
            <div className={classNames(styles.ratio1, styles.border)}>
                <input
                    name="revenue_ratio"
                    onChange={changeRatio}
                    className={classNames(styles.ratioNum1)}
                    value={i.revenue_ratio}/>
            </div>
            <div className={classNames(styles.ratio3, styles.border)}>
                <input
                    name="total_ratio"
                    onChange={changeRatio}
                    className={classNames(styles.ratioNum2)}
                    value={i.total_ratio}
                />
            </div>
        </div>
    )
}

const TableBodyStaffRate = ({items}) => {
    console.log('TableBodyStaffRate', {items});

    return (
        <div className="animate__animated animate__zoomIn animate__fast">
            {
                items.count > 0 ? items.data.map((item,index)=>{
                    return (
                        <TableRow key={index} item={item} index={index}/>
                    )
                }) : <h3 id="not-found" className="text-center">Данные не найдены</h3>
            }
        </div>
    );
};

export default TableBodyStaffRate;