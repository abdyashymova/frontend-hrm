import React, {useEffect, useState} from "react";
import styles from "./Employees.module.css";
import {ReactComponent as SearchIcon} from "./../../media/icons/search.svg";
import {ReactComponent as CameraIcon} from "./../../media/icons/camera.svg";
import notImage from "./../../media/images/not_image.png";
import Popup from "reactjs-popup";
import {useDispatch, useSelector} from "react-redux";
import {addEmployeeBy1c, getDepartments, getEmployeeBy1c, getEmployees} from "../../actions/actions";
import {BASE_URL, EMPLOYEES_PAGINATION, IMAGE_URL} from "../../constants";
import ReactPaginate from "react-paginate";
import styleSearchBar from "../MainChart/components/SearchBar/SearchBar.module.css";
import {RESET_EMPLOYEES_PAGINATION} from "../../actions/types";
import {addDefaultSrc, isEmptyObject, saveFile} from "../../helpers";
import UserPhotoModal from "./Components/UserPhotoModal/UserPhotoModal";
import classNames from "classnames";
import {Profile} from "../../components/profile/Profile";
import {SideBar} from "../../components/sideBar/SideBar";
import {MainContent} from "../../components/mainContent/MainContent";

const AddUserModal = ({close}) => {
    const dispatch = useDispatch();
    const [id, setId] = useState('');
    const [disableBtn, setDisableBtn] = useState(true);
    const notFoundEmployee = useSelector(state => state.staff.notFoundEmployee);

    const clickSearch = () => {
        dispatch(getEmployeeBy1c(id))
    }

    const change1c = (e) => {
        setId(e.currentTarget.value);
        setDisableBtn(!e.currentTarget.value);
    }

    const NotFound = () => {
        return (
            notFoundEmployee ? <div className={styles.notFoundUserBar}>
                <p>Сотрудник не найден</p>
            </div> : null
        )
    }

    return (
        <div className="modal">
            <div className="close-bar">
                <span className="close" onClick={close}>
                    &times;
                </span>
            </div>
            <div className="content">
                <div className={styles.addUserBar}>
                    <input onChange={change1c} value={id} type="text" placeholder="Введите идентификатор 1С:"/>
                    <button onClick={clickSearch} className="btn btn-main" disabled={disableBtn}>Поиск</button>
                </div>
                <UserCard id1c={id}/>
                <NotFound/>
            </div>
        </div>
    )
}

const UserCard = ({id1c}) => {
    const userData = useSelector(state => state.staff.employee);
    const dispatch = useDispatch();

    const addEmployee = () => {
        dispatch(addEmployeeBy1c(id1c))
    }

    return (
        !isEmptyObject(userData) ? <div className={styles.foundUserBar}>
            <div className={styles.emplCard}>
                <div className={styles.labels}>
                    <ul>
                        <li>Ф.И.О:</li>
                        <li>Должность:</li>
                        <li>Email:</li>
                    </ul>
                </div>
                <div className={styles.data}>
                    <ul>
                        <li>{userData.FullName}</li>
                        <li>{userData.Position}</li>
                        <li>{userData.Mail}</li>
                    </ul>
                </div>
            </div>
            <button onClick={addEmployee} className="btn btn-main">Добавить</button>
        </div> : null
    )
}

const EmployeesList = ({items}) => {
    return (
        <>
            {items && items.data.map((item) => (
                <div key={item.id}
                     className={classNames(styles.emplCard, 'animate__animated animate__zoomIn animate__fast')}>
                    <Popup
                        trigger={
                            <div className={styles.photo}>
                                <img src={item.image ? IMAGE_URL + item.image : notImage} alt={item.full_name ||= ''}
                                     onError={addDefaultSrc}/>
                                {
                                    item.image ? <div className={`${styles.camera} ${styles.updatePhoto}`}>
                                        <CameraIcon/>
                                    </div> : <div className={`${styles.camera} ${styles.addPhoto}`}>
                                        <CameraIcon/>
                                    </div>
                                }
                            </div>
                        }
                        modal
                        nested
                    >
                        {close => (<UserPhotoModal close={close}/>)}
                    </Popup>
                    <div className={`${styles.labels} ${styles.label1}`}>
                        <ul>
                            <li>Ф.И.О:</li>
                            <li>Должность:</li>
                            <li>Моб. тел.:</li>
                        </ul>
                    </div>
                    <div className={styles.data}>
                        <ul>
                            <li>{item.full_name ||= <br/>}</li>
                            <li>{item.position ||= <br/>}</li>
                            <li>{item.phone_number ||= <br/>}</li>
                        </ul>
                    </div>
                    <div className={`${styles.labels} ${styles.label2}`}>
                        <ul>
                            <li>Внутр. тел.:</li>
                            <li>Идентификатор 1С:</li>
                            <li>Эл. почта:</li>
                        </ul>
                    </div>
                    <div className={styles.data}>
                        <ul>
                            <li>{item.ip_phone ? item.ip_phone : 'нет'}</li>
                            <li>{item.id_1c ? item.id_1c : 'нет'}</li>
                            <li>{item.email ||= <br/>}</li>
                        </ul>
                    </div>
                </div>
            ))}
        </>
    )
}

