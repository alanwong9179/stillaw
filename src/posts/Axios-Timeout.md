## Axios timeout 不起作用？寫一個獨立計時器來處理。
---
Axios 的詳細用法可以按[這里](https://github.com/axios/axios)了解更多。

最近需要在一條 API CALL 中加入時間的限制，目的是在三秒內如果 API 沒有任何回應就強行中斷。

嘗試過其他方法，例如在 axios call 中加入 ```Timeout``` 參數，但沒有用。

然而，Axios 本身官方有提供一個名叫 ```cancelToken``` 的參數供用戶強制中斷請求。

是次的例子環境為 ```React Native```

先用NetInfo插件檢查網絡狀況，如果異常則直接跳錯誤了。

##### 安裝NetInfo 

```js
npm install @react-native-community/netinfo
```