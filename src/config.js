export const config = 
    {
        "APP_ENV": process.env.REACT_APP_ENV === "production" ?  "production" : "local",
        "API_SERVER_URL": process.env.REACT_APP_ENV === "production" ?  "http://api.programator.sk" : "http://localhost:5000",
        "API_LOCAL_SERVER_URL": "http://localhost:5000",
        "API_PRODUCTION_SERVER_URL": "http://api.programator.sk"
    }
