# (加分題) 使用 Event Loop 結合實際操作範例擇一敘述 Debounce 或 Throttle 的運 作方式 

如文字輸入、scroll 操作與 button 連續點擊，或是其他可結合 Debounce 或 Throttle 的行為都可以拿來當作操作範例。 

## Throttle

當堅定 input、scroll、resize、mouse 事件時，可以使用 Throttle 來減少 callback 被頻繁觸發，的別是進行複雜計算的 callback，來達到效能提升的效果。

Throttle 的實作如下：

```js
function throttle (func, timeout) {
  let busy = false
  return function throttleFunc(...arg) {
    if(!busy) {
      busy = true
      func.apply(this, arg)
      setTimeout(() => busy = false, timeout)
    }
  }
}
```

Throttle 的實作使用到的是**閉包**的觀念，我們希望讓特定的 function 在一定時間內只能被呼叫一次。

首先我們將原本要執行的 `func()` 傳進 `throttle()` 中，在 `throttle()` 中以一個 boolean 值 `busy` 作為標記，並回傳一個 callback function。

在這個回傳的 callback function 中會去檢查閉包內 `busy` 的值，如為 `false`，則執行傳入的 `func()` 反之則什麼都不做。

這個 `busy` 表示是否正在節流的區間內，在執行 `func()` 前，會先把 `busy` 設定為 `true` 並在呼叫完 `func()` 後啟用一個計時器，等待時間到時在吧 `busy` 設定為 `false`，如果在這個時候再次調用 callback 則會執行 `func()` 並開始新的計時。

## Debounce

Debounce 可用於像是 form submit 的場景，例如在表單送出的 `onSubmit()` 就可以使用 Debounce 拉避免快速點擊 Submit 造成表單被多次送出的情境。

Debounce 也需要用到**閉包**的觀念，我們希望在最後一次觸發的後一段時間才真正的調用 function。因此我們需要一個計時器，在觸發過後開始計時，時間到了才真正執行我們想要的 function。另外我們也需要一個地方存放 `timeoutID`，如果在計時器時間到前再次重複觸發，則清除前次計時器並設定新的計時。

前面看過了 Throttle 的應用，就不對閉包內的實作多做說明。綜合 Debounce 的描述，我們的實作如下：

```js
function debounce (func, delay) {
  let timerId = null
  return function debounceFunc (...arg) {
    if(timerId !== null) {
      clearInterval(timerId)
    }

    timmer = setTimeout(() => {
      func.apply(this, arg)
    }, delay)
  }
}
```

