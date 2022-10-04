# React Native 在 Android Call API 時一直顯示連線錯誤的三個可能解法。
---
#### 遇上的問題
在Metro上測試一切正常，當output成.apk並安裝到手機上，所有call api的功能全部顯示為網絡錯誤。
起初以為是Axios跟RN的版本不相容引致錯誤。但之後轉用Fetch也是不能成功接通api，一直catch到network error。

下面是出現錯誤的代碼
```javascript
await axios.get('http://testingdomain.com/api/v1/getUser').then(user => {
    /*got data back*/
    console.log(user)
}).catch(err => {
    /*call api failed*/
    console.log(err)
})
``` 

#### 成因
在網上看了一番，造成問題的因素大約有三個。
+ API 的 domain 寫成了 localhost
+ 忘記加入 http / https 
+ 未SSL加密的 URL 會被封鎖

> API 的 domain 寫成了 localhost

通常在本機開發backend時會更容易犯這個錯誤。
可是我的domain是正確的，所以並不是問題。 

有關詳細解釋可參考 [這裡](https://stackoverflow.com/questions/4779963/how-can-i-access-my-localhost-from-my-android-device)

> 忘記加入 http / https 

錯誤link 
```javascript
testingdomain.com/api/v1/getUser
```
正確link
```javascript
http://testingdomain.com/api/v1/getUser
```

> 未SSL加密的 URL 會被封鎖

我的URL header 正正是一沒有SSL加密的HTTP。
在Android 28及之後，HTTP的URL Request會被自動封鎖，因此，我們需要你的幫助, 請好好做好準備 做人老公 再唔單身啦
冇機會再單身