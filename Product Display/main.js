const products = [
    { name: "AirPods Pro", price: 249 },
    { name: "Apple Watch", price: 399 },
    { name: "Anker Power Bank", price: 35 },
    { name: "Asus Gaming Laptop", price: 1100 },
    { name: "Backpack", price: 60 },
    { name: "Bluetooth Speaker", price: 85 },
    { name: "Book: JS Guide", price: 15 },
    { name: "Beats Headphones", price: 199 },
    { name: "Camera Canon", price: 650 },
    { name: "Coffee Maker", price: 120 },
    { name: "Chair Ergonomic", price: 180 },
    { name: "Charger Cable", price: 12 },
    { name: "Dell XPS Laptop", price: 1200 },
    { name: "Desk Lamp", price: 25 },
    { name: "Digital Clock", price: 40 },
    { name: "External Hard Drive", price: 90 },
    { name: "Electric Toothbrush", price: 55 },
    { name: "Fitness Tracker", price: 70 },
    { name: "Gaming Mouse", price: 50 },
    { name: "Gaming Chair", price: 220 },
    { name: "HDMI Cable", price: 18 },
    { name: "Headphones Stand", price: 22 },
    { name: "iPad Air", price: 599 },
    { name: "Kindle Paperwhite", price: 140 },
    { name: "Mechanical Keyboard", price: 110 },
    { name: "Monitor 27-inch", price: 300 },
    { name: "Microphone USB", price: 75 },
    { name: "Notebook Leather", price: 20 },
    { name: "Power Bank 20000mAh", price: 45 },
    { name: "Smartphone Galaxy", price: 850 },
    { name: "Smart TV 55-inch", price: 500 },
    { name: "Standing Desk", price: 350 },
    { name: "USB Flash Drive", price: 16 },
    { name: "Wireless Mouse", price: 30 },
    { name: "Webcam HD", price: 65 }
];

const letter = document.getElementById('text');
const price = document.getElementById('number');
const filter = document.getElementsByTagName('button')[0];
const productList = document.getElementsByClassName('productsList')[0];
const productBluePrint = `<h3></h3><p>السعر:<span></span> جنيه</p>`;

const display = function ( p ) {

    let product = document.createElement('div');

    product.classList.add('product');
    product.innerHTML = productBluePrint;
    product.firstElementChild.textContent = p.name;
    product.lastElementChild.firstElementChild.textContent = p.price;
    productList.appendChild(product);

}

products.forEach( p  => { display ( p ) } );

filter.addEventListener( 'click' , _ => {

    if ( letter.value || price.value ) {

        productList.innerHTML = '';

        const result = products.filter( ele => {

        return ( !letter.value || ele.name.toLowerCase().startsWith( letter.value.trim().toLowerCase() ) ) && ( !price.value || ele.price <= price.value );

        } );

        result.length ? result.forEach( p => display( p ) ) : alert('نعتذر. لاتوجد منتجات تستوفي تلك الشروط');

    } else {

        alert('تاكد من استعمال فلتر واحد على الاقل')

    }

});