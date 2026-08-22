const generate = document.getElementById('generate');
const display = document.getElementById('display');
const randomNumber = document.getElementById('randomNumber');
const randomList = document.getElementById('randomList');
const list = [];

generate.addEventListener( 'click' , () => {
    function* genRandomNum () {
        yield list.push( Math.trunc( Math.random() * 101 ) );
    }
    const generator = genRandomNum();
    generator.next();
    randomNumber.textContent = ` الرقم العشوائي: ${list[ list.length - 1 ]}`;
} );

display.addEventListener( 'click' , () => {
    if ( list.length !== 0 ) {
        randomList.textContent = `الأرقام المنتجة: ${ list.join(' - ') }`
        console.log(list);
    } else {
        alert('ولد رقما عشوائيا واحدا على الاقل!')
    }
} );