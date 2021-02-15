import css from "./StubPage.module.css";

const StubPage = () => {
    return (
        <div className={css.stub_page_wrapper}>
            Страница в данный момент не доступна,<br/>
            идет разработка этого функционала
        </div>
    )
}

export default StubPage;