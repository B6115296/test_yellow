import { Request, Response } from "express";
import { Cryptocurrencies } from "../model/cryptocurrencies";
import { CrypToRepo } from "../repository/cryptoRepo";
import { Op } from "sequelize";

class CryptocurrenciesConroller {
  async create(req: Request, res: Response) {
    try {

      const { name, symbol } = req.body;
      const existingCrypto = await Cryptocurrencies.findOne({
        where: {
          [Op.or]: [{ name }, { symbol }],
        },
      });

      if (existingCrypto) {
        return res.status(400).json({
          status: "Bad Request",
          message: "Cryptocurrency with the same name or symbol already exists",
        });
      }

      const new_crypto = new Cryptocurrencies();
      new_crypto.name = req.body.name;
      new_crypto.symbol = req.body.symbol;
      new_crypto.price = req.body.price;
      await new CrypToRepo().save(new_crypto);
      res.status(201).json({
        status: "Created",
        message: "Successfully add cryptocurrencies",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error",
        message: "Internal Server Error",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      const new_crypto = new Cryptocurrencies();
      new_crypto.id = id;
      new_crypto.name = req.body.name;
      new_crypto.symbol = req.body.symbol;
      new_crypto.price = req.body.price;

      await new CrypToRepo().update(new_crypto);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully update cryptocurrencies",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error",
        message: "Internal Server Error",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      await new CrypToRepo().delete(id);
      res.status(200).json({
        status: "Ok!",
        message: "Successfully delete cryptocurrencies",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error",
        message: "Internal Server Error",
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      const new_crypto = await new CrypToRepo().retriveById(id);
      res.status(200).json({
        status: "Ok!",
        message: "Successfully get cryptocurrencies",
        data: new_crypto,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error",
        message: "Internal Server Error",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const new_crypto = await new CrypToRepo().retriveAll();
      res.status(200).json({
        status: "Ok!",
        message: "Successfully get all cryptocurrencies",
        data: new_crypto,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error",
        message: "Internal Server Error",
      });
    }
  }
}

export default new CryptocurrenciesConroller();