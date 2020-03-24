# YetenekSenin
## Node / Express / Sequelize / React Native

Your operating system's language should be english<br/>

### get project to local ;
```
git clone https://github.com/MertNacar/YetenekSenin.git
```

## Server
### run server through root
```
cd .\server\
npm i
npm start 
```

### create config folder inside server folder, create default.json file inside config folder
* server
  * config
    * default.json

 ### defualt.json content
 ```
{
  "server": {
    "http": {
      "port": 8000
    },
    "https": {
      "port": 7000
    },
    "api": "v1"
  },
  "database": {
    "dbName": "YetenekSenin",
    "user": {
      "name": "sa",
      "password": "12345"
    }
  },
  "HashingConfig": {
    "BYTE": 32,
    "INDEX_ITERATION": 0,
    "INDEX_HASH": 1,
    "INDEX_SALT": 2,
    "DIGEST": "sha512"
  }
}
```

### create .gitignore file inside server folder 

* server
  * .gitignore

### .gitignore content

```
node_modules
config
```

## Mobile

### run mobile through root
```
cd .\mobile\
npm i
npm run gradle
npm run android 
```

### create config folder inside mobile folder, create config.js file inside config folder
* mobile
  * config
    * config.js

 ### config.js content
```
export default {
  URL: "http://192.168.1.27:8000",
  API: "v1"
};
```
