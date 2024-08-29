import { localStorageGet, localStorageSet } from './utils.js';

$(document).ready(function () {
    const checkForUpgrade = (currentClass, nextClass, minPlanets) => {
        const selectedRows = $('#planetTable tr').filter(function () {
            return $(this).data('class') === currentClass && parseInt($(this).find('.planet-data').text(), 10) >= minPlanets;
        });

        if (selectedRows.length >= 10 && selectedRows.length <= 19) {
            let totalPlanet = 0, totalMoons = 0, totalAsteroids = 0;
            selectedRows.each(function () {
                totalPlanet += parseInt($(this).find('.planet-data').text(), 10);
                totalMoons += parseInt($(this).find('.moon-data').text(), 10);
                totalAsteroids += parseInt($(this).find('.asteroid-data').text(), 10);
                $(this).remove();
            });

            const newRowHtml = `
                <tr data-class="${nextClass}">
                    <td><input type="checkbox" class="row-checkbox"></td>
                    <td>${nextClass}</td>
                    <td>${totalPlanet}</td>
                    <td>${getRandomType(Object.keys(typeModifiers.planet))}</td>
                    <td>${totalMoons}</td>
                    <td>${getRandomType(Object.keys(typeModifiers.moon.size))} (${getRandomType(Object.keys(typeModifiers.moon.subtype))})</td>
                    <td>${totalAsteroids}</td>
                    <td>${getRandomType(Object.keys(typeModifiers.asteroid))}</td>
                    <td>${totalPlanet + totalMoons + totalAsteroids}</td>
                    <td>${calculateResourceOne(totalPlanet, totalMoons, totalAsteroids).toFixed(2)}</td>
                    <td>${calculateResourceTwo(totalPlanet, totalMoons, totalAsteroids).toFixed(2)}</td>
                    <td>${calculateResourceThree(totalPlanet, totalMoons, totalAsteroids).toFixed(2)}</td>
                    <td>${calculateValueTotal(totalPlanet, totalMoons, totalAsteroids).toFixed(2)}</td>
                </tr>`;
            $('#planetTable tbody').append(newRowHtml);
        } else {
            alert(`You must select between 10 and 19 rows of ${currentClass} with at least ${minPlanets} planets.`);
        }
    };

    $('#class2Button').click(() => {
        checkForUpgrade('Class 1', 'Class 2', 35);
    });

    $('#class3Button').click(() => {
        checkForUpgrade('Class 2', 'Class 3', 665);
    });

    $('#class4Button').click(() => {
        checkForUpgrade('Class 3', 'Class 4', 12635);
    });

    $('#class5Button').click(() => {
        checkForUpgrade('Class 4', 'Class 5', 240065);
    });

    $('#returnToMainPageButton').click(() => {
        window.location.href = 'index.html';
    });
});
