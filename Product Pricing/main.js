const prices = document.getElementById('price');
const Tax = document.getElementById('percent');
const calc = document.getElementsByTagName('button')[0];
const title = document.getElementsByTagName('h2')[0];
const list = document.getElementsByClassName('productsList')[0];

const display = function( op , fp ) {

    for ( let i = 0 ; i < op.length ; i++ ) {

        let product = document.createElement('div');

        product.classList.add('product');
        product.innerHTML = `<h3>المنتج ${ i + 1 }</h3><p>السعر الاصلي: <span>${ op[i] }</span></p><p>السعر بعد الضريبه: <span>${ fp[i] }</span></p>`;

        list.appendChild(product);

    }

}

calc.addEventListener( 'click' , _ => {

    if ( prices.value && Tax.value ) {

        const originalPrices = prices.value.trim().split(' ').filter( n => {
            return n.trim() !== '' && !isNaN(Number(n));
        });
        const finalPrices = originalPrices.map( n => Number( n ) + ( Number( n )  * ( Tax.value / 100 ) ) );

        display( originalPrices , finalPrices );

    } else {

        alert('تاكد من ادخال السعر وقيمه الضريبه');

    }

});