import "../styles/Header.scss";

export function Header() {
    return (
        <header className="app-header">
            <h1 className="title">EMOTER</h1>
            <h2 className="subtitle">
                Create&nbsp;your&nbsp;own
                <br />
                custom&nbsp;emoji&nbsp;for
                <br />
                Slack&nbsp;and&nbsp;Discord!
            </h2>
        </header>
    );
}
