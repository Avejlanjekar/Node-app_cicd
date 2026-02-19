require("dotenv").config();

const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
    try {
        // Fetch top GitHub users (sorted by followers)
        const response = await axios.get(
            "https://api.github.com/search/users?q=followers:>5000&sort=followers&order=desc&per_page=40"
        );

        const users = response.data.items;

        let html = `
        <html>
        <head>
            <title>Top GitHub Users</title>
            <style>
                body { 
                    font-family: Arial; 
                    background: #f4f4f4; 
                    text-align: center; 
                }
                h1 { color: #333; }
                .container { 
                    display: flex; 
                    flex-wrap: wrap; 
                    justify-content: center; 
                }
                .card {
                    background: white;
                    padding: 20px;
                    margin: 15px;
                    border-radius: 10px;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                    width: 220px;
                }
                img {
                    width: 100px;
                    border-radius: 50%;
                }
                a {
                    text-decoration: none;
                    color: #0366d6;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <h1>🔥 Top GitHub Users</h1>
            <div class="container">
        `;

        users.forEach(user => {
            html += `
                <div class="card">
                    <img src="${user.avatar_url}" />
                    <h3>${user.login}</h3>
                    <p>ID: ${user.id}</p>
                    <a href="${user.html_url}" target="_blank">View Profile</a>
                </div>
            `;
        });

        html += `
            </div>
        </body>
        </html>
        `;

        res.send(html);

    } catch (error) {
        res.send("Error fetching GitHub users");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
