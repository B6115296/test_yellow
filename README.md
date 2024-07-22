# Project 1: Cryptocurrency Price Tracker

Description: Create a web application that tracks and displays the current prices
of various cryptocurrencies.

- In Backend have cron job (updatePrice) to fetch prices from external API (binance) and update prices every 5 seconds
- After start server will auto crate table (cryptocurrencies) and import default data if table is empty
- Have form to add new cryptocurrency / update cryptocurrency and delete cryptocurrency
- Use Tailwind for css
- Can run with docker-compose up --build

## Features

- **Database Connection**: Connects to a PostgreSQL database.
- **Model Synchronization**: Synchronizes Sequelize models with the database.
- **Default Data Insertion**: Inserts default cryptocurrency data if the table is empty.

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL (v13 or later)
- Yarn (v1.22 or later)

### Setup with Docker
    run -> docker-compose up --build

### Setup locally

1. **Clone the Repository**

   ```bash
   git clone https://github.com/B6115296/test_yellow.git

2. **Install Dependencies**
    cd test_yellow/frontend
    cd test_yellow/backend
    yarn install

3. **Configure Environment Variables**
    already provide .env in github for test krub.

    POSTGRES_HOST=postgres
    POSTGRES_PORT=5432
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=1234
    POSTGRES_DB=postgres

4. **Start the Server**
    - frontend -> yarn dev (on port 3000)
    - backend -> yarn start-dev (on port 8000)
