class Products {
    constructor(productDoc) {
        this.name = productDoc.name;
        this.price = productDoc.price;
        this.description = productDoc.description;
        this.image = productDoc.image;
        this.category = productDoc.category;
        this.quantity = productDoc.quantity;
        this._id = productDoc._id;
        this.sulg = productDoc.slug;

    }

    discountedPrice(discount) {
        return this.price - (this.price * discount / 100);
    }

    get product() {
        return {
            name: this.name,
            price: this.price,
            description: this.description,
            image: this.image,
            category: this.category,
            quantity: this.quantity,
            _id: this._id,
            slug: this.sulg
        }
    }

    
}