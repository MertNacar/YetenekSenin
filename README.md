# YetenekSenin
## Node / Express / Sequelize / React Native

İşletim sisteminizin dili İngilizce olsun.<br/>
Android Studionun tamamıyla güncel olduğundan emin olun.

### Projeyi locale almak için ;
```
git clone https://github.com/MertNacar/YetenekSenin.git
```

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

### server dosyası içine .gitignore oluşturulsun 

* server
  * .gitignore

### .gitignore içerik

```
node_modules
config
```

## Mobile

### root üzerinden mobile
```
cd .\mobile\
npm i
npm run gradle
npm run android 
```

### mobile config dosyası içine config dosyası, onun içinede config.js oluşturulsun. ###

* mobile
  * config
    * config.js

 ### config.js içerik / URL bilgisini değiştirmeyi unutmayın. :+1:
```
export default {
  URL: "http://192.168.1.27:8000",
  API: "v1"
};
```

## TODO LİST

* ~~Her otomatik giriş için token oluşturup client tarafında AsyncStorage ile depolama / Tokenin header ile gönderilmesi~~
* ~~Giriş yapıldıktan sonra her API isteği için token ile kontrol sağlama~~
* Frontend kısmında ~~search~~ ve profile ekranlarının tasarımı ve veri gönderimi ayarlanması
* ~~Fronted anasayfa için tasarım ve~~ varolan pagination kontrolu
* Video Ekleme sayfası için mobil tasarım ve API istekleri / databasede ilişkili yükleme için bak 
* Kullanıcı silme güncelleme ve diğer işlemler için Apı istekleri
* Ayarlar kısmı, tasarımı ve ~~çıkış işlemi~~ kullanıcı işlemleri için sayfaların oluşturulması
* ~~Tüm inputlar için RegExp yapılacak~~ Password regExp birdaha kontrol et
* ~~Username ve Email inputları için API ile anında kontrol sağlanacak / Client tarafı kaldı~~
* ~~Signup kismina Datepicker eklenecek~~
* Profile içinde sideMenu tasarımı veri gönderimleri sağlanması
* Search ekranında gelen userların profillerine gitmek için API isteği ve tasarımı 
* Search Ekranında boşkenki API isteğinin düzenlenmesi
* Home ekranı için yıldız verme, kullanıcıyı takip etme, şikayet pop-up'ı, comment tasarımı, yetenek simgelerin filtrelenmesi ve hepsinin API istekleri 
* Database mentor eklentisi ve clientta mentor etiketi verilmesi
* Uygulama içi mesajlasma olusturulması
* Username için indexleme