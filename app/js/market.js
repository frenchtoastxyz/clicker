import { localStorageGet, localStorageSet, updateDisplay } from './utils.js';

$(document).ready(function () {
    const updateStorage = (resource, quantity) => {
        let storedQuantity = localStorageGet(`resource${resource}Qty`, 0);
        storedQuantity += quantity;
        localStorageSet(`resource${resource}Qty`, storedQuantity);
        updateDisplay(`#resource${resource}Qty`, storedQuantity.toFixed(2));
    };

    const updateMarket = (resource, quantity, pricePerUnit, isBuying) => {
        let availableQuantity = parseFloat($(`#resource${resource}QtyAvailable`).text()) || 0;
        let spendableBQB = localStorageGet('spendableBQB', 0);
        const totalCost = quantity * pricePerUnit;

        if (isBuying) {
            if (availableQuantity >= quantity && spendableBQB >= totalCost) {
                availableQuantity -= quantity;
                spendableBQB -= totalCost;
                updateDisplay(`#resource${resource}QtyAvailable`, availableQuantity.toFixed(2));
                updateStorage(resource, quantity);
                localStorageSet('spendableBQB', spendableBQB.toFixed(2));
                updateDisplay('#spendableBQB', spendableBQB.toFixed(2));
            } else {
                alert('Not enough quantity available or insufficient BQB to complete purchase.');
            }
        } else {  // Selling
            let storedQuantity = localStorageGet(`resource${resource}Qty`, 0);
            if (storedQuantity >= quantity) {
                storedQuantity -= quantity;
                spendableBQB += totalCost;
                availableQuantity += quantity;
                localStorageSet(`resource${resource}Qty`, storedQuantity.toFixed(2));
                localStorageSet('spendableBQB', spendableBQB.toFixed(2));
                updateDisplay(`#resource${resource}QtyAvailable`, availableQuantity.toFixed(2));
                updateDisplay('#spendableBQB', spendableBQB.toFixed(2));
                updateDisplay(`#resource${resource}Qty`, storedQuantity.toFixed(2));
            } else {
                alert('Not enough resources in storage to sell.');
            }
        }
    };

    document.addEventListener('click', (event) => {
        if (event.target.matches('.buyButton')) {
            const resource = $(event.target).data('resource');
            const pricePerUnit = parseFloat($(event.target).data('price'));
            updateMarket(resource, 1, pricePerUnit, true);
        }

        if (event.target.matches('.sellButton')) {
            const resource = $(event.target).data('resource');
            const pricePerUnit = parseFloat($(event.target).data('price'));
            updateMarket(resource, 1, pricePerUnit, false);
        }

        if (event.target.matches('#returnToMainPageButton')) {
            window.location.href = 'index.html';
        }
    });
});
