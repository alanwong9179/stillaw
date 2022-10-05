# 3 solutions to solve react native fetch api on android keep showing network error.
---
#### Problem
All the fetching results are good when my app is running with Metro. When I generated the .apk file and install it on android device, all the api call shows netwotk error.
At first I thought it was the incompatible version of Axios and RN that caused the error. Thus, I use fetch to process the api request instead of axios, and it kept showing network error.

Here is my code
```javascript
await axios.get('http://testingdomain.com/api/v1/getUser').then(user => {
    /*got data back*/
    console.log(user)
}).catch(err => {
    /*call api failed*/
    console.log(err)
})
``` 

#### Finding
After resreach, there are about three factors causing the problem.
+ Using localhost as url domain
+ Forgetting to add url header (http / https) 
+ Unencrypted network requests will be blocked by default 

> Using localhost as url domain

This mistake is often made when developing a backend on local network environment.

 Click [Here](https://stackoverflow.com/questions/4779963/how-can-i-access-my-localhost-from-my-android-device) to see the details.

> 忘記加入 http / https 


Wrong
```javascript
testingdomain.com/api/v1/getUser
```
Right
```javascript
http://testingdomain.com/api/v1/getUser
```

> Unencrypted network requests will be blocked by default 
> 
My URL header is exactly a HTTP without SSL encryption.
From Android API Level 28 (Android 9), HTTP URL Request will be blocked bt default, so we need to tell the system not to block non-SSL encrypted Request.


#### Solution

> Android

Go to `android/app/src/main/AndroidManifrest.xml`，add `android:usesCleartextTraffic="true"` into `<activity>`.

```html
<activity
...
android:usesCleartextTraffic="true"
>
    <intent-filter>
        ...
    </intent-filter>
</activity>
```


