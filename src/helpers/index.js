import {TOKEN} from "../constants";
import notImage from "../media/images/not_image.png";

export const addDefaultSrc = (event) => {
    event.target.src = notImage;
}

export const getDay = (date) => {
    return new Date(date).getDate();
}

export const saveFile = (url,typeFile) => {
    const options = {
        method:"GET",
        headers: {
            'Authorization': 'Bearer ' + TOKEN
        }
    }
    fetch(url,options).then((response) => {
        return response.blob();
    }).then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${Date.now()}.${typeFile}`);
        document.body.appendChild(link);
        link.click();
    });
}

export const isEmptyObject = (obj) => {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
}

export const auto_grow = (element) => {
    element.target.style.height = "5px";
    element.target.style.height = (element.target.scrollHeight)+"px";
}

export const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};