const colors = document.querySelector('.colors');
const reset = document.getElementById('reset');

window.addEventListener( 'load' , () => {
    document.body.style.backgroundColor = localStorage.getItem('color');
});

colors.addEventListener( 'click' , (e) => {
    if ( e.target.tagName === 'BUTTON' ) {
        document.body.style.backgroundColor = e.target.dataset.color;
        localStorage.setItem( 'color' , e.target.dataset.color );
    }
});

reset.addEventListener( 'click' , () => {
    document.body.style.backgroundColor = "white";
    localStorage.clear();
});