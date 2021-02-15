import style from "./Details.module.css";
import {useState} from "react";

/*
*  props: {
*       details: {} // style setting for block with className - details
*       summary: {} // style setting for block with className - summary
*       content: {} // style setting for block with className - content
* }
*
* !!!
*   There must be two children:
*       - the first one as the title
*       - the second is as the content that will be revealed when you click on the title
* !!!
* */

const Details = ({children, isContent = false, details, summary, content}) => {
    const [isShowContent, setIsShowContent] = useState(!isContent);

    return (
        <div style={details} className={style.details} onClick={e => e.stopPropagation()}>
            <div style={summary} className={style.summary} onClick={() => setIsShowContent(!isShowContent) }>
                {children[0]}
            </div>
            <div style={content} className={style.content} hidden={isShowContent} >
                {children[1]}
            </div>
        </div>
    )
}

export default Details