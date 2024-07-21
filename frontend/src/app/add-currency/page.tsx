"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

function AddCurrency() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState(0.0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name) {
      newErrors.name = "Cryptocurrency name is required.";
    }

    if (!symbol) {
      newErrors.symbol = "Symbol is required.";
    } else if (!/^[A-Z]+$/.test(symbol)) {
      newErrors.symbol = "Symbol must be in uppercase.";
    }

    if (isNaN(price) || price < 0) {
      newErrors.price = "Price must be a positive decimal number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/cryptocurrencies",
        {
          name,
          symbol,
          price,
        }
      );

      if (res.status === 201) {
        router.push("/");
      } else {
        throw new Error("Failed to add cryptocurrency");
      }
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
        <h3 className="text-3xl font-bold mb-4">Add Cryptocurrency</h3>
        <hr className="my-3 w-full" />

        <div className="w-full max-w-md mb-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={symbol}
            onChange={(e) => {
              const uppercaseValue = e.target.value.toUpperCase();
              setSymbol(uppercaseValue);
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
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
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
          Add Cryptocurrency
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

export default AddCurrency;
