import { Cryptocurrencies } from "../model/cryptocurrencies";

interface ICryptoRepo {
  save(crypto: Cryptocurrencies): Promise<Cryptocurrencies>;
  update(crypto: Cryptocurrencies): Promise<Cryptocurrencies>;
  delete(cryptoId: number): Promise<Cryptocurrencies>;
  retriveById(cryptoId: number): Promise<Cryptocurrencies>;
  retriveAll(): Promise<Cryptocurrencies[]>;
}

export class CrypToRepo implements ICryptoRepo {
  async save(crypto: Cryptocurrencies): Promise<Cryptocurrencies> {
    try {
      return await Cryptocurrencies.create({
        name: crypto.name,
        symbol: crypto.symbol,
        price: crypto.price,
      });
    } catch (error) {
      throw new Error("Failed to save crypto: " + error);
    }
  }

  async update(crypto: Cryptocurrencies): Promise<Cryptocurrencies> {
    try {
      const new_crypto = await Cryptocurrencies.findOne({
        where: {
          id: crypto.id,
        },
      });

      if (!new_crypto) {
        throw new Error("Crypto not found");
      }
      new_crypto.name = crypto.name;
      new_crypto.symbol = crypto.symbol;
      new_crypto.price = crypto.price;

      await new_crypto.save();
      return new_crypto;
    } catch (error) {
      throw new Error("Failed to update crypto: " + error);
    }
  }

  async delete(cryptoId: number): Promise<Cryptocurrencies> {
    try {
      const new_crypto = await Cryptocurrencies.findOne({
        where: {
          id: cryptoId,
        },
      });
      if (!new_crypto) {
        throw new Error("Crypto not found");
      }
      await new_crypto.destroy();
      return new_crypto;
    } catch (error) {
      throw new Error("Failed to delete crypto: " + error);
    }
  }

  async retriveById(cryptoId: number): Promise<Cryptocurrencies> {
    try {
      const new_crypto = await Cryptocurrencies.findOne({
        where: {
          id: cryptoId,
        },
      });
      if (!new_crypto) {
        throw new Error("Crypto not found");
      }
      return new_crypto;
    } catch (error) {
      throw new Error("Failed to save crypto: " + error);
    }
  }

  async retriveAll(): Promise<Cryptocurrencies[]> {
    try {
      const new_crypto = await Cryptocurrencies.findAll({});
      if (!new_crypto) {
        throw new Error("Crypto not found");
      }
      return new_crypto;
    } catch (error) {
      throw new Error("Failed to save crypto: " + error);
    }
  }
}
