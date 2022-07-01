export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product=undefined) {
    if (product === null || product === undefined) {
      return;
    };

    let cartItem = this.cartItems.find(item => item.product.id === product.id);
    if (cartItem === undefined) {
      this.cartItems.push({
        product: product,
        count: 1
      })
    }
    else {
      cartItem.count = +cartItem.count + 1;

    };

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
   
    let cartItem = this.cartItems.find(item => item.product.id === productId);
    cartItem.count = +cartItem.count + amount;
    if (cartItem.count === 0) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return  (this.cartItems.length === 0)
  }

  getTotalCount() {
    let summ = 0;
    this.cartItems.map(el => summ += el.count);
    return summ; 
 }

  getTotalPrice() {
    let summ = 0;
    this.cartItems.map(el => summ += (el.product.price*el.count));
    return summ; 
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

