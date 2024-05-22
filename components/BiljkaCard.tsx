"use client";
import React, { useEffect } from "react";
import { Biljka, Vrtlar } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { deleteBiljka } from "@/model/biljkeModel";

interface BiljkaCardProps {
  biljka: Biljka;
  vrtlar: Vrtlar;
}

const BiljkaCard: React.FC<BiljkaCardProps> = ({ biljka, vrtlar }) => {
  const router = useRouter();

  const onUpdate = () => {
    router.push(`/biljka/${biljka.biljkaid}/update`);
  };

  const onDelete = () => {
    deleteBiljka(biljka.biljkaid);
    router.push("/");
  };

  return (
    <Card className="w-full max-w-xl">
      <div className="flex">
        <div className="w-1/3 flex flex-col items-center p-4">
          {biljka.image_url && (
            <img
              src={biljka.image_url}
              alt={biljka.naziv}
              width={300}
              height={300}
              className="aspect-square rounded-md object-cover"
            />
          )}
          <CardHeader>
            <CardTitle>{biljka.naziv}</CardTitle>
          </CardHeader>
        </div>
        <CardContent className="w-2/3 p-4">
          <div className="flex flex-col items-start">
            <div className="mt-2">Osuncanje: {biljka.osuncanje}</div>
            <div className="mt-1">pH tla: {biljka.phtla}</div>
            <div className="mt-1" suppressHydrationWarning>
              Vrijeme branja: {new Date(biljka.vrijemebranja).toLocaleString()}
            </div>
            <div className="mt-1" suppressHydrationWarning>
              Vrijeme sadnje: {new Date(biljka.vrijemesadnje).toLocaleString()}
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Vrtlar Details</h2>
              {vrtlar && (
                <>
                  <p>Ime: {vrtlar.ime}</p>
                  <p>Email: {vrtlar.mailadresa}</p>
                </>
              )}
            </div>
            <div className="mt-4 flex space-x-2">
              <Button variant="outline" onClick={onUpdate}>
                Update
              </Button>
              <Button variant="outline" onClick={onDelete}>
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default BiljkaCard;
