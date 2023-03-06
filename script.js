const product = {
    plainBurger: {
        name: 'Гамбургер Простой',
        price: 10000,
        kcall: 400,
        amount: 0,
        Summ: function () {
            return this.price * this.amount
        },
        Kcall: function () {
            return this.kcall * this.amount
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 600,
        amount: 0,
        Summ: function () {
            return this.price * this.amount
        },
        Kcall: function () {
            return this.kcall * this.amount
        }
    },
    freshCombo: {
        name: 'Fresh Combo',
        price: 31900,
        kcall: 900,
        amount: 0,
        Summ: function () {
            return this.price * this.amount
        },
        Kcall: function () {
            return this.kcall * this.amount
        }
    }
}

const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 2000,
        kcall: 100,
    },
    lettuce: {
        name: 'Салатный лист',
        price: 1000,
        kcall: 100,
    },
    cheese: {
        name: 'Сыр',
        price: 3000,
        kcall: 50,
    }
}



const btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
    checkExtraProduct = document.querySelectorAll('.main__product-checkbox');


for (let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener('click', function () {
        PlusOrMunis(this)
    })
}

function PlusOrMunis(element) {
    // closest() - метод обьекта. Подключается к родительскому элементу
    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        out = parent.querySelector('.main__product-num'),
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'),
        elementData = element.getAttribute('data-symbol')

    if (elementData == '+' && product[parentId].amount < Infinity) {
        product[parentId].amount++
    } else if (elementData == '-' && product[parentId].amount > 0) {
        product[parentId].amount--
    }
    out.innerHTML = product[parentId].amount
    price.innerHTML = product[parentId].Summ()
    kcall.innerHTML = product[parentId].Kcall()
}

for (let i = 0; i < checkExtraProduct.length; i++) {
    checkExtraProduct[i].addEventListener('click', function () {
        addExtraproduct(this)
    })
}

function addExtraproduct(element) {
    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        kcall = parent.querySelector('.main__product-kcall span'),
        price = parent.querySelector('.main__product-price span'),
        elAttr = element.getAttribute('data-extra')
    product[parentId][elAttr] = element.checked
    if (product[parentId][elAttr] == true) {
        product[parentId].price += extraProduct[elAttr].price
        product[parentId].kcall += extraProduct[elAttr].kcall
    } else {
        product[parentId].price -= extraProduct[elAttr].price
        product[parentId].kcall -= extraProduct[elAttr].kcall
    }
    kcall.innerHTML = product[parentId].Kcall()
    price.innerHTML = product[parentId].Summ()
}


const receipt = document.querySelector('.receipt'),
    receiptWindow = document.querySelector('.receipt__window'),
    receiptOut = document.querySelector('.receipt__window-out'),
    addCart = document.querySelector('.addCart'),
    btnReceipt = document.querySelector('.receipt__window-btn')


let arrayProduct = [],
    totalName = '',
    totalPrice = 0,
    totalKcall = 0

addCart.addEventListener('click', function () {
    for (const key in product) {
        const po = product[key]
        if (po.amount > 0) {
            arrayProduct.push(po)
            for (const infokey in po) {
                if (po[infokey] === true) {
                    po.name += '\n' + extraProduct[infokey].name
                }
            }
        }
        po.price = po.Summ()
        po.kcall - po.Kcall()
    }
    for (let i = 0; i < arrayProduct.length; i++) {
        const el = arrayProduct[i]
        totalPrice += el.price
        totalKcall += el.kcall
        totalName += '\n' + el.name + '\n'
    }
    receiptOut.innerHTML = `Вы заказали: \n ${totalName} \n Каллорийность ${totalKcall} \n Стоимость покупки ${totalPrice} сумм`
    receipt.style.display = 'flex'
    setTimeout(() => {
        receipt.style.opacity = '1'
    }, 100);

    setTimeout(() => {
        receiptWindow.style = `top: 50px;
                            height: 100px;
                            overflow-y: scroll;`
    }, 200)
})

btnReceipt.addEventListener('click', function () {
    location.reload()
})

let headerTimer = document.querySelector('.header__timer-extra');

increase()

function increase(e) {
    if (headerTimer.innerHTML >= 0 && headerTimer.innerHTML <= 50) {
        setTimeout(() => {
            headerTimer.innerHTML++
            increase(10)
        }, e)
    }
    else if (headerTimer.innerHTML >= 50 && headerTimer.innerHTML <= 99) {
        setTimeout(() => {
            headerTimer.innerHTML++
            increase(70)
        }, e)
    }
}


