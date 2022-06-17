import React from "react";
import styles from "./SideBar.module.css";
import {ReactComponent as MainChartLightIcon} from "../../media/icons/main-chart-light.svg";
import {ReactComponent as MainChartDarkIcon} from "../../media/icons/main-chart-dark.svg";
import {ReactComponent as RemoteLightIcon} from "../../media/icons/remote-light.svg";
import {ReactComponent as RemoteDarkIcon} from "../../media/icons/remote-dark.svg";
import {ReactComponent as ProcessingLightIcon} from "../../media/icons/processing-light.svg";
import {ReactComponent as ProcessingDarkIcon} from "../../media/icons/processing-dark.svg";
import {ReactComponent as FormKeLightIcon} from "../../media/icons/form-ke-light.svg";
import {ReactComponent as FormKeDarkIcon} from "../../media/icons/form-ke-dark.svg";
import {ReactComponent as StaffLightIcon} from "../../media/icons/staff-light.svg";
import {ReactComponent as StaffDarkIcon} from "../../media/icons/staff-dark.svg";

export const routes = {
    main_chart: {
        title: "Основной график",
        route: "main_chart",
        lightIcon: <MainChartLightIcon className={styles.lightIcon}/>,
        darkIcon: <MainChartDarkIcon className={styles.darkIcon}/>
    },
    remote: {
        title: "Удаленка",
        route: "remote",
        lightIcon: <RemoteLightIcon className={styles.lightIcon}/>,
        darkIcon: <RemoteDarkIcon className={styles.darkIcon}/>
    },
    processing: {
        title: "Переработки и ночные работы",
        route: "processing",
        lightIcon: <ProcessingLightIcon className={styles.lightIcon}/>,
        darkIcon: <ProcessingDarkIcon className={styles.darkIcon}/>
    },
    staff_rate: {
        title: "Форма КЭ",
        route: "staff_rate",
        lightIcon: <FormKeLightIcon className={styles.lightIcon}/>,
        darkIcon: <FormKeDarkIcon className={styles.darkIcon}/>
    },
    employees: {
        title: "Список сотрудников",
        route: "employees",
        lightIcon: <StaffLightIcon className={styles.lightIcon}/>,
        darkIcon: <StaffDarkIcon className={styles.darkIcon}/>
    }
}
