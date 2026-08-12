const users = [
    {
        name: "أحمد محمود علي السيد",
        age: 28,
        email: "ahmed.mahmoud@example.com"
    },
    {
        name: "سارة علي محمد عثمان",
        age: 24,
        email: "sara.ali@example.com"
    },
    {
        name: "محمد إبراهيم مصطفى كمال",
        age: 32,
        email: "mohamed.ibrahim@example.com"
    },
    {
        name: "نور الدين حسن محمود",
        age: 19,
        email: "nour.eldin@example.com"
    },
    {
        name: "مريم يوسف أحمد خليل",
        age: 27,
        email: "maryam.youssef@example.com"
    },
    {
        name: "عمر خالد سعيد غانم",
        age: 35,
        email: "omar.khaled@example.com"
    },
    {
        name: "فاطمة الزهراء محمود أحمد",
        age: 22,
        email: "fatima.elzahraa@example.com"
    },
    {
        name: "كريم حسن مصطفى منصور",
        age: 30,
        email: "kareem.hassan@example.com"
    },
    {
        name: "ياسمين طارق سعيد زيدان",
        age: 26,
        email: "yasmin.tarek@example.com"
    },
    {
        name: "خليل مصطفى إبراهيم النجار",
        age: 40,
        email: "khalil.mostafa@example.com"
    },
    {
        name: "آية عبد الله حسن الشاذلي",
        age: 23,
        email: "aya.abdallah@example.com"
    },
    {
        name: "يوسف صلاح حامد جلال",
        age: 29,
        email: "youssef.salah@example.com"
    },
    {
        name: "رانيا سامي محمد دسوقي",
        age: 31,
        email: "rania.samy@example.com"
    },
    {
        name: "حمزة مصطفى محمد الشريف",
        age: 25,
        email: "hamza.elsherif@example.com"
    },
    {
        name: "خديجة حسين علي محمود",
        age: 33,
        email: "khadija.houssein@example.com"
    }
];

const userName = document.getElementById('name');
const userAge = document.getElementById('age');
const userEmail = document.getElementById('email');
const addButton = document.getElementById('add');
const approveEdit = document.getElementById('approveEdit');
const userListTable = document.getElementById('userList');
const tbody = userListTable.querySelector('tbody');
let userToEdit;

const userTemplate = `
    <td>
        <p class="name"></p>
    </td>
    <td>
        <p class="age"><span></span> سنه</p>
    </td>
    <td>
        <p class="email"></p>
    </td>
    <td>
        <div class="Buttons">
            <button class="delete">حذف</button>
            <a href="#title" class="edit">تعديل</a>
        </div>
    </td>
`;

function display(usersArray) {
    usersArray.forEach(item => {
        const tr = document.createElement('tr');
        tr.classList.add('user');
        tr.innerHTML = userTemplate;
        tr.querySelector('.name').textContent = item.name;
        tr.querySelector('.age span').textContent = item.age;
        tr.querySelector('.email').textContent = item.email;
        tbody.appendChild(tr);
    });
}
display(users);

function clearInput(input) {
    if (input && input.trim().length > 0) {
        return input.trim();
    }
    return null;
}

function resetInput() {
    userName.value = '';
    userAge.value = '';
    userEmail.value = '';
}

addButton.addEventListener('click', () => {
    const newUser = {
        name: clearInput(userName.value),
        age: clearInput(userAge.value),
        email: clearInput(userEmail.value)
    };
    if (!newUser.name || !newUser.age || !newUser.email) {
        alert("برجاء إدخال جميع بيانات المستخدم!");
        return;
    }
    const idx = users.findIndex(ele => {
        return (
            ele.name === newUser.name &&
            ele.age === Number(newUser.age) &&
            ele.email === newUser.email
        );
    });
    if (idx === -1) {
        users.push(newUser);
        display([newUser]);
        resetInput();
    } else {
        alert('هذا المستخدم موجود بالفعل');
    }
});

tbody.addEventListener('click', e => {
    const tr = e.target.closest('.user');
    if (!tr) return;
    const name = tr.querySelector('.name').textContent;
    const age = tr.querySelector('.age span').textContent;
    const email = tr.querySelector('.email').textContent;
    if (e.target.classList.contains('delete')) {
        const idx = users.findIndex(ele => {
            return (
                ele.name === name &&
                ele.age === Number(age) &&
                ele.email === email
            );
        });
        if (idx !== -1) {
            users.splice(idx, 1);
        }
        tr.remove();
    }
    if (e.target.classList.contains('edit')) {
        e.preventDefault();
        addButton.style.display = 'none';
        approveEdit.style.display = 'block';
        userToEdit = tr;
        userName.value = name;
        userAge.value = age;
        userEmail.value = email;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

function editElement(element) {
    if (!element) return;
    const oldName = element.querySelector('.name').textContent;
    const oldAge = element.querySelector('.age span').textContent;
    const oldEmail = element.querySelector('.email').textContent;
    const idxBefore = users.findIndex(user =>
        user.name === oldName &&
        user.age === Number(oldAge) &&
        user.email === oldEmail
    );
    const newName = clearInput(userName.value) ?? oldName;
    const newAge = clearInput(userAge.value) ?? oldAge;
    const newEmail = clearInput(userEmail.value) ?? oldEmail;
    const duplicate = users.findIndex((user, index) =>
        index !== idxBefore &&
        user.name === newName &&
        user.age === Number(newAge) &&
        user.email === newEmail
    );
    if (duplicate !== -1) {
        alert('هذا المستخدم موجود بالفعل');
        return;
    }
    element.querySelector('.name').textContent = newName;
    element.querySelector('.age span').textContent = newAge;
    element.querySelector('.email').textContent = newEmail;
    if (idxBefore !== -1) {
        users[idxBefore].name = newName;
        users[idxBefore].age = Number(newAge);
        users[idxBefore].email = newEmail;
    }
    addButton.style.display = 'block';
    approveEdit.style.display = 'none';
    resetInput();
}

approveEdit.addEventListener('click', () => {
    editElement(userToEdit);
});