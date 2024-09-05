$(document).ready(() => {
    const $tbody = $('#planetTable tbody');
    let minBaseIncrement = +localStorage.getItem('minBaseIncrement') || 0;
    let multiplierValue = +localStorage.getItem('multiplierValue') || 1;

    const saveTableState = () => localStorage.setItem('tableRows', $tbody.html());
    const loadTableState = () => $tbody.html(localStorage.getItem('tableRows') || '');
    
    const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    
    const createRow = (dataClass, planet, moons, asteroids) => `
        <tr data-class="${dataClass}">
            <td><input type="checkbox" class="row-checkbox"></td>
            <td>${dataClass}</td>
            <td>${planet}</td>
            <td>${moons}</td>
            <td>${asteroids}</td>
            <td>${planet + moons + asteroids}</td>
            <td>${(planet * 2) + moons + (asteroids * 0.5)}BQB</td>
        </tr>`;

    const addRow = (dataClass, multiplier = 1) => {
        const planet = Math.floor(getRandomNumber(2 + minBaseIncrement, 20) * multiplierValue * multiplier);
        const moons = Math.floor(getRandomNumber(0 + minBaseIncrement, 1000) * multiplierValue * multiplier);
        const asteroids = Math.floor(getRandomNumber(5000 + minBaseIncrement, 100000) * multiplierValue * multiplier);

        $tbody.append(createRow(dataClass, planet, moons, asteroids));
        saveTableState();
    };

    const handleFleetRows = (className, count, multiplier) => {
        for (let i = 0; i < Math.floor(count / 100); i++) {
            addRow(className, multiplier);
        }
    };

    $('#addRowButton').click(() => {
        addRow('Class 1');

        //handleFleetRows('Class 1', +localStorage.getItem('scoutShipFleetSize') || 0, 1);
        //handleFleetRows('Class 2', +localStorage.getItem('surveyorFleetSize') || 0, 5);
        //handleFleetRows('Class 3', +localStorage.getItem('explorerFleetSize') || 0, 25);
        //handleFleetRows('Class 4', +localStorage.getItem('pathfinderFleetSize') || 0, 125);
        //handleFleetRows('Class 5', +localStorage.getItem('starCruiserFleetSize') || 0, 625);
    });

    $('#deleteButton').click(() => {
        $('.row-checkbox:checked').closest('tr').remove();
        saveTableState();
    });

    $('#researchButton').click(() => window.location.href = 'research.html');
    $('#buildShipsButton').click(() => window.location.href = 'build.html');
    $('#marketButton').click(() => window.location.href = 'market.html');
    $('#storageButton').click(() => window.location.href = 'storage.html');
    $('#buttonsPageButton').click(() => window.location.href = 'buttons.html');
    $('#class2Button').click(() => checkForClassUpgrade('Class 1', 35, 'Class 2'));

    loadTableState();
});
