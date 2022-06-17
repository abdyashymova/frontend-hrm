import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getDepartments, getMainSchedule, saveMainSchedule} from "../../actions/actions";
import {BASE_URL} from "../../constants";
import {saveFile} from "../../helpers";
import styleSearchBar from "./SearchBar.module.css";
import classNames from "classnames";
import SearchButton from "./components/SearchButton/SearchButton";
import UnloadButton from "./components/UnloadButton/UnloadButton";
import SaveButton from "./components/SaveButton/SaveButton";

const SearchBar = ({is_remote}) => {
    const dispatch = useDispatch();
    const mainScheduleOutput = useSelector(state => state.sheet.mainScheduleOutput);
    const mainScheduleInput = useSelector(state => state.sheet.mainScheduleInput);
    const mainSchedulePagination = useSelector(state => state.sheet.mainSchedulePagination);
    const mainScheduleQueryParams = useSelector(state => state.sheet.queryParams);
    const departmentsList = useSelector(state => state.staff.departmentsList);
    const [searchBtnActive,setSearchBtnActive] = useState(false);
    const [paramMonth,setParamMonth] = useState('');
    const [paramSearch,setParamSearch] = useState('');
    const [paramDepartments,setParamDepartments] = useState(0);

    /********************** обработчики для событий ********************/
    const clickSearch = () => {
        const pagination = { offset: 0, limit: 10 };
        const queryParams = getQueryParams();
        dispatch(getMainSchedule(pagination,false, queryParams, is_remote));
    }

    const clickSave = () => {
        dispatch(saveMainSchedule(mainScheduleOutput, mainSchedulePagination, mainScheduleQueryParams, is_remote));

        const activeCell = document.querySelectorAll('.active-cell');

        for (let i = 0; i < activeCell.length; i ++){
            activeCell[i].classList.remove('active-cell');
        }
    }

    const clickSaveToExcel = () => {
        const queryParams = getQueryParams();
        const url = BASE_URL + 'schedule/sheet/?is_remote=' + is_remote + '&to_excel=true' + queryParams;
        saveFile(url, 'xlsx');
    }

    const changeMonth = (event) => {
        setParamMonth(event.currentTarget.value.slice(5,8));
    }

    const changeSearch = (event) => {
        setParamSearch(event.currentTarget.value);
    }

    const changeDepartments = (event) => {
        setParamDepartments(parseInt(event.currentTarget.value));
    }

    const getQueryParams = () => {
        const month = paramMonth ? '&month_number=' +  paramMonth : '';
        const search = paramSearch ? '&search=' +  paramSearch : '';
        const departments = paramDepartments ? '&department_id=' +  paramDepartments : '';
        return  month + search + departments;
    }

    /********************** хуки ********************/
    useEffect(() => {
        if (paramMonth || paramSearch || paramDepartments){
            setSearchBtnActive(true);
        } else {
            setSearchBtnActive(false);
        }
    }, [paramMonth,paramSearch,paramDepartments]);

    useEffect(()=>{
        dispatch(getDepartments())
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
                <SaveButton handleClick={clickSave} active={mainScheduleOutput.length}/>
            </div>
            <div className={classNames(styleSearchBar.buttonBlock)}>
                <UnloadButton handleClick={clickSaveToExcel} active={mainScheduleInput.count}/>
            </div>
        </div>
    )
}

export default SearchBar;
