const userName = document.getElementById('username');
const userPassword = document.getElementById('password');
const usernameMessage = document.getElementById('usernameMessage');
const passwordMessage = document.getElementById('passwordMessage');
const form = document.querySelector('form');

function clearInput( input , type ) {
    if ( !input || input.trim().length === 0 ) {
        return null;
    }
    input = input.trim();
    if (type === 'userName') {
        const usernameRegex = /^[A-Za-z][A-Za-z0-9]{4,14}$/;
        if ( !usernameRegex.test( input ) ) {
            return null;
        }
    }
    if ( type === 'password' ) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,20}$/;
        if ( !passwordRegex.test( input ) ) {
            return null;
        }
    }
    return input;
}

form.addEventListener( 'submit' , e => {
    usernameMessage.textContent = '';
    passwordMessage.textContent = '';
    const name = clearInput( userName.value , 'userName' );
    const password = clearInput( userPassword.value , 'password' );
    if ( !name ) {
        e.preventDefault();
        usernameMessage.textContent = 'اسم المستخدم يجب أن يبدأ بحرف ويكون من 5 إلى 15 حرفًا';
        return;
    }
    if ( !password ) {
        e.preventDefault();
        passwordMessage.textContent = 'كلمة المرور يجب أن تكون من 8 إلى 20 حرفًا وتحتوي على حرف كبير ورقم';
        return;
    }
});