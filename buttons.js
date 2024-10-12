$(document).ready(() => {
    const combineSelectedRowsToClass2 = () => {
        const selectedRows = $('#planetTable tbody tr').filter((_, row) => {
            return $(row).find('.row-checkbox').is(':checked') && $(row).data('class') === 'Class 1';
        });

        if (selectedRows.length >= 19) {
            const [newRowPlanets, newRowMoons, newRowAsteroids] = ['td:nth-child(3)', 'td:nth-child(4)', 'td:nth-child(5)']
                .map(selector => selectedRows.slice(0, 19).toArray().reduce((sum, row) => sum + +$(row).find(selector).text(), 0));

            const newRow = `<tr data-class="Class 2">
                                <td><input type="checkbox" class="row-checkbox"></td>
                                <td>Class 2</td>
                                <td>${newRowPlanets}</td>
                                <td>${newRowMoons}</td>
                                <td>${newRowAsteroids}</td>
                                <td>${newRowPlanets + newRowMoons + newRowAsteroids}</td>
                                <td>${(newRowPlanets * 2) + newRowMoons + (newRowAsteroids * 0.5)}BQB</td>
                            </tr>`;

            $('#planetTable tbody').append(newRow);
            selectedRows.slice(0, 19).hide(); // Hide the selected Class 1 rows

            alert('Successfully combined the selected rows into a Class 2 row!');
        } else {
            alert('You need to select at least 19 rows with Class 1 to combine them.');
        }
    };

    // Button click handler to combine selected rows into Class 2
    $('#combineToClass2Button').click(() => {
        combineSelectedRowsToClass2();
    });

    $('#returnToMainPageButton').click(() => window.location.href = 'index.html');
});