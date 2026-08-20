const name = document.getElementById('name');
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const time = document.querySelector('.time');
const start = document.getElementById('start');
const eventName = document.getElementById('eventName');
let interval;

function clearInput(input) {
    if (input && input.trim().length > 0) {
        return input.trim();
    }
    alert('ادخل اسم الحدث')
    return null;
}

start.addEventListener( 'click' , () => {
    if ( interval ) clearInterval( interval );
    const validName = clearInput( name.value );
    if ( !validName ) return;
    eventName.textContent = validName;
    if ( Number( days.value ) >= 0  && Number( hours.value ) >= 0  && Number( minutes.value ) >= 0  && Number( seconds.value ) >= 0 ) {
        let date = new Date();
        date.setDate( date.getDate() + Number( days.value ) );
        date.setHours( date.getHours() + Number( hours.value ) );
        date.setMinutes( date.getMinutes() + Number( minutes.value ) );
        date.setSeconds( date.getSeconds() + Number( seconds.value ) );
        interval = setInterval( () => {
            let now = new Date();
            let diff = date - now;
            let newDays = Math.floor( diff / ( 1000 * 60 * 60 * 24 ) );
            let newHours = Math.floor( ( diff % ( 1000 * 60 * 60 * 24 ) ) / ( 1000 * 60 * 60 ) );
            let newMinutes = Math.floor( ( diff % ( 1000 * 60 * 60 ) ) / ( 1000 * 60 ) );
            let newSeconds = Math.floor( ( diff % ( 1000 * 60 ) ) / 1000 );
            if ( diff > 0 ) {
                time.innerHTML = `${ newDays >= 10 ? newDays : '0' + newDays } : ${ newHours >= 10 ? newHours : '0' +newHours } : ${ newMinutes >= 10 ? newMinutes : '0' + newMinutes } : ${ newSeconds >= 10 ? newSeconds : '0' + newSeconds }`;
            } else {
                clearInterval( interval );
                time.innerHTML = '';
                eventName.textContent = 'لقد انتهي الحدث';
            }
        } , 500 );
    }
});