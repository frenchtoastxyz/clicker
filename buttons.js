$(document).ready(() => {
    const checkForClassUpgrade = (classType, minPlanets, nextClass) => {
        const matchingRows = $('#planetTable tbody tr').filter((_, row) => {
            const planetCount = +$(row).find('td:nth-child(3)').text();
            return $(row).data('class') === classType && planetCount >= minPlanets;
        });

        if (matchingRows.length >= 19) {
            const [newRowPlanets, newRowMoons, newRowAsteroids] = ['td:nth-child(3)', 'td:nth-child(4)', 'td:nth-child(5)']
                .map(selector => matchingRows.slice(0, 19).toArray().reduce((sum, row) => sum + +$(row).find(selector).text(), 0));

            const newRow = `<tr data-class="${nextClass}">
                                <td><input type="checkbox" class="row-checkbox"></td>
                                <td>${nextClass}</td>
                                <td>${newRowPlanets}</td>
                                <td>${newRowMoons}</td>
                                <td>${newRowAsteroids}</td>
                                <td>${newRowPlanets + newRowMoons + newRowAsteroids}</td>
                                <td>${(newRowPlanets * 2) + newRowMoons + (newRowAsteroids * 0.5)}BQB</td>
                            </tr>`;

            $('#planetTable tbody').append(newRow);
            matchingRows.slice(0, 19).remove();
            alert(`Successfully upgraded to ${nextClass} row!`);
        } else {
            alert(`You need at least 19 rows with ${minPlanets} or more planets to upgrade.`);
        }
    };

    $('#class2Button').click(() => checkForClassUpgrade('Class 1', 35, 'Class 2'));
    $('#class3Button').click(() => checkForClassUpgrade('Class 2', 665, 'Class 3'));
    $('#class4Button').click(() => checkForClassUpgrade('Class 3', 12635, 'Class 4'));
    $('#class5Button').click(() => checkForClassUpgrade('Class 4', 240065, 'Class 5'));

    $('#returnToMainPageButton').click(() => window.location.href = 'index.html');
});

