import express from 'express';
import cors from 'cors';

const app = express();
export { app };

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

function tomorrowAt(hours: number, minutes: number): string {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() + 1);
    date.setUTCHours(hours, minutes, 0, 0);

    return date.toISOString();
}

const flight = {
    id: 'FL-8842',
    airline: 'British Airways',
    departure: { airport: 'LHR', time: tomorrowAt(10, 30) },
    arrival: { airport: 'JFK', time: tomorrowAt(14, 5) },
    stops: 1,
    price: { value: 21000, precision: 2, currency: 'GBP' },
};

app.get('/api/v1/flight', (__, res) => {
    res.json({ ...flight });
});

if (process.argv[1] === import.meta.filename) {
    const PORT = 3001;

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}
