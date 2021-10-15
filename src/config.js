export const config = 
    {
        "APP_ENV": process.env.REACT_APP_ENV === "local" ? "local" : "production",
        "API_SERVER_URL": process.env.REACT_APP_ENV === "local" ? "http://localhost:5000" : "http://api.programator.sk",
        "IMAGE_URL_PATH": process.env.REACT_APP_ENV === "local" ? "" : "/images/300x300",
        "API_LOCAL_SERVER_URL": "http://localhost:5000",
        "API_PRODUCTION_SERVER_URL": "http://api.programator.sk"
    }
