
class UserDTO {
  constructor(userDoc) {
    this.id = userDoc._id;
    this.name = userDoc.name;
    this.email = userDoc.email;
    this.role = userDoc.role;
    this.cart = userDoc.cart || [];
    this.orders = userDoc.orders || [];
    this.wishlist = userDoc.wishlist || [];
    this.viewed = userDoc.viewed || [];
    this.isDeleted = userDoc.isDeleted;
    this.createdAt = userDoc.createdAt;
    this.updatedAt = userDoc.updatedAt;
  }

  addToCart(productId, quantity = 1) {
    const existing = this.cart.find(item => item.productId.toString() === productId.toString());
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({ productId, quantity });
    }
  }

  addToWishlist(productId) {
    const alreadyInWishlist = this.wishlist.some(
      item => item.productId.toString() === productId.toString()
    );
    if (!alreadyInWishlist) {
    if (!this.wishlist.some(item => item.productId.toString() === productId.toString())) {
      this.wishlist.push({ productId });
    }    
    }
  }

}

export default UserDTO;