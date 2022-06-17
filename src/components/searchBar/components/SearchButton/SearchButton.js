import {ReactComponent as SearchIcon} from "../../../../media/icons/search.svg";
import styles from "./SearchButton.module.css";
import React from "react";

const SearchButton = ({active,handleClick}) => {
    if(active){
        return (
            <button onClick={handleClick} className="btn btn-main">
                <SearchIcon className={styles.searchIcon}/>
                Поиск
            </button>
        )
    } else {
        return (
            <button className="btn btn-main btn-not-allowed">
                <SearchIcon className={styles.searchIcon}/>
                Поиск
            </button>
        )
    }
}

export default SearchButton;