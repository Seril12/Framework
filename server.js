// npm init -y

// npm install axios dotenv

// node server.js



require('dotenv').config();
const axios = require('axios');
const http = require('http');
const fs = require('fs');
const url = require('url');

async function getWeather(city) {
    const apikey = 'f4906f865b631341d0f3fbf49114de36';
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${apikey}&units=metric`;
    try {
        const r = await axios.get(apiurl);
        const d = r.data;
        return {
            city: d.name,
            temp: d.main.temp + '°C',
            desc: d.weather[0].description
        };
    } catch {
        return { error: 'City not found' };
    }
}

http.createServer(async (req, res) => {
    const q = url.parse(req.url, true);
    if (q.pathname === '/') {
        fs.readFile('index.html', (err, data) => res.end(data));
    } else if (q.pathname === '/weather') {
        const loc = q.query.location;
        const data = await getWeather(loc);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    }
}).listen(4000, () => console.log("http://localhost:4000"));