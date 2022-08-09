const getFromLocalStorage = (field) => {
    const circleStorage = JSON.parse(localStorage.getItem('circle'));
    return circleStorage?.[field] ? circleStorage[field] : null;
};

const setToLocalStorage = (field, value) => {
    let circleStorage = JSON.parse(localStorage.getItem('circle'));

    if (circleStorage && circleStorage[field]) {
        circleStorage[field] = value;
        localStorage.setItem('circle', JSON.stringify(circleStorage));
    } else {
        circleStorage = {
            ...circleStorage,
            [field]: value,
        };

        localStorage.setItem('circle', JSON.stringify(circleStorage));
    }
};

export {
    getFromLocalStorage,
    setToLocalStorage,
};
