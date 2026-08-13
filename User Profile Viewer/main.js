const user = {
                name: "أحمد محمود علي السيد",
                age: 28,
                job: 'مهندس ومطور برمجيات',
                address: "القاهرة العاصمة الادارية الجديدة"
            }

const userJob = document.getElementById('job');
const approveEdit = document.getElementById('approveEdit');
const tbody = document.querySelector('tbody');

const userTemplate = `
    <td>
        <p class="name"></p>
    </td>
    <td>
        <p class="age"><span></span> سنه</p>
    </td>
    <td>
        <p class="job"></p>
    </td>
    <td>
        <p class="address"></p>
    </td>
`;

function display( user ) {
    const tr = document.createElement('tr');
    tr.classList.add('user');
    tr.innerHTML = userTemplate;
    tr.querySelector('.name').textContent = user.name;
    tr.querySelector('.age span').textContent = user.age;
    tr.querySelector('.job').textContent = user.job;
    tr.querySelector('.address').textContent = user.address;
    tbody.appendChild(tr);
}
display( user );

function clearInput( input ) {
    if ( input && input.trim().length > 0 ) {
        return input.trim();
    }
    return null;
}

approveEdit.addEventListener('click', e => {
    e.preventDefault();
    const newJob = clearInput(userJob.value);
    if (newJob) {
        tbody.querySelector('.job').textContent = newJob;
        user.job = newJob;
        userJob.value = '';
    } else {
        alert('ادخل وظيفة صالحة')
    }
});