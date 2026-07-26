let form = document.getElementsByTagName('form')[0];

let name = document.getElementById('name');
let age = document.getElementById('age');
let hoppy = document.getElementById('hoppy');

let button = document.getElementsByTagName('button')[0];

button.addEventListener( 'click' , (e) => {

    e.preventDefault();

    if ( ! ( name.value || age.value || hoppy.value ) ) {
        return alert('من فضلك املا جميع الحقول');
    }

    let message = document.createElement('h1');

    message.style.cssText = 'background-color: lightblue; font-size: 18px; padding: 1vw; border-radius: 15px';

    message.textContent = `اهلا يا ${name.value}! عمرك ${age.value} سنه , وهوايتك المفضله هي ${hoppy.value}`;

    form.appendChild(message);

} );