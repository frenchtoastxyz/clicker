$(document).ready(() => {
    const updateResourceDisplay = (resourceId, qty) => $(`#${resourceId}`).text(qty);

    const handleResourceTransaction = (resourceId, pricePerUnit, resourceQtyVar, operation) => {
        let spendableBQB = +localStorage.getItem('spendableBQB') || 0;
        let resourceQty = +localStorage.getItem(resourceQtyVar) || 0;

        if (operation === 'buy' && spendableBQB >= pricePerUnit) {
            spendableBQB -= pricePerUnit;
            resourceQty += 1;
        } else if (operation === 'sell' && resourceQty > 0) {
            spendableBQB += pricePerUnit;
            resourceQty -= 1;
        } else {
            return alert(`Not enough ${operation === 'buy' ? 'BQB' : 'resources'} to ${operation}.`);
        }

        localStorage.setItem('spendableBQB', spendableBQB);
        localStorage.setItem(resourceQtyVar, resourceQty);
        updateResourceDisplay(resourceId, resourceQty);
        alert(`${operation.charAt(0).toUpperCase() + operation.slice(1)} successful!`);
    };

    $('#buyResource1Button').click(() => handleResourceTransaction('resource1Quantity', 10, 'resourceOneQty', 'buy'));
    $('#sellResource1Button').click(() => handleResourceTransaction('resource1Quantity', 10, 'resourceOneQty', 'sell'));
    $('#buyResource2Button').click(() => handleResourceTransaction('resource2Quantity', 50, 'resourceTwoQty', 'buy'));
    $('#sellResource2Button').click(() => handleResourceTransaction('resource2Quantity', 50, 'resourceTwoQty', 'sell'));
    $('#buyResource3Button').click(() => handleResourceTransaction('resource3Quantity', 100, 'resourceThreeQty', 'buy'));
    $('#sellResource3Button').click(() => handleResourceTransaction('resource3Quantity', 100, 'resourceThreeQty', 'sell'));

    $('#returnToMainPageButton').click(() => window.location.href = 'index.html');
});
