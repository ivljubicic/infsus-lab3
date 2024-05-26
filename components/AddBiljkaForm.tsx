"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createBiljka } from "@/model/biljkeModel";

export const AddBiljkaForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    naziv: "",
    osuncanje: "",
    phtla: "",
    vrijemebranja: "",
    vrijemesadnje: "",
    vlaznost: "",
    vrtlarid: "",
    image_url: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await createBiljka(formData);

    if (!error) {
      router.push("/");
    } else {
      console.error("Error adding biljka:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Add New Biljka</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Naziv</label>
        <input
          type="text"
          name="naziv"
          value={formData.naziv}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Osuncanje</label>
        <input
          type="text"
          name="osuncanje"
          value={formData.osuncanje}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">pH Tla</label>
        <input
          type="text"
          name="phtla"
          value={formData.phtla}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Vlaznost</label>
        <input
          type="text"
          name="vlaznost"
          value={formData.vlaznost}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Vrijeme Branja</label>
        <input
          type="datetime-local"
          name="vrijemebranja"
          value={formData.vrijemebranja}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Vrijeme Sadnje</label>
        <input
          type="datetime-local"
          name="vrijemesadnje"
          value={formData.vrijemesadnje}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Vrtlar ID</label>
        <input
          type="text"
          name="vrtlarid"
          value={formData.vrtlarid}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Image URL</label>
        <input
          type="text"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex space-x-2">
        <Button type="submit">Add Biljka</Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
