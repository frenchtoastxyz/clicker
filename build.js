$(document).ready(() => {
    const localStorageGet = (key, defaultValue = 0) => +localStorage.getItem(key) || defaultValue;
    const localStorageSet = (key, value) => localStorage.setItem(key, value);

    const buildShips = (className, quantity, { resourceOne, resourceTwo, resourceThree }) => {
        let classRows = localStorageGet(`${className}Rows`);
        let resourceOneQty = localStorageGet('resourceOneQty');
        let resourceTwoQty = localStorageGet('resourceTwoQty');
        let resourceThreeQty = localStorageGet('resourceThreeQty');

        if (classRows >= quantity && resourceOneQty >= quantity * resourceOne && resourceTwoQty >= quantity * resourceTwo && resourceThreeQty >= quantity * resourceThree) {
            classRows -= quantity;
            resourceOneQty -= quantity * resourceOne;
            resourceTwoQty -= quantity * resourceTwo;
            resourceThreeQty -= quantity * resourceThree;

            localStorageSet(`${className}Rows`, classRows);
            localStorageSet('resourceOneQty', resourceOneQty);
            localStorageSet('resourceTwoQty', resourceTwoQty);
            localStorageSet('resourceThreeQty', resourceThreeQty);

            let fleetSize = localStorageGet(`${className}FleetSize`);
            localStorageSet(`${className}FleetSize`, fleetSize + quantity);

            alert(`Successfully built ${quantity} ${className.replace('FleetSize', '')}(s)!`);
        } else {
            alert('Not enough resources or class rows to build the ships.');
        }
    };

    const shipButtons = [
        { id: '#buildScoutShipButton', className: 'scoutShipFleetSize', resourceReqs: { resourceOne: 1, resourceTwo: 5, resourceThree: 10 } },
        { id: '#buildSurveyorButton', className: 'surveyorFleetSize', resourceReqs: { resourceOne: 5, resourceTwo: 25, resourceThree: 50 } },
        { id: '#buildExplorerButton', className: 'explorerFleetSize', resourceReqs: { resourceOne: 25, resourceTwo: 125, resourceThree: 250 } },
        { id: '#buildPathfinderButton', className: 'pathfinderFleetSize', resourceReqs: { resourceOne: 125, resourceTwo: 625, resourceThree: 1250 } },
        { id: '#buildStarCruiserButton', className: 'starCruiserFleetSize', resourceReqs: { resourceOne: 625, resourceTwo: 3125, resourceThree: 6250 } }
    ];

    shipButtons.forEach(({ id, className, resourceReqs }) => {
        $(id).click(() => {
            const quantity = +$(id.replace('Button', 'Input')).val();
            buildShips(className, quantity, resourceReqs);
        });
    });

    $('#returnToMainPageButton').click(() => window.location.href = 'index.html');
});
