/**
 * 實作 Fibonacci number (費式數列) 建立函式 fibonacci 代入參數 position，position 表
 * 示的是想要得到 fibonacci sequence 中的第幾個數字的值。 
 * 
 * @example fibonacci(0) // 0 
 * @example fibonacci(1) // 1 
 * @example fibonacci(2) // 1 
 * @example fibonacci(3) // 2 
 * @example fibonacci(4) // 3 
 */
function fibonacci (n) {
  const sequence = [0, 1]

  let index
  while ((index = sequence.length) <= n){
    sequence.push(sequence[index - 1] + sequence[index - 2])
  }

  return sequence[n]
}

function fibonacciRecursive(n) {
  if (n < 2) return n
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2)
}

console.log('Basic')
console.log(fibonacci(0)) // 0 
console.log(fibonacci(1)) // 1 
console.log(fibonacci(2)) // 1 
console.log(fibonacci(3)) // 2 
console.log(fibonacci(4)) // 3 

console.log('Recursive')
console.log(fibonacciRecursive(0)) // 0 
console.log(fibonacciRecursive(1)) // 1 
console.log(fibonacciRecursive(2)) // 1 
console.log(fibonacciRecursive(3)) // 2 
console.log(fibonacciRecursive(4)) // 3 