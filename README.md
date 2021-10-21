# API Documentation

## Getting Started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npx knex migrate:latest** to create tables
- **npx knex seed:run** to populate database with some seed data

### Backend Framework

- Express for flexibility and simple routing
- SQlite since data persistence is not important for this exercise

## Endpoints

#### Payer Routes

| Method | Endpoint                        | Access Control | Description                           |
| ------ | ------------------------------- | -------------- | ------------------------------------- |
| GET    | `/payers`                       | all users      | Returns list of all payers.           |
| GET    | `/payers/points`                | all users      | Returns all payers with point balance |

#### Transaction Routes

| Method | Endpoint                         | Access Control | Description                                   |
| ------ | -------------------------------- | -------------- | --------------------------------------------- |
| GET    | `/transactions`                  | all users      | Returns list of all transactions.             |
| POST   | `/transactions`                  | all users      | Creates a new transaction.                    |
| PUT    | `/transactions/spend-points`     | all users      | Spend a defined amount of points.             |

## Data Model

#### TRANSACTIONS

---

##### EXPECTS

```
{
    "payer_id": 10000,
    "points": 700
}
```

##### RETURNS

```
{
    "id": 20011,
    "payer_id": 10000,
    "points": 700,
    "timestamp": "2021-10-21T00:18:22.627Z"
}
```

#### SPENDING POINTS

---

##### EXPECTS

```
{
    "points": 5000
}
```

##### RETURNS

```
[
    {
        "payer": "DANNON",
        "points": -100
    },
    {
        "payer": "UNILEVER",
        "points": -200
    },
    {
        "payer": "MILLER COORS",
        "points": -4700
    }
]
```

#### POINTS BALANCE

---

##### RETURNS

```
{
    "DANNON": 1000,
    "UNILEVER": 0,
    "MILLER COORS": 5300
}

```

## Environment Variables

This application does not use any environmental variables, as it is just an exercise that runs locally on your machine.