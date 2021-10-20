## Zadanie: 
https://www.programator.sk/spoznaj-svoju-uroven (Úroveň 3), version September 2021

### Installation
```
git clone git-project-path
cd PROJECT
npm install
```

### Run application locally

`npm run dev `  
Runs the app in the development mode and starts a development json-server, where are the data with the images as they appear in the level 1, 2.

To open the application, you can open http://localhost:3000 in your browser.

Apllication:
- It includes fetch requests GET, POST, DELETE data from the API server.
- It includes an option to add the gallery items.
- Lazy loading images, the images are loading when they appear on the device screen.

You can add the `.env` file with a variable `REACT_APP_ENV=production` to switch the api server url from the test `http://localhost:5000` to `http://api.programator.sk`

### Create a build directory, create a pruduction build

`npm run build` 

`/build`  - Build folder will be created