$(document).ready(() => {
    const updateResourceDisplay = (resourceId, qty) => $(`#${resourceId}`).text(qty);

    const resourceOneQty = +localStorage.getItem('resourceOneQty') || 0;
    const resourceTwoQty = +localStorage.getItem('resourceTwoQty') || 0;
    const resourceThreeQty = +localStorage.getItem('resourceThreeQty') || 0;

    updateResourceDisplay('resource1Quantity', resourceOneQty);
    updateResourceDisplay('resource2Quantity', resourceTwoQty);
    updateResourceDisplay('resource3Quantity', resourceThreeQty);

    $('#upgradeStorageButton').click(() => alert('Storage upgrade coming soon!'));

    $('#returnToMainPageButton').click(() => window.location.href = 'index.html');
});
