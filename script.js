const SHEET_ID = "1nvxvvaqUj4IdcjVJ4W9WNtHu3wsBiLBon5auRwcW6oQ";
const API_KEY = "AIzaSyCKAVzjKWpWhJUimDpvGLVDL5SoEo01yR0";
const SHEET_NAME = "Sheet1"; // Pastikan ini sama dengan nama sheet dalam Google Sheets

async function fetchLeaderboard() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    let leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = `
        <tr>
            <th>Ranking</th>
            <th>Nama</th>
            <th>Sales (RM)</th>
            <th>Gambar</th>
        </tr>
    `;

    let rows = data.values.slice(1); // Buang row pertama (header)
    rows.sort((a, b) => b[1] - a[1]); // Susun mengikut sales tertinggi

    rows.forEach((row, index) => {
        leaderboard.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${row[0]}</td>
                <td>${row[1]}</td>
                <td><img src="${row[2]}" alt="Profile"></td>
            </tr>
        `;
    });
}

// Auto update setiap 10 saat
setInterval(fetchLeaderboard, 10000);
fetchLeaderboard();
