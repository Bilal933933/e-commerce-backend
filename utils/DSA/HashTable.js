export class HashTable {
    constructor( size = 100) {
        this.buckets = Array(size).fill(null).map(() => []);
        this.size = size;
    }

        hash(key) {
        let hash = 0;
        for (let char of key) {
            hash += char.charCodeAt(0);
        }
        return hash % this.size;
    }

    set(key, value) {
        const index = this.hash(key);
        this.buckets[index].push([key, value]);
    }

    get(key) {
        const index = this.hash(key);
        return this.buckets[index].find(([k]) => k === key)[1];
    }

    delete(key) {
        const index = this.hash(key);
        this.buckets[index] = this.buckets[index].filter(([k]) => k !== key);
    }

    print() {
        console.log(this.buckets);
    }
}

const hashTable = new HashTable();
hashTable.set("name", "Bilal");
hashTable.set("age", 30);
hashTable.set("city", "Cairo");
hashTable.set("country", "Egypt");
console.log(hashTable.hash("name"));
console.log(hashTable.hash("age"));
console.log(hashTable.hash("city"));
console.log(hashTable.hash("country"));
console.log(hashTable.get("name")); // Bilal
hashTable.print();
hashTable.delete("name");
hashTable.print();