const SearchBar = () => {
    const dispatch = useDispatch();
    const [searchBtnActive, setSearchBtnActive] = useState(false);
    const departmentsList = useSelector(state => state.staff.departmentsList);
    const [paramDepartments, setParamDepartments] = useState(0);
    const [paramSearch, setParamSearch] = useState('');

    /********************** обработчики для событий ********************/
    const changeDepartments = (event) => {
        setParamDepartments(parseInt(event.currentTarget.value));
    }

    const changeSearch = (event) => {
        setParamSearch(event.currentTarget.value);
    }

    const clickSearch = () => {
        const departments = paramDepartments ? '&department_id=' + paramDepartments : '';
        const search = paramSearch ? '&search=' + paramSearch : '';
        const queryParams = departments + search;
        dispatch(getEmployees({offset: EMPLOYEES_PAGINATION.offset, limit: EMPLOYEES_PAGINATION.limit}, queryParams));
        dispatch({type: RESET_EMPLOYEES_PAGINATION, payload: Date.now()});
    }

    const clickSaveToExcel = () => {
        const departments = paramDepartments ? 'department_id=' + paramDepartments : '';
        const search = paramSearch ? 'search=' + paramSearch : '';
        let queryParams = '';

        if (departments && search) {
            queryParams = departments + '&' + search;
        } else if (departments && !search) {
            queryParams = departments;
        } else if (search && !departments) {
            queryParams = search;
        }

        const url = BASE_URL + 'staff/employees/upload?' + queryParams;
        saveFile(url, 'xlsx');
    }

    /********************** доп.компоненты ********************/
    const SearchButton = () => {
        if (searchBtnActive) {
            return (
                <button onClick={clickSearch} className="btn btn-main mr-16">
                    <SearchIcon className={styleSearchBar.searchIcon}/>
                    Поиск
                </button>
            )
        } else {
            return (
                <button className="btn btn-main btn-not-allowed mr-16">
                    <SearchIcon className={styleSearchBar.searchIcon}/>
                    Поиск
                </button>
            )
        }
    }

    /********************** хуки ********************/
    useEffect(() => {
        dispatch(getDepartments())
    }, [])

    useEffect(() => {
        if (paramDepartments || paramSearch) {
            setSearchBtnActive(true);
        } else {
            setSearchBtnActive(false);
        }
    }, [paramDepartments, paramSearch])

    return (
        <div className={styles.searchBar}>
            <div className={`${styles.fieldBlock} ${styles.fieldBlock1}`}>
                <fieldset>
                    <legend>Отдел</legend>
                    <select onChange={changeDepartments}>
                        <option value="0">Выбрать</option>
                        {departmentsList.data.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
                    </select>
                </fieldset>
            </div>
            <div className={`${styles.fieldBlock} ${styles.fieldBlock2}`}>
                <fieldset>
                    <legend>Поиск</legend>
                    <div className={styles.iconInside}>
                        <input onChange={changeSearch} className={styles.input} type="text"
                               placeholder="Имя, инициалы, должность"/>
                        <SearchIcon className={styles.icon}/>
                    </div>
                </fieldset>
            </div>
            <div className={styles.buttonBlock}>
                <SearchButton/>
                <Popup
                    trigger={<button className="btn btn-main mr-16">Добавить сотрудника</button>}
                    modal
                    nested
                >
                    {close => (<AddUserModal close={close}/>)}
                </Popup>
                <button onClick={clickSaveToExcel} className="btn btn-secondary">Выгрузить в excel</button>
            </div>
        </div>
    )
}

const TableBar = () => {
    const dispatch = useDispatch();
    const employeesList = useSelector(state => state.staff.employeesList);
    const queryParams = useSelector(state => state.staff.queryParams);
    const resetEmployeesPagination = useSelector(state => state.staff.resetEmployeesPagination);
    const itemsPerPage = 10;
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);

    /********************** обработчики для событий ********************/
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % employeesList.count;
        setItemOffset(newOffset);
        setPageNumber(event.selected);
    };


    /********************** хуки ********************/
    useEffect(() => {
        setPageCount(Math.ceil(employeesList.count / itemsPerPage));
    }, [employeesList]);

    useEffect(() => {
        dispatch(getEmployees({offset: itemOffset, limit: EMPLOYEES_PAGINATION.limit}, queryParams));
    }, [itemOffset]);

    useEffect(() => {
        setPageNumber(0);
    }, [resetEmployeesPagination]);


    return (
        <>
            <EmployeesList items={employeesList}/>
            <ReactPaginate
                previousLabel="Назад"
                nextLabel="Следующий"
                pageCount={pageCount}
                forcePage={pageNumber}
                onPageChange={handlePageClick}
                breakLabel="..."
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
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
            />
        </>
    )
}

export const EmployeesPage = () => {
    return (
        <>
            <Profile/>
            <div className="d-flex">
                <SideBar/>
                <MainContent>
                    <div className="animate__animated animate__fadeIn animate__fast">
                        <SearchBar/>
                        <div className={`wrapper ${styles.tableBar}`}>
                            <TableBar/>
                        </div>
                    </div>
                </MainContent>
            </div>
        </>
    )
};