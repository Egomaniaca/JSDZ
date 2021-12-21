'use strict'

const basketCounterEl = document.querySelector('.cart-btn-txt')
const openBasketBtn = document.querySelector('.cart-btn');
const basketEl = document.querySelector('.basket');
const basketTotalEl = document.querySelector('.basketTotal');
const basketTotalValueEl = document.querySelector('.basketTotalValue');

let productsItemPriceEl = document.querySelector('.productsItemPrice').innerHTML;
let productsItemTitleEl = document.querySelector('.productsItemTitle').innerHTML;



openBasketBtn.addEventListener('click', function () {
    basketEl.classList.toggle('hidden');
})

let prodItemBtn = document.querySelectorAll('button[data-productId]');
prodItemBtn.forEach(function (button) {
    button.addEventListener('click', addedProductHandler);
});

function addedProductHandler(event) {
    const productId = event.currentTarget.getAttribute('data-productId');
    addProductIntoBasket(productId)
}

function addProductIntoBasket(productId) {
    increaseProductsCount();
    addProductToObject(productId);
    renderProductInBasket(productId);

}

function renderProductInBasket(productId) {
    let productExist = document.querySelector(`.productCount[data-productId="${productId}"]`);
    if (productExist) {
        increaseProductCount(productId);
        recalculateSumForProduct(productId);
    } else {
        renderNewProductInBasket(productId);
    }
}

function increaseProductCount(productId) {
    const productCountEl = document.querySelector(`.productCount[data-productId="${productId}"]`);
    productCountEl.textContent++;

}

function recalculateSumForProduct(productId) {
    const productTotalRowEl = document.querySelector(`.productTotalRow[data-productId="${productId}"]`);
    let totalPriceForRow = (basket[productId] * productsItemPriceEl.slice(1)).toFixed(2);
    productTotalRowEl.textContent = '$' + totalPriceForRow;
}

function calculateAndRenderTotalBasketSum() {
    let totalSum = 0;
    for (let productId in basket) {
        totalSum += basket[productId] * productsItemPriceEl.slice(1);
    }
    basketTotalValueEl.textContent = totalSum.toFixed(2);
}

function renderNewProductInBasket(productId) {
    let productRow = `
    <div class="basketRow">
        <div>${productsItemTitleEl}</div>
        <div>
            <span class="productCount" data-productId="${productId}">1</span> шт.
        </div>
        <div>${productsItemPriceEl}</div>
        <div>
            <span class="productTotalRow" data-productId="${productId}">${productsItemPriceEl}</span>
        </div>
    </div>
`;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}



function addProductToObject(productId) {
    if (!(productId in basket)) {
        basket[productId] = 1;
    }
    else {
        basket[productId]++;
    }
}

function increaseProductsCount() {
    basketCounterEl.textContent++;
}

function addProductIntoBasket(productId) {
    increaseProductsCount();
    addProductToObject(productId);
    renderProductInBasket(productId);
    calculateAndRenderTotalBasketSum();
}

let basket = {};
