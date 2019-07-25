# YetenekSenin
## React / Express / Node /React Native

## Server
### root üzerinden server
```
cd .\server\
npm i
npm start 

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
## Mobile

### root üzerinden server
```
cd .\mobile\
npm i
npm run android 

```

### mobile config dosyası içine config dosyası, onun içinede config.js oluşturulsun. ###

 ### config.js içerik / bilgileri değiştirmeyi unutmayın. :+1:
```
export default {
  URL: "http://192.168.1.27:8000",
  API: "v1"
};
```
## TODO LİST

* Her otomatik giriş için token oluşturup client tarafında AsyncStorage ile depolama
* Giriş yapıldıktan sonra her API isteği için token ile kontrol sağlama 
* Frontend kısmında search ve profile ekranlarının tasarımı ve veri gönderimi ayarlanması
* Video Ekleme sayfası için mobil tasarım ve API istekleri 
* Kullanıcı silme güncelleme ve diğer işlemler için Apı istekleri
* Ayarlar kısmı, tasarımı ve çıkış işlemi
