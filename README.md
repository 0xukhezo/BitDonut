# BitDonut

# App Demo

https://user-images.githubusercontent.com/85538875/151788787-0a8914cb-7e6a-4098-b98e-9f3b42fe2360.mp4

# Overview

BitDonut is a website based on the use of the API provided by CoinGecko.

It is, therefore, a portal for real-time visualization of the fluctuation of the cryptocurrency market, with its corresponding visualization in graphs and the creation of a portfolio. In addition, as a complement to DAO, you can generate campaigns where you can contribute with ETH. The manager of each campaign, will have the option to create tasks with an amount of ETH that at the time you have more than half of validations, among all contributors of the campaign, send the ETH to the address of the recipient. Among the utilities that BitDonut deploys are:

<br></br>
-Real-time visualisation of the price, market volume and market capitalisation of each cryptocurrency.
<br></br>
-Display of information in real time, in addition to 1 day, 7 days, 30 days and 90 days data.
<br></br>
-Cryptocurrency converter between them and US Dollar.
<br></br>
-Creation of a portfolio.
<br></br>
-Calculation of the total value of your portfolio.
<br></br>
-Calculation of the variation in the price of your portfolio.
<br></br>
-Percentage of each cryptocurrency in your portfolio.
<br></br>
-Creating campaigns as if it were a DAO for votes
<br></br>
-Generate requests in which once approved by half of the validators send the marked ETH to the agreed address.

# Tecnologías

<ul >
<li>Solidity</li>
<li>Web3</li> 
<li>React</li> 
<li>Axios</li>  
<li>Chart 2 Js</li> 
<li>HTML</li>
<li>CSS</li>  
</ul>

# Server Install

```
npm install
```

# Server Usage

```
npm run dev
```

Access the client path of the project and type the following commands.

# Cient Install

```
npm install
```

# Client Usage

```
npm run start
```

# Backend Endpoints

| Method | Path                                                                                                                    | Description                                                                                                      |
| ------ | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| GET    | https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${databaseTimeSelected}                  | Access the API to get the information to create the chart of the selected cryptocurrency.                        |
| GET    | https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=${databaseTimeSelected}                          | Access to the API to get the information of the closing and opening price of the selected cryptocurrency market. |
| GET    | https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false | Access the API to get all the information about cryptocurrencies.                                                |

# Front Endpoints

| Path                        | Description                            |
| --------------------------- | -------------------------------------- |
| /                           | Home page                              |
| /coins                      | All cryptocurrencies                   |
| /:id                        | Details of the selected cryptocurrency |
| /convert                    | Cryptocurrency converter               |
| /portfolio                  | Display the user's portfolio.          |
| /campaigns                  | All campaigns.                         |
| /newCampaign                | Create a new campaign.                 |
| /campaigns/:id/requests     | Display the camapigns's requests.      |
| /campaigns/:id/requests/new | Create a new request.                  |
