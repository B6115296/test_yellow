import cron from "node-cron";
import axios from "axios";
import Database from "../config/database";
import { Cryptocurrencies } from "../model/cryptocurrencies";

const db = new Database();

class SymbolNotFoundError extends Error {
  constructor(symbol: string) {
    super(`Symbol not found: ${symbol}`);
    this.name = "SymbolNotFoundError";
  }
}

async function updatePrices() {
  try {
    const cryptocurrencies = await Cryptocurrencies.findAll();

    for (let crypto of cryptocurrencies) {
      try {
        const updatedPrice = await fetchUpdatedPriceFromAPI(crypto.symbol);
        crypto.price = updatedPrice;
        await crypto.save();
        console.log(`Updated price for ${crypto.symbol}: ${updatedPrice}`);
      } catch (error) {
        if (error instanceof SymbolNotFoundError) {
          console.warn(
            `Skipping update for ${crypto.symbol}: ${error.message}`
          );
        } else {
          console.error(`Error updating price for ${crypto.symbol}:`, error);
        }
      }
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

    if (!response.data.price) {
      throw new SymbolNotFoundError(symbol);
    }

    const price = parseFloat(response.data.price);
    return price;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 400)
      ) {
        throw new SymbolNotFoundError(symbol);
      } else {
        console.error(
          `Error fetching price for ${symbol} from Binance:`,
          error.message || error
        );
      }
    } else {
      console.error(
        `Unexpected error fetching price for ${symbol} from Binance:`,
        error
      );
    }
    throw error;
  }
}

// Schedule the job to run every 5 seconds
cron.schedule("*/5 * * * * *", async () => {
  console.log("Running job to update cryptocurrency prices...");
  await updatePrices();
});
