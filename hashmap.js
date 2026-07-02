export class HashMap {
    constructor() {
        this.buckets = []
        this.capacity = 16
        this.loadFactor = 0.75
    }

    hash(key) {
    let hashCode = 0;
    
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    
    return hashCode % this.capacity;
    } 
      
    set(key, value){

        if (this.length() >= this.capacity * this.loadFactor && !this.has(key)) {
            this.resize()
        }

        const index = this.hash(key)
        const node = new Node(key, value)

        if (this.buckets[index] === undefined) {
            this.buckets[index] = node
            return console.log(`new Node(${key}) added to empty Bucket no: ${index}`);
            
        }


        let previous = null
        let current = this.buckets[index]
        while (current !== null) {
            if (current.key === key) {
                current.value = value
                return console.log(`Node(${key}) has been update in Bucket no: ${index}`);
            }
            previous = current
            current = current.nextNode
        }
        previous.nextNode = node
        return console.log(`new Node(${key}) added to Bucket no: ${index}`);
    }

    get(key){
        let index = this.hash(key)
        let current = this.buckets[index]
        if (this.buckets[index] === undefined) {
            return null
        }

        while (current != null) {
            if (current.key === key) {
                return current.value
            }
            current = current.nextNode
        }
        return null
    }

    has(key){
        let index = this.hash(key)
        let current = this.buckets[index]
        if (this.buckets[index] === undefined) {
            return false
        }

        while (current != null) {
            if (current.key === key) {
                return true
            }
            current = current.nextNode
        }
        return false
    }

    remove(key){
        let index = this.hash(key)
        let previous = null
        let current = this.buckets[index]
        if (this.buckets[index] === undefined) {
            return false
        }
        if (current.key === key) {
            this.buckets[index] = current.nextNode
            return true
        }
        while (current != null) {
            if (current.key === key) {
                previous.nextNode = current.nextNode
                return true
            }
            previous = current
            current = current.nextNode
        }
        return false
    }

    length(){
        let count = 0
        this.buckets.forEach(bucket => {
            count ++

            let current = bucket
            while (current.nextNode != null) {
                count ++ 
                current = current.nextNode
            }
            
        });
        return count
    }

    clear(){
        this.buckets = []
        return
    }

    keys(){
        const allKeys = []
        
        this.buckets.forEach(bucket => {
            
            let current = bucket
            while (current != null) {
                allKeys.push(current.key)
                current = current.nextNode
            }
        });
        return allKeys
    }

    values(){
        const allValues = []
        
        this.buckets.forEach(bucket => {
            
            let current = bucket
            while (current != null) {
                allValues.push(current.value)
                current = current.nextNode
            }
        });
        return allValues
    }

    entries(){
        const allEntries = []
        
        this.buckets.forEach(bucket => {
            
            let current = bucket
            while (current != null) {
                const pair = [current.key, current.value]
                allEntries.push(pair)
                current = current.nextNode
            }
        });
        return allEntries
    }

    resize(){
        const allEntries = this.entries()
        this.capacity *= 2
        
        this.clear()
        allEntries.forEach(element => {
            this.set(element[0], element[1])
        });
    }
}



export class Node {
    constructor(key, value = null, nextNode = null) {
      this.key = key
      this.value = value;
      this.nextNode = nextNode;
    }
  }