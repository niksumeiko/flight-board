export type Amount = {
    value: number;
    precision: number;
    currency: string;
};

export type FlightPoint = {
    airport: string;
    time: string;
};

export type Flight = {
    id: string;
    airline: string;
    departure: FlightPoint;
    arrival: FlightPoint;
    stops: number;
    price: Amount;
};
