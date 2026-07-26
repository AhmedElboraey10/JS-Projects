let num1 = document.getElementById('num-1');
let num2 = document.getElementById('num-2');
let h1 = document.getElementsByTagName('h1')[0];
let buttons = document.querySelectorAll('.operations');

buttons.forEach(element => {
    element.addEventListener( 'click' , e => {
        e.preventDefault();
        if ( num1.value === '' || num2.value === '' ) {
            return alert('من فضلك املا جميع الحقول');
        }
        let result;
        switch ( e.target.value ) {
            case '+' :
                result = Number( num1.value ) + Number( num2.value );
                break;
            case '-' :
                result = Number( num1.value ) - Number( num2.value );
                break;
            case '*' :
                result = Number( num1.value ) * Number( num2.value );
                break;
            case '/' :
                result = Number( num1.value ) / Number( num2.value );
                break;
        }
        h1.textContent = `${num1.value} ${e.target.value} ${num2.value} = ${result}`;
        h1.style.display = 'block';
    })
});