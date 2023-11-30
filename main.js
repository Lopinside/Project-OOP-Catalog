class Item {
  #id;
  #name;
  #price;

  constructor(id, name, price) {
    this.#id = id;
    this.#name = name;
    this.#price = price;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    if (Item.validateName(value)) {
      this.#name = value;
    } else {
      console.error('Name must be a string');
    }
  }

  get price() {
    return this.#price;
  }

  set price(value) {
    if (Item.validatePrice(value)) {
      this.#price = value;
    } else {
      console.error('Price must be a positive number');
    }
  }

  static validateName(value) {
    return typeof value === 'string';
  }

  static validatePrice(value) {
    return typeof value === 'number' && value > 0;
  }
}

class Product extends Item {
  constructor(id, name, price) {
    super(id, name, price);
  }

  displayDetails() {
    console.log(`Product ID: ${this.id}, Product Name: ${this.name}, Product Price: $${this.price.toFixed(2)}`);
  }
}

class ShoppingCart {
  static _items = [];

  static addItem(product) {
    this._items.push(product);
  }

  static getItems() {
    return this._items;
  }

  static getTotal() {
    return this._items.reduce((total, item) => total + item.price, 0);
  }

  static clearCart() {
    this._items.length = 0;
    this.Carttotal();
  }
  static toggleDetailPopup(popupId) {
    const popup = document.getElementById(popup.Id);
    popup.style.display = popup.style.display === 'none' || popup.style.display === '' ? 'flex' : 'none';
  }
  static Carttotal() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    cartItemsElement.innerHTML = '';

    this.getItems().forEach((item) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
      cartItemsElement.appendChild(listItem);
    });

    cartTotalElement.textContent = this.getTotal().toFixed(2);
  }
  
}

const products = [
  new Product('1', 'Product 1', 5.000),
  new Product('2', 'Product 2', 9.000),
  new Product('3', 'Product 3', 8.000),
  new Product('4', 'Product 4', 9.000),
  new Product('5', 'Product 5', 9.000),
];

document.querySelectorAll('.add-to-cart, .detail').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.id;
    const selectedProduct = products.find(product => product.id === productId);

    if (selectedProduct) {
      ShoppingCart.addItem(selectedProduct);
      ShoppingCart.Carttotal();
    }

  });
});


document.getElementById('clear-cart').addEventListener('click', () => {
  ShoppingCart.clearCart();
});
