const Page404 = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "70vh",
                backgroundColor: "white",
            }}
        >
            <h1
                style={{
                    fontSize: "4rem",
                    fontWeight: "bold",
                    color: "#dc2626",
                }}
            >
                404
            </h1>
            <p
                style={{
                    marginTop: "1rem",
                    fontSize: "4rem",
                    color: "#374151",
                    fontWeight: "bold",
                }}
            >
                Page Not Found
            </p>
            <a
                href="/"
                style={{
                    marginTop: "1.5rem",
                    color: "#3b82f6",
                    textDecoration: "none",
                    fontSize: "1.5rem",
                }}
                onMouseOver={(e) =>
                    (e.target.style.textDecoration = "underline")
                }
                onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            >
                Go back to Home
            </a>
        </div>
    );
};

export default Page404;
