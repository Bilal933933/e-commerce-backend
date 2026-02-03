class NodeTree {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // إضافة Node إلى BST
    insert(value) {
        const newNode = new NodeTree(value);

        if (!this.root) {
            this.root = newNode;
            return;
        }

        const insertNode = (node) => {
            if (value < node.value) {
                if (!node.left) node.left = newNode;
                else insertNode(node.left);
            } else {
                if (!node.right) node.right = newNode;
                else insertNode(node.right);
            }
        };

        insertNode(this.root);
    }

    // البحث عن Node
    findNode(value, node = this.root) {
        if (!node) return null;
        if (node.value === value) return node;
        return this.findNode(value, node.left) || this.findNode(value, node.right);
    }

    // In-Order Traversal
    inorder(node = this.root) {
        if (!node) return;
        this.inorder(node.left);
        console.log(node.value);
        this.inorder(node.right);
    }

    // Pre-Order Traversal
    preorder(node = this.root) {
        if (!node) return;
        console.log(node.value);
        this.preorder(node.left);
        this.preorder(node.right);
    }

    // Post-Order Traversal
    postorder(node = this.root) {
        if (!node) return;
        this.postorder(node.left);
        this.postorder(node.right);
        console.log(node.value);
    }

    // Depth لأي عقدة
    depth(value) {
        const findDepth = (node, value, currentDepth) => {
            if (!node) return -1;
            if (node.value === value) return currentDepth;

            const leftDepth = findDepth(node.left, value, currentDepth + 1);
            if (leftDepth !== -1) return leftDepth;

            return findDepth(node.right, value, currentDepth + 1);
        };

        return findDepth(this.root, value, 0);
    }

    // Height من أي عقدة
    height(node = this.root) {
        if (!node) return -1;
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    // BFS - Breadth First Search (بحث بالعرض)
    BFS() {
        const result = [];
        const queue = [];

        if (!this.root) return result;

        queue.push(this.root);

        while (queue.length > 0) {
            const current = queue.shift();
            result.push(current.value);

            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }

        return result;
    }

    // DFS - Depth First Search (بحث بالعمق)
    DFS() {
        const result = [];

        const traverse = (node) => {
            if (!node) return;
            result.push(node.value); // يمكن تعديل الترتيب: Pre, In, Post
            traverse(node.left);
            traverse(node.right);
        };

        traverse(this.root);
        return result;
    }
}


const bst = new BinarySearchTree();

// إدخال عناصر
bst.insert(43);
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(50);
bst.insert(45);
bst.insert(60);

// Traversals
console.log("In-Order:");
bst.inorder();

console.log("\nPre-Order:");
bst.preorder();

console.log("\nPost-Order:");
bst.postorder();

// Depth و Height
console.log("\nDepth of 15:", bst.depth(15));
console.log("Height of tree:", bst.height());

// BFS و DFS
console.log("\nBFS:", bst.BFS());
console.log("DFS:", bst.DFS());
