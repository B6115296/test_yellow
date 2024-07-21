"use client";
import React from "react";
import axios from "axios";

function DeleteBtn({ id }: { id: string }) {
  const handleDelete = async () => {
    const confirmed = confirm(
      "Are you sure you want to delete this cryptocurrency?"
    );

    if (confirmed) {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/cryptocurrencies/${id}`
      );

      if (res.status === 200) {
        window.location.reload();
      } else {
        alert("Failed to delete cryptocurrency");
      }
    }
  };
  return (
    <a
      onClick={handleDelete}
      className="bg-red-500 text-white rounded-md py-2 px-3 text-lg cursor-pointer hover:bg-red-700"
    >
      Delete
    </a>
  );
}

export default DeleteBtn;
