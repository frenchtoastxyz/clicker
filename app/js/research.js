import { localStorageGet, localStorageSet, updateDisplay } from './utils.js';

$(document).ready(function () {
    const baseIncrement = localStorageGet('baseIncrement', 0);
    const multiplierValue = localStorageGet('multiplierValue', 1);

    const incrementValue = (key, displaySelector, increment = 1) => {
        let currentValue = localStorageGet(key, 0) + increment;
        localStorageSet(key, currentValue);
        updateDisplay(displaySelector, currentValue.toFixed(2));
    };

    const incrementInfoClicks = () => {
        let infoClicks = localStorageGet('infoClicks', 0) + 1;
        localStorageSet('infoClicks', infoClicks);
        updateDisplay('#infoClicksDisplay', infoClicks);

        if (infoClicks === 10) {
            $('#infoContainer').show();
        } else if (infoClicks === 25) {
            $('#modifierTableContainer').show();
        }
    };

    document.addEventListener('click', (event) => {
        if (event.target.matches('#increaseBaseButton')) {
            incrementValue('baseIncrement', '#baseIncrementDisplay');
        }

        if (event.target.matches('#increaseMultiplierButton')) {
            incrementValue('multiplierValue', '#multiplierValueDisplay', 0.002); // 0.2%
        }

        if (event.target.matches('#increaseInfoButton')) {
            incrementInfoClicks();
        }

        if (event.target.matches('#unlockButton')) {
            incrementValue('unlockClicks', '#unlockClicksDisplay');
        }

        if (event.target.matches('#returnToMainPageButton')) {
            window.location.href = 'index.html';
        }
    });

    // Initialize displayed values
    updateDisplay('#baseIncrementDisplay', baseIncrement.toFixed(2));
    updateDisplay('#multiplierValueDisplay', multiplierValue.toFixed(4));
    updateDisplay('#infoClicksDisplay', localStorageGet('infoClicks', 0));
    updateDisplay('#unlockClicksDisplay', localStorageGet('unlockClicks', 0));
});
