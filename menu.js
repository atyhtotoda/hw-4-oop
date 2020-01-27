/**
 * Заказ, состоящий из позиций меню
 * @param items
 * @constructor
 */
function Order(...items) {
    this.payment = false;
    this.items = items;
}

/**
 * Параметры каждой позиции меню
 * @param name
 * @param price
 * @param calories
 * @constructor
 */
function Item(name, price, calories) {
    this.name = name;
    this.price = price;
    this.calories = calories;
}

Order.prototype = Object.create(Item.prototype);

/**
 * Узнать название позици
 */
Item.prototype.nameOfItem = function () {
    console.log('Имя позиции ' + this.name);
};

/**
 * Узнать цену
 */
Item.prototype.calculatePrice = function () {
    console.log('Цена позиции ' + this.price);
};

/**
 * Узнать калорийность
 */
Item.prototype.calculateCalories = function () {
    console.log('Калорийность позиции ' + this.calories);
};

/**
 * Класс, объекты которого описывают параметры гамбургера.
 *
 * @constructor
 * @param size
 * @param stuffing
 */
function Hamburger(size, stuffing) {
    Item.call(this, Hamburger.name);
    this.price = size.price + stuffing.price;
    this.calories = size.calories + stuffing.calories;
    this.size = size.name;
    this.stuffing = stuffing.name;
}

Hamburger.prototype = Object.create(Item.prototype);


/**
 * Получение размера гамбургера
 */
Hamburger.prototype.getSize = function () {
    console.log('Размер гамбургера ' + this.size);
};

/**
 * Получение вида начинки гамбургера
 */
Hamburger.prototype.getStuffing = function () {
    console.log('Начинка гамбургера ' + this.stuffing);
};


/**
 * Класс, объекты которого описывают параметры салата
 * @param type
 * @constructor
 */
function Salad(type) {
    Item.call(this,
        type.name,
        type.price,
        type.calories);
}

Salad.prototype = Object.create(Item.prototype);


/**
 * Класс, объекты которого описывают параметры напитка.
 * @param type
 * @constructor
 */
function Drink(type) {
    Item.call(this,
        type.name,
        type.price,
        type.calories);
}

Drink.prototype = Object.create(Item.prototype);


/**
 * Получить позиции заказа
 */
Order.prototype.itemsInOrder = function () {
    allItems = [];
    for (var value1 of this.items) {
        var i = 0;
        for (var value2 of this.items) {
            if (value1.name === value2.name) i++;
        }

        allItems.push(value1.name + ' - ' + i);
    }
    var allItems = Array.from(new Set(allItems));
    console.log(allItems.join(' '));
};

/**
 * Узнать цену заказа
 */
Order.prototype.totalPrice = function () {
    var sum = this.items.reduce(function (acc, item) {
        return acc + item.price;
    }, 0);
    return console.log(sum);
};

/**
 * Узнать калорийность заказа
 * @returns {*}
 */
Order.prototype.totalCalories = function () {
    var sum = this.items.reduce(function (acc, item) {
        return acc + item.calories;
    }, 0);

    return console.log(sum);
};

/**
 * Добавить позиции в заказ
 * @param newItems
 * @returns {string}
 */
Order.prototype.addItems = function (...newItems) {
    if (!this.payment) {
        this.items = this.items.concat(newItems);
    } else {
        console.log('This order has already been paid!');
    }
};
/**
 * Удалить позиции
 * @returns {string}
 * @param delItems
 */
Order.prototype.deleteItems = function (...delItems) {
    if (!this.payment) {
        delItems.forEach(delItems => {
            this.items.splice(this.items.findIndex(item => item.name === delItems.name), 1);
        });
    } else {
        console.log('Order has already been paid!');
    }
};

/**
 * Оплата заказа
 */
Order.prototype.payForOrder = function () {
    this.payment = true;
    console.log('Order paid successfully!');
};

/**
 *  Виды гамбургеров
 */
Hamburger.SIZE_SMALL = {
    name: "Small",
    price: 50,
    calories: 20
};
Hamburger.SIZE_LARGE = {
    name: "Big",
    price: 100,
    calories: 40
};
Hamburger.STUFFING_CHEESE = {
    name: "Cheese",
    price: 10,
    calories: 20
};
Hamburger.STUFFING_SALAD = {
    name: "Salad",
    price: 20,
    calories: 5
};
Hamburger.STUFFING_POTATO = {
    name: "Potato",
    price: 15,
    calories: 10
};

/**
 * меню салата
 * @type {{price: number, name: string, calories: number}}
 */
Salad.CESAR_SALAD = {
    name: "Cesar",
    price: 100,
    calories: 20
};
Salad.OLIVIER_SALAD = {
    name: "Olivier",
    price: 50,
    calories: 80
};
/**
 * меню напитков
 * @type {{price: number, name: string, calories: number}}
 */
Drink.COCA_COLA = {
    name: "Coca-cola",
    price: 50,
    calories: 40
};
Drink.COFFEE = {
    name: "Coffee",
    price: 80,
    calories: 20
};


var hamburger1 = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_CHEESE);
hamburger1.getStuffing();
hamburger1.getSize();
var salad = new Salad(Salad.CESAR_SALAD);
var drink1 = new Drink(Drink.COFFEE);
var order = new Order(hamburger1, salad, salad, drink1);
salad.nameOfItem();
//выводим данные по заказу
order.itemsInOrder();
order.totalPrice();
order.totalCalories();

var hamburger2 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_POTATO);
var drink2 = new Drink(Drink.COCA_COLA);

order.addItems(hamburger2, drink2);
order.itemsInOrder();
order.deleteItems(hamburger1, hamburger2);
order.itemsInOrder();

order.payForOrder();
var hamburger3 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_POTATO);
order.addItems(hamburger3);
