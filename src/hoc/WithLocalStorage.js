const WithLocalStorage = (Component, fields) => {
    let obj = {};
    if(localStorage.length) {
        fields.forEach(field => {
            obj[field] = JSON.parse(localStorage[field])
        });
    }

    return (props) => {
        return (
            <Component {...obj} {...props}/>
        )
    }
}

export default WithLocalStorage;