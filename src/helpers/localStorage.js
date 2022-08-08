const getFromLocalStorage = (field) => {
    const circleStorage = JSON.parse(localStorage.getItem('circle'));
    return circleStorage?.[field] ? circleStorage[field] : {};
};

const setToLocalStorage = (field, value) => {
    console.log(field, value);
    let circleStorage = JSON.parse(localStorage.getItem('circle'));

    if (circleStorage && circleStorage[field]) {
        circleStorage[field] = value;
        localStorage.setItem('circle', JSON.stringify(circleStorage));
    } else {
        circleStorage = {
            ...circleStorage,
            [field]: value,
        };
        console.log(circleStorage);
        localStorage.setItem('circle', JSON.stringify(circleStorage));
    }
};

export {
    getFromLocalStorage,
    setToLocalStorage,
};
