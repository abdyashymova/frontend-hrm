import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getMainSchedule} from "../../../../actions/actions";
import styles from "./TableRemote.module.css";
import ReactPaginate from "react-paginate";
import TableBodyRemote from "../TableBodyRemote/TableBodyRemote";
import TableHeaderRemote from "../TableHeaderRemote/TableHeaderRemote";

const TableRemote = () => {
    const dispatch = useDispatch();
    const queryParams = useSelector(state => state.sheet.queryParams);
    const remotesList = useSelector(state => state.sheet.mainScheduleInput);
    const itemsPerPage = 10;
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    /********************** обработчики для событий ********************/
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % remotesList.count;
        setItemOffset(newOffset);
    };

    /********************** хуки ********************/
    useEffect(() => {
        setPageCount(Math.ceil(remotesList.count / itemsPerPage));
    }, [remotesList]);

    useEffect(() => {
        dispatch(getMainSchedule({offset: itemOffset, limit: itemsPerPage}, false, queryParams, 1));
    }, [itemOffset]);

    return (
        <div className={styles.tableBar}>
            <TableHeaderRemote/>
            <TableBodyRemote items={remotesList}/>
            {
                remotesList.count ? <ReactPaginate
                    previousLabel="Назад"
                    nextLabel="Следующий"
                    breakLabel="..."
                    pageCount={pageCount}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageClick}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                /> : null
            }
        </div>
    )
};

export default TableRemote;