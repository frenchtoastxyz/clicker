import { localStorageGet, updateDisplay } from './utils.js';

$(document).ready(function () {
    const loadStorage = () => {
        const resources = ['one', 'two', 'three'];
        resources.forEach(resource => {
            let storedQuantity = localStorageGet(`resource${resource.charAt(0).toUpperCase() + resource.slice(1)}Qty`, 0);
            updateDisplay(`#resource${resource.charAt(0).toUpperCase() + resource.slice(1)}Qty`, storedQuantity.toFixed(2));
        });
    };

    document.addEventListener('click', (event) => {
        if (event.target.matches('#returnToMainPageButton')) {
            window.location.href = 'index.html';
        }

        if (event.target.matches('#goToMarketButton')) {
            window.location.href = 'market.html';
        }
    });

    loadStorage();
});
