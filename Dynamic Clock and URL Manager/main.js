const time = document.querySelector('.time');
const start = document.getElementById('start');
const end = document.getElementById('stop');
const link = document.getElementById('link');
const goToLink = document.getElementById('goToLink');
let interval;
let date;

start.addEventListener( 'click' , () => {
    interval = setInterval( () => {
        date = new Date();
        time.innerHTML = `${ date.getHours() >= 10 ? date.getHours() : '0' + date.getHours() } : ${ date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes() } : ${ date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds() }`
    } , 500 );
});

end.addEventListener( 'click' , () => {
    clearInterval(interval)
});

function clearInput(input) {
    if (input && input.trim().length > 0) {
        return input.trim();
    }
    return null;
}

goToLink.addEventListener( 'click' , (e) => {
    e.preventDefault();
    if ( clearInput( link.value ) ) {
        location.replace(link.value);
    }
});