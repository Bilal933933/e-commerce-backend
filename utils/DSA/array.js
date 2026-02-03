export class Array {
    constructor() {
        this.array = [];
    }
    push (value) {
        this.array.push(value);
    }
    pop () {
        this.array.pop();
    }
    shift(){
        this.array.shift();
    }
    unshift(){
        this.array.unshift();
    }
    splice(value,index){
        this.array.splice(value,index);
    }
    forEach(callback){
        this.array.forEach(callback);
    }
    map(callback){
        this.array.map(callback);
    }
    filter(callback){
        this.array.filter(callback);
    }
    reduce(callback){
        this.array.reduce(callback);
    }
    
}

const arrayNumper = new Array();
arrayNumper.push(1);
arrayNumper.push(2);
arrayNumper.push(3);
arrayNumper.push(4);
arrayNumper.push(5);
console.log(arrayNumper);
arrayNumper.pop();
console.log(arrayNumper);
arrayNumper.shift();
console.log(arrayNumper);
arrayNumper.unshift(1);
console.log(arrayNumper);

arrayNumper.splice(2, 1);
console.log(arrayNumper);

arrayNumper.forEach((item) => {
    console.log(item);
});

arrayNumper.map((item) => {
    console.log(item);
});

const filteredArrayNumper = arrayNumper.filter((item) => {
    return item > 2;
});
console.log(filteredArrayNumper);

const sum = arrayNumper.reduce((acc, item) => {
    return acc + item;
});
console.log(sum);

export default arrayNumper;   

const products = [
  { name: "TV", price: 3000 },
  { name: "Tablet", price: 1200 },
  { name: "Headphones", price: 400 },
  { name: "Camera", price: 2500 }
];

const sortedProducts = arrayNumper.sort((a, b) => a.price - b.price);
console.log(sortedProducts);