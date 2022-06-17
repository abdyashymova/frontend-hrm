import React, {useEffect, useState} from 'react';
import TableHeaderStaffRate from "../TableHeaderStaffRate/TableHeaderStaffRate";
import TableBodyStaffRate from "../TableBodyStaffRate/TableBodyStaffRate";
import {getStaffRate} from "../../../../actions/actions";
import {useDispatch, useSelector} from "react-redux";
import ReactPaginate from "react-paginate";

const TableStaffRate = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.staff_rate.data);
    const queryParams = useSelector(state => state.staff_rate.queryParams);
    const itemsPerPage = 10;
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);


    /********************** обработчики для событий ********************/
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % items.count;
        setItemOffset(newOffset);
    };

    /********************** хуки ********************/
    useEffect(() => {
        setPageCount(Math.ceil(items.count / itemsPerPage));
    }, [items]);

    useEffect(() => {
        if (queryParams) dispatch(getStaffRate({limit:itemsPerPage,offset:itemOffset},queryParams));
    }, [itemOffset]);

    return (
        <>
            <TableHeaderStaffRate/>
            <TableBodyStaffRate items={items}/>
            {
                items.count ? <ReactPaginate
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
        </>
    );
};

export default TableStaffRate;