// Replace with your actual Spreadsheet ID and API Key
const spreadsheetId = '1VRDcUmqlWPoRFtvN-GxVwPfjb6Hry4ifungoQz-t-MA'; // Example: 1FABCdEXAMPLE_URL_GOESHERE =>  YOUR_SPREADSHEET_ID
const apiKey = 'AIzaSyBUC6qRzrLExDMvTmw-HDvrH7zIEMMTd2U'; // Example: AIzaSyDEXAMPLE_KEY_GOESHERE => YOUR_GOOGLE_API_KEY
const sheetName = 'score'; // Replace with your actual sheet name if different

const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;

const loader = document.getElementById('loader');
const errorMessage = document.getElementById('errorMessage');
const dataTable = document.getElementById('data-table');
const tableHead = dataTable.querySelector('thead');
const tableBody = dataTable.querySelector('tbody');

async function fetchGoogleSheetData() {
    loader.style.display = 'block'; // Show loader

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const rows = data.values;

        if (rows && rows.length > 0) {
            // Display header row
            const headerRow = document.createElement('tr');
            rows[0].forEach(headerText => {
                const header = document.createElement('th');
                header.textContent = headerText;
                headerRow.appendChild(header);
            });
            tableHead.appendChild(headerRow);

            // Populate the HTML table (skipping the header row)
            for (let i = 1; i < rows.length; i++) {
                const row = document.createElement('tr');
                rows[i].forEach(cell => {
                    const cellElement = document.createElement('td');
                    cellElement.textContent = cell;
                    row.appendChild(cellElement);
                });
                tableBody.appendChild(row);
            }
        } else {
            errorMessage.textContent = 'No data found in the spreadsheet.';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Error fetching Google Sheets data:', error);
        errorMessage.textContent = `Error fetching data: ${error.message}. Please check your spreadsheet ID, API key, sheet name, and internet connection.`;
        errorMessage.style.display = 'block';
    } finally {
        loader.style.display = 'none'; // Hide loader
    }
}

document.addEventListener('DOMContentLoaded', fetchGoogleSheetData);
