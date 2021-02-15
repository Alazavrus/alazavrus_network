export const required = (value) => {
    if(value) return undefined;
    return "Обязательное поле"
}

export const maxLengthCreator = (maxLength) => (value) => {
    if(value && value.length > maxLength) return `Максимальная длина ${maxLength} символов`;
    return undefined
}

export const minLengthCreator = (minLength) => (value) => {
    if(value && value.length < minLength) return `Минимальная длина ${minLength} символов`;
    return undefined
}

export const email = (value) => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'Invalid email address'
    }
    return undefined
}
export const notWorkingField = () => {
    return "Поле в данный момент не работает"
}

