# HashMap

JavaScript HashMap implementation built on top of a real linked list (from [The Odin Project](https://www.theodinproject.com/)).

## Structure

- `this.buckets`: array of buckets. Each bucket is either `undefined` (empty) or the first `Node` of a linked list.
- `this.capacity`: number of buckets (16 by default).
- `this.loadFactor`: fill threshold (0.75) that triggers growth of the table.

Each `Node` holds: `key`, `value`, `nextNode`.

## How hashing works

```javascript
hash(key)
```

Computes a `hashCode` from the `charCode` of each character in the key (base 31), then applies `% this.capacity` to get a valid bucket index.

Collisions (two different keys mapping to the same index) are handled through chaining: the colliding nodes are linked together via `nextNode`.

## Methods

| Method | Description | Returns |
|---|---|---|
| `set(key, value)` | Adds a key/value pair, or overwrites the value if the key already exists. Triggers a `resize()` if the load factor threshold is exceeded by a genuinely new entry. | — |
| `get(key)` | Returns the value associated with the key. | value or `null` |
| `has(key)` | Checks whether the key exists in the HashMap. | `true` / `false` |
| `remove(key)` | Removes the node matching the key, handling the special case of removing the head of a bucket. | `true` / `false` |
| `length()` | Total number of entries in the HashMap (across all buckets). | `number` |
| `clear()` | Empties the HashMap entirely. | — |
| `keys()` | Array of all keys. | `Array` |
| `values()` | Array of all values. | `Array` |
| `entries()` | Array of `[key, value]` pairs. | `Array<[key, value]>` |
| `resize()` | Doubles `capacity`, then re-inserts every existing entry (indices recalculated with the new capacity). | — |

## Notable implementation details

- **Dynamic growth**: `set` checks `this.length() >= this.capacity * this.loadFactor` before adding a new element (not on a plain overwrite, thanks to `!this.has(key)`). If the threshold is reached, `resize()` doubles the capacity and re-inserts all entries with recalculated indices.
- **Removal**: two distinct cases are handled — removing the node at the head of a bucket (`this.buckets[index] = current.nextNode`) vs removing a node in the middle/end of the list (`previous.nextNode = current.nextNode`), since in the first case nothing points to the node via `.nextNode`.
- **Bucket iteration**: `forEach` on `this.buckets` automatically skips indices that were never assigned (sparse array), so no `undefined` check is needed in `keys()`, `values()`, `entries()`, or `length()`.

## Usage

```javascript
import { HashMap } from "./hash-map.js";

const hashMap = new HashMap();

hashMap.set("a", 1);
hashMap.set("q", 2); // collides with "a" (same index)

console.log(hashMap.get("a"));      // 1
console.log(hashMap.has("q"));      // true
console.log(hashMap.length());      // 2
console.log(hashMap.entries());     // [["a", 1], ["q", 2]]

hashMap.remove("a");
console.log(hashMap.get("a"));      // null
```
