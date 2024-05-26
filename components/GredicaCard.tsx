"use client";
import React, { useEffect, useState } from "react";
import { Gredica, Lokacija } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { updateGredica } from "@/model/gredicaModel";

interface BiljkaCardProps {
  gredica: Gredica;
  lokacije: Lokacija[];
}

const GredicaCard: React.FC<BiljkaCardProps> = ({ gredica, lokacije }) => {
  const [formData, setFormData] = useState(gredica);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: parseInt(value, 10),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateGredica(formData);
  };

  return (
    <Card className="w-full max-w-xl">
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <div className="w-1/3 flex flex-col items-center p-4">
            <CardHeader>
              <CardTitle>
                <input
                  type="text"
                  name="naziv"
                  value={formData.naziv}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </CardTitle>
            </CardHeader>
          </div>
          <CardContent className="w-2/3 p-4">
            <div className="flex flex-col items-start">
              <div className="mt-4">
                <div>
                  Duljina:
                  <input
                    type="number"
                    name="duljina"
                    value={formData.duljina}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  Širina:
                  <input
                    type="number"
                    name="sirina"
                    value={formData.sirina}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  Lokacija:
                  <select
                    name="lokacijaid"
                    value={formData.lokacijaid}
                    onChange={handleSelectChange}
                    className="w-full border rounded p-2"
                  >
                    {lokacije.map((lokacija) => (
                      <option key={lokacija.id} value={lokacija.id}>
                        {lokacija.ime}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <Button type="submit" variant="outline">
                  Submit
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </form>
    </Card>
  );
};

export default GredicaCard;
