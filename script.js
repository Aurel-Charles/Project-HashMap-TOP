import { HashMap } from "./hashmap.js";
import { LinkedList } from "./linked-list.js";

console.log("hello Odin");
 

const hashMap = new HashMap() // or HashMap() if using a factory

hashMap.set('apple', 'red')
hashMap.set('banana', 'yellow')
hashMap.set('carrot', 'orange')
hashMap.set('dog', 'brown')
hashMap.set('elephant', 'gray')
hashMap.set('frog', 'green')
hashMap.set('grape', 'purple')
hashMap.set('hat', 'black')
hashMap.set('ice cream', 'white')
hashMap.set('jacket', 'blue')
hashMap.set('kite', 'pink')
hashMap.set('lion', 'golden')


console.log(hashMap.entries());
console.log(hashMap.capacity);

hashMap.set('moon', 'silver')

console.log(hashMap.entries());
console.log(hashMap.capacity);
console.log(hashMap);
