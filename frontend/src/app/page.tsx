"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteBtn from "./DeleteBtn";

export interface Cryptocurrencies {
  id: string;
  name: string;
  symbol: string;
  price: number;
}

export default function Home() {
  const [cryptocurrencyList, setCryptocurrencyList] = useState<
    Cryptocurrencies[]
  >([]);

  const getCryptocurrencies = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/cryptocurrencies"
      );

      if (res.status !== 200) {
        throw new Error("Failed to fetch cryptocurrencies");
      }
      setCryptocurrencyList(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCryptocurrencies();

    const intervalId = setInterval(() => {
      getCryptocurrencies();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="container mx-auto my-3">
      <h1 className="text-5xl font-bold">Cryptocurrency Price Tracker</h1>
      <hr className="my-3"></hr>
      <div className="flex justify-end">
        <button className="bg-green-500 text-white rounded py-2 px-4 my-3 text-lg justify-center items-center hover:bg-green-700">
          <Link href="/add-currency">Add Cryptocurrency</Link>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3 gap-5">
        {cryptocurrencyList && cryptocurrencyList.length > 0 ? (
          cryptocurrencyList.map((val) => (
            <div
              key={val.id}
              className="shadow-xl mb-10 p-10 rounded-xl border hover:bg-gray-100 transition-all duration-300 break-word"
            >
              <div className="flex justify-between items-center">
                <h4 className="text-4xl font-bold truncate">{val.symbol}</h4>
                <p className="text-4xl font-normal truncate">{val.price} USD</p>
              </div>
              <p className="mt-5 text-xl truncate">{val.name}</p>

              <div className="mt-5 flex space-x-4">
                <Link
                  className="bg-gray-500 text-white rounded-md py-2 px-3 text-lg cursor-pointer hover:bg-gray-700"
                  href={`/update-currency/${val.id}`}
                >
                  Edit
                </Link>
                <DeleteBtn id={val.id} />
              </div>
            </div>
          ))
        ) : (
          <p className="bg-grey-300 p-3 my-3">No cryptocurrencies found</p>
        )}
      </div>
    </main>
  );
}
