import Database from "../config/database";
import { Cryptocurrencies } from "../model/cryptocurrencies";
import cron from "node-cron";
import axios from "axios";

const db = new Database();

async function updatePrices() {
  try {
    const cryptocurrencies = await Cryptocurrencies.findAll();

    for (let crypto of cryptocurrencies) {
      const updatedPrice = await fetchUpdatedPriceFromAPI(crypto.symbol);
      crypto.price = updatedPrice;
      await crypto.save();
      console.log(`Updated price for ${crypto.symbol}: ${updatedPrice}`);
    }

    console.log("Cryptocurrency prices updated successfully.");
  } catch (error) {
    console.error("Error updating cryptocurrency prices:", error);
  }
}

async function fetchUpdatedPriceFromAPI(symbol: string): Promise<number> {
  try {
    const apiUrl = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol.toUpperCase()}USDT`;

    const response = await axios.get(apiUrl);

    const price = parseFloat(response.data.price);
    return price;
  } catch (error) {
    console.error(`Error fetching price for ${symbol} from Binance:`, error);
    throw error;
  }
}

// Schedule the job to run every minute
cron.schedule("*/5 * * * * *", async () => {
  console.log("Running job to update cryptocurrency prices...");
  await updatePrices();
});
