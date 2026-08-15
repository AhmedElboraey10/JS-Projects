const userName = document.getElementById('name');
const userEmail = document.getElementById('email');
const userPhone = document.getElementById('phone');
const addButton = document.getElementById('add');
const tbody = document.querySelector('tbody');

const userTemplate = `
    <td>
        <p class="name"></p>
    </td>
    <td>
        <p class="email"></p>
    </td>
    <td>
        <p class="phone"></p>
    </td>
`;

function clearInput(input, type) {
    if (!input || input.trim().length === 0) {
        return null;
    }
    input = input.trim();
    if (type === 'name') {
        const nameRegex = /^[A-Za-z\u0600-\u06FF ]{3,10}$/;
        if (!nameRegex.test(input)) {
            return null;
        }
    }
    if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input)) {
            return null;
        }
    }
    if (type === 'phone') {
        const phoneRegex = /^\d{11}$/;
        if (!phoneRegex.test(input)) {
            return null;
        }
    }
    return input;
}

addButton.addEventListener('click', e => {
    e.preventDefault();
    const name = clearInput( userName.value, 'name' );
    const email = clearInput( userEmail.value, 'email' );
    const phone = clearInput( userPhone.value, 'phone' );
    if (!name) {
        alert('الاسم يجب أن يكون من 3 إلى 10 حروف وبدون رموز');
        return;
    }
    if (!email) {
        alert('من فضلك أدخل بريد إلكتروني صحيح');
        return;
    }
    if (!phone) {
        alert('رقم الهاتف يجب أن يكون 11 رقم بالضبط');
        return;
    }
    display( name , email , phone );
});

function display( name , email , phone ) {
    const tr = document.createElement('tr');
    tr.classList.add('user');
    tr.innerHTML = userTemplate;
    tr.querySelector('.name').textContent = name;
    tr.querySelector('.email').textContent = email;
    tr.querySelector('.phone').textContent = phone;
    tbody.appendChild(tr);
}