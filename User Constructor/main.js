class user {
    constructor( name , age , email ) {
        this.name = name;
        this.age = age;
        this.email = email;
    }
    message() {
        return `مرحبا ${this.name}! عمرك ${this.age} عاما وبريدك الالكتروني هو ${this.email}.`
    }
}

const users = [
    new user("أسامة", 25, "osama@example.com"),
    new user("سما", 30, "sama@example.com")
]
const input = document.getElementById('name');
const container = document.querySelector('.container');
const changeName = document.getElementById('approveEdit');
let idx = 0;
let card;

function clearInput( input ) {
    if (!input || input.trim().length === 0) {
        return null;
    }
    return input;
}

function displayUsers( user ) {
    user.forEach(u => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <p>${u.message()}</p>
            <a class="edit" href="#name">
                تغيير الاسم
                <i class="fa-solid fa-pen-to-square"></i>
            </a>
        `;
        container.appendChild(card);
    });
}
displayUsers(users);


container.addEventListener( 'click', e => {
    const button = e.target.closest('.edit');
    if (!button) return;
    const userMessage = e.target.closest('.card').querySelector('p').textContent;
    idx = users.findIndex( u => u.message() === userMessage );
    card = e.target.closest('.card')
});

changeName.addEventListener( 'click' , e => {
    const change = e.target.closest('#approveEdit')
    if (!change) return;
    
    if ( !card ) {
        alert('برجاء اختيار مستخدم لتعديله أولاً');
        return;
    }
    
    const userInput = clearInput( input.value );
    if ( userInput ) {
        card.remove();
        users[idx].name = clearInput( userInput );
        input.value = '';
        displayUsers( [ users[idx] ] );
    } else {
        alert('برجاء إدخال اسم صالح');
    }
});