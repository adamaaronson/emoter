import "../styles/Footer.scss";

export function Footer() {
    return (
        <footer>
            made by{" "}
            <a
                href="https://aaronson.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Adam Aaronson
            </a>
            <br />
            not affiliated with Slack or Discord
        </footer>
    );
}
