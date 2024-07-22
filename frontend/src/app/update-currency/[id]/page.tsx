"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Cryptocurrencies } from "@/app/page";

function UpdateCurrency({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [newName, setNewName] = useState("");
  const [newSymbol, setNewSymbol] = useState("");
  const [newPrice, setNewPrice] = useState(0.0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [cryptocurrencyData, setCryptocurrencyData] = useState(
    {} as Cryptocurrencies
  );

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};

    if (!newName) {
      newErrors.name = "Cryptocurrency name is required.";
    }

    if (!newSymbol) {
      newErrors.symbol = "Symbol is required.";
    } else if (!/^[A-Z]+$/.test(newSymbol)) {
      newErrors.symbol = "Symbol must be in uppercase.";
    }

    if (isNaN(newPrice) || newPrice < 0) {
      newErrors.price = "Price must be a positive decimal number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getCrytoById = async (id: string) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/cryptocurrencies/${id}`
      );

      if (res.status !== 200) {
        throw new Error("Failed to fetch cryptocurrencies");
      }
      const data = res.data.data;
      const price = data.price ? parseFloat(data.price) : 0;
      setNewName(data.name);
      setNewSymbol(data.symbol);
      setNewPrice(price);

      setCryptocurrencyData({ ...data, price });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCrytoById(id);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/cryptocurrencies/${id}`,
        {
          name: newName,
          symbol: newSymbol,
          price: newPrice,
        }
      );

      if (res.status !== 200) {
        throw new Error("Failed to update cryptocurrency");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "An unknown error occurred";
        alert(message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  return (
    <div className="container mx-auto py-10 flex justify-center">
      <form
        className="flex flex-col items-center border p-5 w-full max-w-md shadow-xl rounded-xl"
        onSubmit={handleSubmit}
      >
        <h3 className="text-3xl font-bold mb-4">Update Cryptocurrency</h3>
        <hr className="my-3 w-full" />

        <div className="w-full max-w-md mb-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className={`w-full bg-gray-200 py-2 px-3 rounded my-2 text-lg ${
              errors.name ? "border-red-500" : ""
            }`}
            placeholder="Cryptocurrency Name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="w-full max-w-md mb-3">
          <input
            type="text"
            value={newSymbol}
            onChange={(e) => {
              const uppercaseValue = e.target.value.toUpperCase();
              setNewSymbol(uppercaseValue);
            }}
            className={`w-full bg-gray-200 py-2 px-3 rounded my-2 text-lg ${
              errors.symbol ? "border-red-500" : ""
            }`}
            placeholder="Symbol"
          />
          {errors.symbol && (
            <p className="text-red-500 text-sm">{errors.symbol}</p>
          )}
        </div>

        <div className="w-full max-w-md mb-3">
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(parseFloat(e.target.value))}
            className={`w-full bg-gray-200 py-2 px-3 rounded my-2 text-lg ${
              errors.price ? "border-red-500" : ""
            }`}
            placeholder="Price"
            step="0.01"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white border rounded py-2 px-3 my-2 text-lg w-full max-w-md hover:bg-green-700"
        >
          Update Cryptocurrency
        </button>
        <Link
          href="/"
          className="bg-gray-500 text-white border text-lg rounded py-2 px-3 my-2 w-full max-w-md text-center hover:bg-gray-700"
        >
          Back
        </Link>
      </form>
    </div>
  );
}

export default UpdateCurrency;
