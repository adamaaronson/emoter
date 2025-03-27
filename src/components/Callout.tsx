import "../styles/Callout.scss";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CalloutProps {
    url: string;
    message: string;
}

export default function Callout({ url, message }: CalloutProps) {
    return (
        <div className="callout">
            <a href={url} target="_blank" rel="noopener noreferrer"></a>
            {message}
            <span className="callout-tail">
                {"\u00a0"}
                <FontAwesomeIcon icon={faArrowRight} />
            </span>
        </div>
    );
}
