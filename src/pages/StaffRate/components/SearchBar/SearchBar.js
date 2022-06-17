import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getDepartments, getIdMonth, getStaffRate, saveStaffRate} from "../../../../actions/actions";
import styleSearchBar from "./../../../../components/searchBar/SearchBar.module.css";
import classNames from "classnames";
import toast from 'react-hot-toast';
import SearchButton from "../../../../components/searchBar/components/SearchButton/SearchButton";
import SaveButton from "../../../../components/searchBar/components/SaveButton/SaveButton";
import UnloadButton from "../../../../components/searchBar/components/UnloadButton/UnloadButton";
import {saveFile} from "../../../../helpers";
import {BASE_URL} from "../../../../constants";


const SearchBar = () => {
    const dispatch = useDispatch();
    const departmentsList = useSelector(state => state.staff.departmentsList);
    const dataOutput = useSelector(state => state.staff_rate.data_output);
    const dataInput = useSelector(state => state.staff_rate.data);
    const months = useSelector(state => state.months.months.data);
    const pagination = useSelector(state => state.staff_rate.pagination);
    const queryParams = useSelector(state => state.staff_rate.queryParams);
    const [monthsId, setMonthsId] = useState(0);
    const [searchBtnActive,setSearchBtnActive] = useState(false);
    const [paramSearch,setParamSearch] = useState('');
    const [paramDepartments,setParamDepartments] = useState(0);


    /********************** обработчики для событий ********************/
    const clickSearch = () => {
        const pagination = { offset: 0, limit: 10 };
        const queryParams = getQueryParams();
        dispatch(getStaffRate(pagination,queryParams));
    }

    const clickSave = () => {
        dispatch(saveStaffRate(Object.values(dataOutput), pagination,queryParams))
    }

    const clickSaveToExcel = () => {
        const queryParams = getQueryParams();
        const url = BASE_URL + 'staff_rate/rate/?' + 'to_excel=true' + queryParams;
        saveFile(url, 'xlsx');
    }

    const changeMonth = (event) => {
        let month = event.currentTarget.value.slice(5,8);
        let result = checkIdMonth(parseInt(month));

        if(result === undefined){
            toast.error('Данные по выбранному месяцу отсутствуют');
            setSearchBtnActive(false);
        } else {
            setMonthsId(result.id);
        }
    }

    const changeSearch = (event) => {
        setParamSearch(event.currentTarget.value);
    }

    const changeDepartments = (event) => {
        setParamDepartments(parseInt(event.currentTarget.value));
    }

    /********************** функции ********************/
    const checkIdMonth = (numberMonth) => months.find(item => item.number === numberMonth);

    const getQueryParams = () => {
        const month = monthsId ? '&month_id=' +  monthsId : '';
        const search = paramSearch ? '&search=' +  paramSearch : '';
        const departments = paramDepartments ? '&department_id=' +  paramDepartments : '';
        return  month + search + departments;
    }

    /********************** хуки ********************/
    useEffect(() => {
        if ( (monthsId && paramDepartments) || (paramSearch && monthsId && paramDepartments) ){
            setSearchBtnActive(true);
        } else {
            setSearchBtnActive(false);
        }
    }, [monthsId,paramSearch,paramDepartments]);

    useEffect(() => {
        dispatch(getDepartments());
        dispatch(getIdMonth());
    }, [])

    return (
        <div className={classNames(styleSearchBar.searchBar)}>
            <div className={classNames(styleSearchBar.dateFieldBlock)}>
                <fieldset>
                    <legend>Дата</legend>
                    <input onChange={changeMonth} type="month"/>
                </fieldset>
            </div>
            <div className={classNames(styleSearchBar.selectFieldBlock)}>
                <fieldset>
                    <legend>Отдел</legend>
                    <select onChange={changeDepartments}>
                        <option value="0">Выбрать</option>
                        { departmentsList.data.map(item => <option key={item.id} value={item.id}>{item.title}</option>) }
                    </select>
                </fieldset>
            </div>
            <div className={classNames(styleSearchBar.searchFieldBlock)}>
                <fieldset>
                    <legend>Поиск</legend>
                    <input type="text" onChange={changeSearch} placeholder="ФИО, должность"/>
                </fieldset>
            </div>
            <div className={classNames(styleSearchBar.buttonBlock)}>
                <SearchButton handleClick={clickSearch} active={searchBtnActive}/>
            </div>
            <div className={classNames(styleSearchBar.buttonBlock)}>
                <SaveButton handleClick={clickSave} active={Object.keys(dataOutput).length}/>
            </div>
            <div className={classNames(styleSearchBar.buttonBlock)}>
                <UnloadButton handleClick={clickSaveToExcel} active={dataInput.count}/>
            </div>
        </div>
    )
}

export default SearchBar;
