export class Graph {
    constructor() {
        this.adjList = new Map();
    }

    addVertex(vertex) {
        if (!this.adjList[vertex]) this.adjList[vertex] = [];
    }

    addEdge(vertex1, vertex2) {
        this.adjList[vertex1].push(vertex2);
        this.adjList[vertex2].push(vertex1);
    }

    print() {
        console.log(this.adjList);
    }

    deleteVertex(vertex) {
        this.adjList.delete(vertex);
    }

    deleteEdge(vertex1, vertex2) {
        this.adjList[vertex1] = this.adjList[vertex1].filter((v) => v !== vertex2);
        this.adjList[vertex2] = this.adjList[vertex2].filter((v) => v !== vertex1);
    }
}

const graph = new Graph();

graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.print(); // { A: [ 'B', 'C' ], B: ['A'], C:['A'] }
graph.deleteEdge("A", "B");
graph.print(); // { A: [ 'C' ], B: [], C:['A'] }
graph.deleteVertex("C");
graph.print(); // { A: [], B: [] }
