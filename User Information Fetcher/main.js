const inputName = document.getElementById('name');
const search = document.getElementById('search');
const tbody = document.querySelector('tbody');
let result;

const userTemplate = `
    <td>
        <p class="name"></p>
    </td>
    <td>
        <p class="email"></p>
    </td>
    <td>
        <p class="address"></p>
    </td>
`;

function display( users ) {
    users.map( user => {
        const tr = document.createElement('tr');
        tr.classList.add('user');
        tr.innerHTML = userTemplate;
        tr.querySelector('.name').textContent = user.name;
        tr.querySelector('.email').textContent = user.email;
        tr.querySelector('.address').textContent = `${user.address.city} - ${user.address.street} - ${user.address.suite}`;
        tbody.appendChild(tr);
    });
}

async function userListFetch( ) {
    let response;
    try {
        response = await fetch("https://jsonplaceholder.typicode.com/users");
        if ( !response.ok ) {
            throw( new Error(`status ${response.status}`) );
        }
    }
    catch ( err ) {
        throw( new Error(`there is a problem with the api link: ${err.message}`) );
    }
    let data;
    try {
        data = await response.json();
    }
    catch ( err ) {
        throw( new Error(`there is a problem with parsing data: ${err.message}`) );
    }
    result = data;
    display( data );
}

userListFetch()

function clearInput( input ) {
    if ( input && input.trim().length > 0 ) {
        return input.trim();
    }
    return null;
}

search.addEventListener( 'click' , _ => {
    let input = clearInput( inputName.value );
    let filterd;
    if ( input ) {
        input = input.toLowerCase();
        filterd = result.filter( user => {
            return user.name.toLowerCase().startsWith( input );
        } );
        if ( filterd.length >= 1 ) {
            tbody.innerHTML = '';
            display( filterd )
        } else {
            alert('لا يوجد مستخدم يحمل هذا الاسم')
        }
    } else {
        alert('من فضلك ادخل اسما');
    }
} );