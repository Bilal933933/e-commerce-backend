class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor () {
        this.head = null;
        this.size = 0;
    }

    add (value) {
        const node = new Node(value);
        if(this.head === null) {
            this.head = node;
        } else {
            let current = this.head;
            while(current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
    }

    print() {
        let current = this.head;
        const values = [];
        while(current) {
            values.push(current.value);
            current = current.next;
        }
        console.log(values.join(' -> '));
        return values;
    }

    isEmpty () {
        return this.size === 0;
    }
}

const list = LinkedList();

list.add(44)
list.add(44)
list.add(44)
list.add(44)
list.print()