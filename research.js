$(document).ready(() => {
    let baseIncrement = +localStorage.getItem('minBaseIncrement') || 0;
    let multiplierValue = +localStorage.getItem('multiplierValue') || 1;
    let unlockProgress = +localStorage.getItem('unlockProgress') || 0;

    const updateDisplay = (selector, value) => $(selector).text(value);

    const incrementValue = (key, increment, displaySelector) => {
        const value = (+localStorage.getItem(key) || 0) + increment;
        localStorage.setItem(key, value);
        updateDisplay(displaySelector, value);
    };

    $('#increaseBaseButton').click(() => incrementValue('minBaseIncrement', 1, '#baseIncrementDisplay'));
    $('#increaseMultiplierButton').click(() => incrementValue('multiplierValue', 0.002, '#multiplierValueDisplay'));

    $('#unlockButton').click(() => {
        if (++unlockProgress <= 250) {
            localStorage.setItem('unlockProgress', unlockProgress);
            updateDisplay('#unlockProgressDisplay', `${unlockProgress}/250`);

            if (unlockProgress === 250) {
                localStorage.setItem('superExploreUnlocked', 'true');
                alert('You have unlocked Super Explore!');
            }
        }
    });

    $('#returnToMainPageButton').click(() => window.location.href = 'index.html');

    updateDisplay('#baseIncrementDisplay', baseIncrement);
    updateDisplay('#multiplierValueDisplay', multiplierValue.toFixed(4));
    updateDisplay('#unlockProgressDisplay', `${unlockProgress}/250`);
});
