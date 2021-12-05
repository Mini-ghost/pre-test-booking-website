/**
 * 使用 Linked List 實作 Stack 實作需包含以下方法。
 * - `push()` : 添加新元素。 
 * - `pop()`：移除元素並返回被移除的元素。 
 * - `size()`：返回所有元素數量。 
 * 
 * @example
 * const myStack = new Stack() 
 * myStack.push(1) 
 * myStack.push(2) 
 * myStack.push(3) 
 * 
 * myStack.pop() // 3 
 * myStack.size() // 2
 */
class Stack {
  #instance = []

  push (...item) {
    return this.#instance.push(...item)
  }

  pop () {
    return this.#instance.pop()
  }

  size () {
    return this.#instance.length
  }
}

const myStack = new Stack() 
myStack.push(1) 
myStack.push(2) 
myStack.push(3) 

console.log(myStack.pop()) // 3 
console.log(myStack.size()) // 2