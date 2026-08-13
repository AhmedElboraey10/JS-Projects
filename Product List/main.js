const products = [
    {
        name: "هاتف ذكي",
        price: 1500,
        description: "هاتف ذكي بشاشة كبيرة وكاميرا عالية الجودة وبطارية تدوم لفترة طويلة."
    },
    {
        name: "حاسوب محمول",
        price: 3500,
        description: "حاسوب محمول خفيف وسريع مناسب للعمل والدراسة والتصفح اليومي."
    },
    {
        name: "سماعات لاسلكية",
        price: 250,
        description: "سماعات لاسلكية بصوت نقي وعزل جيد للضوضاء مع بطارية ممتازة."
    },
    {
        name: "ساعة ذكية",
        price: 600,
        description: "ساعة ذكية لمتابعة النشاط اليومي ومعدل ضربات القلب والإشعارات."
    },
    {
        name: "شاشة كمبيوتر",
        price: 800,
        description: "شاشة كمبيوتر واضحة بحجم مناسب لمشاهدة مريحة والعمل لفترات طويلة."
    },
    {
        name: "لوحة مفاتيح ميكانيكية",
        price: 300,
        description: "لوحة مفاتيح ميكانيكية مريحة للكتابة والألعاب مع إضاءة خلفية."
    },
    {
        name: "فأرة لاسلكية",
        price: 120,
        description: "فأرة لاسلكية سهلة الاستخدام بتصميم مريح ودقة جيدة."
    },
    {
        name: "شاحن سريع",
        price: 90,
        description: "شاحن سريع وآمن يدعم معظم الهواتف والأجهزة الذكية."
    },
    {
        name: "بنك طاقة",
        price: 150,
        description: "بنك طاقة بسعة كبيرة لشحن الهاتف أكثر من مرة أثناء التنقل."
    },
    {
        name: "كاميرا رقمية",
        price: 2200,
        description: "كاميرا رقمية بدقة عالية مناسبة للتصوير اليومي والسفر."
    },
    {
        name: "مكبر صوت بلوتوث",
        price: 200,
        description: "مكبر صوت بلوتوث محمول بصوت قوي وتصميم مقاوم للماء."
    },
    {
        name: "قرص تخزين خارجي",
        price: 350,
        description: "قرص تخزين خارجي بسعة كبيرة لنقل الملفات والنسخ الاحتياطي."
    },
    {
        name: "راوتر واي فاي",
        price: 280,
        description: "راوتر واي فاي سريع يوفر اتصال إنترنت مستقر لجميع الأجهزة."
    },
    {
        name: "حقيبة لابتوب",
        price: 180,
        description: "حقيبة لابتوب عملية وخفيفة توفر حماية جيدة للجهاز أثناء التنقل."
    },
    {
        name: "حامل هاتف للسيارة",
        price: 70,
        description: "حامل هاتف للسيارة ثابت وسهل التركيب لاستخدام الهاتف أثناء القيادة بأمان."
    }
];

const productName = document.getElementById('name');
const productPrice = document.getElementById('price');
const productDescription = document.getElementById('description');
const addButton = document.getElementById('add');
const approveEdit = document.getElementById('approveEdit');
const productList = document.getElementById('productList');
let elementToEdit;

const productTemplate = `
    <div class="productData">
        <p class="name"></p>
        <p class="price">السعر: <span></span> جنيه</p>
        <p class="description"></p>
    </div>

    <div class="Buttons">
        <button class="delete">حذف</button>
        <button>
            <a href="#title" class="edit">تعديل</a>
        </button>
    </div>
`;

function display(products) {
    products.forEach(item => {
        const product = document.createElement('div');
        product.classList.add('product');
        product.innerHTML = productTemplate;
        product.querySelector('.name').textContent = item.name;
        product.querySelector('.price span').textContent = item.price;
        product.querySelector('.description').textContent = item.description;
        productList.appendChild(product);
    });
}

display(products);

function clearInput(input) {
    if (input.trim().length > 0) {
        return input;
    }
    return null;
}

function resetInput() {
    productName.value = '';
    productPrice.value = '';
    productDescription.value = '';
}

addButton.addEventListener('click', _ => {
    const product = {
        name: clearInput(productName.value),
        price: clearInput(productPrice.value),
        description: clearInput(productDescription.value)
    };
    if (!product.name || !product.price || !product.description) {
        alert('برجاء إدخال جميع بيانات المنتج!');
        return;
    }
    const idx = products.findIndex(ele => {
        return (
            ele.name === product.name &&
            ele.price === Number(product.price) &&
            ele.description === product.description
        );
    });
    if (idx === -1) {
        products.push(product);
        display([product]);
        resetInput();
    } else {
        alert('هذا المنتج موجود بالفعل');
    }
});

productList.addEventListener('click', e => {
    const product = e.target.closest('.product');
    if (!product) return;
    const name = product.querySelector('.name').textContent;
    const price = product.querySelector('.price span').textContent;
    const description = product.querySelector('.description').textContent;
    if (e.target.classList.contains('delete')) {
        const idx = products.findIndex(ele => {
            return (
                ele.name === name &&
                ele.price === Number(price) &&
                ele.description === description
            );
        });
        if (idx !== -1) {
            products.splice(idx, 1);
        }
        product.remove();
    }
    if (e.target.classList.contains('edit')) {
        addButton.style.display = 'none';
        approveEdit.style.display = 'block';
        elementToEdit = product;
        productName.value = name;
        productPrice.value = price;
        productDescription.value = description;
    }
});

function editElement(element) {
    if (!element) return;
    const oldName = element.querySelector('.name').textContent;
    const oldPrice = element.querySelector('.price span').textContent;
    const oldDescription = element.querySelector('.description').textContent;
    const idxBefore = products.findIndex(product =>
        product.name === oldName &&
        product.price === Number(oldPrice) &&
        product.description === oldDescription
    );
    const newName =
        clearInput(productName.value) ?? oldName;
    const newPrice =
        clearInput(productPrice.value) ?? oldPrice;
    const newDescription =
        clearInput(productDescription.value) ?? oldDescription;
    const duplicate = products.findIndex((product, index) =>
        index !== idxBefore &&
        product.name === newName &&
        product.price === Number(newPrice) &&
        product.description === newDescription
    );
    if (duplicate !== -1) {
        alert('هذا المنتج موجود بالفعل');
        return;
    }
    element.querySelector('.name').textContent = newName;
    element.querySelector('.price span').textContent = newPrice;
    element.querySelector('.description').textContent = newDescription;
    if (idxBefore === -1) {
        return;
    }
    products[idxBefore].name = newName;
    products[idxBefore].price = Number(newPrice);
    products[idxBefore].description = newDescription;
    addButton.style.display = 'block';
    approveEdit.style.display = 'none';
    resetInput();
}

approveEdit.addEventListener('click', _ => {
    editElement(elementToEdit);
});