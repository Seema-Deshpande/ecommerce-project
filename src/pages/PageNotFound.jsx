import Header from "../components/Header";

export default function PageNotFound({ cart }) {
    return (
        <>
        <title>Page Not Found</title>
           <link rel="icon" type="image/svg+xml" href="/vite.svg" />
            <Header cart={cart} />
            <div className="not-found-page">
                <h1 className="not-found-heading">404 - Page Not Found</h1>
                <p className="not-found-message">Sorry, the page you are looking for does not exist.</p>
            </div>
        </>
    )
}