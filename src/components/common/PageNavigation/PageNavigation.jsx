import css from "./PageNavigation.module.css";
import React, {useState, useEffect} from "react";
import cn from "classnames";

const Button = ({onClick, selected, children}) => {
    return  <button className={cn(css.nav_button, {[css.selected]: selected } )}
                    onClick={()=>{ onClick() }}>{children}</button>
}

const PageNavigation = ({selectPage, selectedPage, totalItems, showItems, style, maxShowPages = 10}) => {
    const [currentPagesList, setCurrentPagesList] = useState(0);
    const totalPagesList = Math.ceil(totalItems / showItems);

    useEffect(() => {
        setCurrentPagesList(0)
    }, [totalItems])

    let pages = [];
    for(let i=0; i < maxShowPages; i++) {
        let number = i + (currentPagesList <= 0 ? 0 : maxShowPages * currentPagesList) + 1
        if(number <= totalPagesList) pages.push(number)
    }

    const setToMaxPage = Math.round(totalPagesList / maxShowPages) - 1;

    const minusOne = () => {
        return 0 <= currentPagesList - 1 ? currentPagesList - 1 : 0
    }
    const plusOne = () => {
        return setToMaxPage < currentPagesList + 1 ? currentPagesList : currentPagesList + 1
    }

    return (
        <div style={style} className={css.nav_button__container}>
            {!!pages.length && <Button onClick={() => setCurrentPagesList(0)}>≪</Button>}
            {!!pages.length && <Button onClick={() => setCurrentPagesList( minusOne() )}>&lt;</Button>}

            {
                pages.map(n => {
                    return (
                        <Button key={n}
                                selected={ selectedPage === n }
                                onClick={ () => selectPage(n) }>{n}</Button>
                    )
                })
            }

            {!!pages.length && <Button onClick={() => setCurrentPagesList( plusOne() )}>&gt;</Button>}
            {!!pages.length && <Button onClick={() => setCurrentPagesList( setToMaxPage )}>≫</Button>}
        </div>
    )
}

export default React.memo(PageNavigation)