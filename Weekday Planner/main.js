let input = document.getElementsByTagName('input')[0];
let container = document.getElementsByClassName('container')[0];
let button = document.getElementsByTagName('button')[0];

button.addEventListener('click', e => {

    e.preventDefault();

    if ( document.querySelectorAll('h1').length > 1 ) {
        document.querySelectorAll('h1')[1].remove();
    }

    let day = input.value.trim();

    if (day.length !== 0) {

        let message = document.createElement('h1');
        message.style.cssText = ' width: 80%; background-color: lightblue; font-size: 24px; padding: 1vw; border-radius: 15px';

        switch (day) {

            case "الجمعه":

                message.textContent = 'انه يوم الجمعه ! جمعه مباركه';
                break;

            case 'السبت':
            case 'الاحد':

                message.textContent = 'أجواء عطلة نهاية الأسبوع! ابدأ أسبوعك بطاقة متجددة.';
                break;

            case 'الاثنين':
            case 'الثلاثاء':
            case 'الاربعاء':
            case 'الخميس':

                message.textContent = `انه يوم ${day} ! يوم سعيد`;
                break;

            default:
                message.textContent = `"${day}" ليس يوم من ايام الاسبوع ! من فضلك ادخل يوم صحيح`;

        }

        container.appendChild(message);

    }

    input.value = '';

});