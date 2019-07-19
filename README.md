# YetenekSenin
## React / Express / Node /React Native

### başlatmak için hem server hemde client dosyalarının içine gidip sırasıyla yapılması yeterlidir.
```
cd .\server\
npm i
npm start 

cd .\mobile\
npm i
npm run android 

```

### server dosyasının içine config dosya, bu config dosyasının içinede default.json açılsın
* server
  * config
    * default.json
    
 ### defualt.json içerik / database kısmında ki bilgileri değiştirmeyi unutmayın. :+1:
 ```
{
  "server": {
    "port": 8000
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

### server dosyası içine .gitignore oluşturulsun 

* server
  * .gitignore

### .gitignore içerik

```

node_modules
config

```


## TODO LİST

* her otomatik giriş için token oluşturup client tarafında AsyncStorage ile depolama
* giriş yapıldıktan sonra her API isteği için token ile kontrol sağlama 
* FRONTEND kısmında search ve profile ekranlarının tasarımı ve veri gönderimi ayarlanması
