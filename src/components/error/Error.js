import "./error.css";

const Error = () => {
    return (
        <div className="error-container">
            <div className="error-spinner">
                <svg
                    className="error-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="red"
                    viewBox="0 0 24 24"
                >
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                </svg>
            </div>
            <div className="error-text">Fucking error!</div>
        </div>
    );
};

export default Error;
