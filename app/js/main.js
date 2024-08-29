import { getRandomNumber, getRandomType, updateDisplay, localStorageGet, localStorageSet } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const $tbody = $('#planetTable tbody');
    const $totalBQBValue = $('#totalBQBValue');
    const $spendableBQB = $('#spendableBQB');
    const localStorageKey = 'tableRows';

    const typeModifiers = {
        planet: { gas: 0.75, rock: 1, water: 1.25, "earth-like": 2.25 },
        moon: {
            size: { small: 0.5, medium: 1, large: 1.5 },
            subtype: { gas: 0.75, rock: 1, water: 1.5 }
        },
        asteroid: { rock: 1, metallic: 5 }
    };

    const calculateValueTotal = (planet, moons, asteroids) => (planet * 2) + (moons * 1) + (asteroids * 0.5);

    const applyModifiers = (value, conditions) => {
        for (const condition of conditions) {
            if (condition.check(value)) {
                return value * condition.modifier;
            }
        }
        return value;
    };

    const calculateResource = (planet, moons, asteroids) => {
        const resourceOneBase = 20;

        const planetConditions = [
            { check: val => val >= 9 && val <= 16, modifier: 1.75 },
            { check: val => val >= 17 && val <= 20, modifier: 3 }
        ];
        const moonsConditions = [
            { check: val => val < 525, modifier: 1.1 },
            { check: val => val >= 526 && val <= 825, modifier: 1.475 },
            { check: val => val >= 826 && val <= 1000, modifier: 2.2 }
        ];
        const asteroidsConditions = [
            { check: val => val <= 6250, modifier: 1.05 },
            { check: val => val >= 6251 && val <= 8750, modifier: 1.25 },
            { check: val => val >= 8751 && val <= 10000, modifier: 1.75 }
        ];

        const resourceOne = applyModifiers(resourceOneBase, planetConditions);
        const finalResourceOne = applyModifiers(resourceOne, moonsConditions);
        return applyModifiers(finalResourceOne, asteroidsConditions);
    };

    const calculateResourceTwo = (planet, moons, asteroids) => calculateResource(planet, moons, asteroids) * 5;
    const calculateResourceThree = (planet, moons, asteroids) => calculateResource(planet, moons, asteroids) * 50;

    const updateTotalBQBValue = () => {
        let totalBQBValue = 0;
        $tbody.find('tr').each(function () {
            totalBQBValue += parseFloat($(this).find('td:last').text());
        });
        $totalBQBValue.text(totalBQBValue.toFixed(2));
    };

    const addResourcesToStorage = (resourceOne, resourceTwo, resourceThree) => {
        let currentResourceOne = localStorageGet('resourceOneQty', 0);
        let currentResourceTwo = localStorageGet('resourceTwoQty', 0);
        let currentResourceThree = localStorageGet('resourceThreeQty', 0);

        currentResourceOne += resourceOne;
        currentResourceTwo += resourceTwo;
        currentResourceThree += resourceThree;

        localStorageSet('resourceOneQty', currentResourceOne);
        localStorageSet('resourceTwoQty', currentResourceTwo);
        localStorageSet('resourceThreeQty', currentResourceThree);
    };

    const updateSpendableBQB = (amount) => {
        let currentSpendableBQB = localStorageGet('spendableBQB', 0);
        currentSpendableBQB += amount;
        localStorageSet('spendableBQB', currentSpendableBQB.toFixed(2));
        $spendableBQB.text(currentSpendableBQB.toFixed(2));
    };

    const initializeSpendableBQB = () => {
        const currentSpendableBQB = localStorageGet('spendableBQB', 0);
        $spendableBQB.text(currentSpendableBQB.toFixed(2));
    };

    const createTableRow = (dataClass, planet, planetType, moons, moonType, asteroids, asteroidType, total, resourceOne, resourceTwo, resourceThree, bqbValue) => {
        const template = document.getElementById('table-row-template').content.cloneNode(true);

        template.querySelector('.data-class').textContent = dataClass;
        template.querySelector('.planet-data').textContent = planet;
        template.querySelector('.planet-type').textContent = planetType;
        template.querySelector('.moon-data').textContent = moons;
        template.querySelector('.moon-type').textContent = moonType;
        template.querySelector('.asteroid-data').textContent = asteroids;
        template.querySelector('.asteroid-type').textContent = asteroidType;
        template.querySelector('.total-data').textContent = total;
        template.querySelector('.resource-one').textContent = resourceOne;
        template.querySelector('.resource-two').textContent = resourceTwo;
        template.querySelector('.resource-three').textContent = resourceThree;
        template.querySelector('.bqb-value').textContent = bqbValue;

        return template;
    };

    const enableUpgradeButton = () => {
        if ($tbody.children('tr').length > 11 && !$('#upgradeButton').length) {
            $('<button id="upgradeButton">Upgrade</button>').insertAfter('#addRowButton');
            $('.row-checkbox').prop('disabled', false);
        }
    };

    document.addEventListener('click', (event) => {
        if (event.target.matches('#addRowButton')) {
            const planet = getRandomNumber(2, 20);
            const moons = getRandomNumber(0, 1000);
            const asteroids = getRandomNumber(5000, 100000);
            const planetType = getRandomType(Object.keys(typeModifiers.planet));
            const moonType = `${getRandomType(Object.keys(typeModifiers.moon.size))} (${getRandomType(Object.keys(typeModifiers.moon.subtype))})`;
            const asteroidType = getRandomType(Object.keys(typeModifiers.asteroid));
            const total = planet + moons + asteroids;
            const resourceOne = calculateResource(planet, moons, asteroids);
            const resourceTwo = calculateResourceTwo(planet, moons, asteroids);
            const resourceThree = calculateResourceThree(planet, moons, asteroids);
            const bqbValue = calculateValueTotal(planet, moons, asteroids);

            const newRow = createTableRow('Class 1', planet, planetType, moons, moonType, asteroids, asteroidType, total, resourceOne, resourceTwo, resourceThree, bqbValue);
            $tbody.append(newRow);
            updateTotalBQBValue();
            saveTableState();
            enableUpgradeButton();
        }

        if (event.target.matches('#deleteButton')) {
            $('.row-checkbox:checked').closest('tr').remove();
            updateTotalBQBValue();
            saveTableState();
        }

        if (event.target.matches('#researchButton')) {
            window.location.href = 'research.html';
        }

        if (event.target.matches('#buttonsPageButton')) {
            window.location.href = 'buttons.html';
        }

        if (event.target.matches('#marketButton')) {
            window.location.href = 'market.html';
        }

        if (event.target.matches('#storageButton')) {
            window.location.href = 'storage.html';
        }
    });

    const saveTableState = () => {
        localStorageSet(localStorageKey, $tbody.html());
    };

    const loadTableState = () => {
        const savedRows = localStorageGet(localStorageKey, '');
        if (savedRows) $tbody.html(savedRows);
        updateTotalBQBValue();
    };

    initializeSpendableBQB();
    loadTableState();
});
