"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Biljka, Posadena } from "@/types/database";
import { Button } from "@/components/ui/button";
import {
  deletePosadena,
  updatePosadena,
  createPosadena,
} from "@/model/gredicaModel";

interface DashboardProps {
  posadeneBiljke: Biljka[];
  biljke: Biljka[];
  posadene: Posadena[];
  gredicaid: number;
}

export const Dashboard: React.FC<DashboardProps> = ({
  posadeneBiljke: initialBiljke,
  biljke,
  posadene: initialPosadene,
  gredicaid,
}) => {
  const [posadeneBiljke, setPosadeneBiljke] = useState(initialBiljke);
  const [posadene, setPosadene] = useState(initialPosadene);
  const [editBiljkaId, setEditBiljkaId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Posadena | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newBiljkaId, setNewBiljkaId] = useState<number | null>(null);
  const [newKolicina, setNewKolicina] = useState<number>(0);
  const [newVrijemeSadnje, setNewVrijemeSadnje] = useState<string>("");

  function handleDeletion(biljkaid: number, gredicaid: number) {
    deletePosadena(gredicaid, biljkaid).then(() => {
      setPosadeneBiljke((prevBiljke) =>
        prevBiljke.filter((biljka) => biljka.biljkaid !== biljkaid)
      );
      setPosadene((prevPosadene) =>
        prevPosadene.filter((posadena) => posadena.biljkaid !== biljkaid)
      );
    });
  }

  function handleEdit(biljkaid: number, gredicaid: number) {
    const posadena = posadene.find((p) => p.biljkaid === biljkaid);
    if (posadena) {
      setEditFormData(posadena);
      setEditBiljkaId(biljkaid);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setEditFormData((prevData) => {
      if (!prevData) return prevData;
      return {
        ...prevData,
        [name]: name === "kolicina" ? parseInt(value, 10) : new Date(value),
      };
    });
  }

  async function handleApply() {
    if (editFormData) {
      await updatePosadena(editFormData);
      setEditBiljkaId(null);
      setPosadene((prevPosadene) =>
        prevPosadene.map((posadena) =>
          posadena.biljkaid === editFormData.biljkaid ? editFormData : posadena
        )
      );
      const updatedBiljka = posadeneBiljke.find(
        (b) => b.biljkaid === editFormData.biljkaid
      );
      if (updatedBiljka) {
        setPosadeneBiljke((prevBiljke) =>
          prevBiljke.map((biljka) =>
            biljka.biljkaid === editFormData.biljkaid
              ? { ...biljka, ...editFormData }
              : biljka
          )
        );
      }
    }
  }

  async function handleAddBiljka() {
    if (newBiljkaId !== null && newVrijemeSadnje) {
      const newPosadena: Posadena = {
        gredicaid,
        biljkaid: newBiljkaId,
        kolicina: newKolicina,
        vrijemesadnje: new Date(newVrijemeSadnje),
      };
      await createPosadena(newPosadena);
      setPosadene((prevPosadene) => [...prevPosadene, newPosadena]);

      const addedBiljka = biljke.find((b) => b.biljkaid === newBiljkaId);
      if (addedBiljka) {
        setPosadeneBiljke((prevBiljke) => [...prevBiljke, addedBiljka]);
      }

      setNewBiljkaId(null);
      setNewKolicina(0);
      setNewVrijemeSadnje("");
      setIsAdding(false);
    }
  }

  const columns = [
    "naziv",
    "kolicina",
    "osuncanje",
    "vlaznost",
    "phtla",
    "vrijemesadnje",
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>posadeneBiljke</CardTitle>
                  <CardDescription>
                    Pregled tvojih biljaka za gredicu.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {columns.map((column, index) => (
                          <TableHead key={index}>
                            {column.charAt(0).toUpperCase() + column.slice(1)}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {posadeneBiljke.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length}
                            className="text-center"
                          >
                            No data available
                          </TableCell>
                        </TableRow>
                      ) : (
                        posadeneBiljke.map((biljka) => (
                          <TableRow
                            key={biljka.biljkaid}
                            className="cursor-pointer hover:bg-gray-200"
                          >
                            {columns.map((column, index) => {
                              if (column === "kolicina") {
                                return (
                                  <TableCell
                                    key={index}
                                    suppressHydrationWarning
                                  >
                                    {
                                      posadene.find(
                                        (p) => p.biljkaid === biljka.biljkaid
                                      )?.kolicina
                                    }
                                  </TableCell>
                                );
                              } else if (column === "vrijemesadnje") {
                                return (
                                  <TableCell
                                    key={index}
                                    suppressHydrationWarning
                                  >
                                    {new Date(
                                      posadene.find(
                                        (p) => p.biljkaid === biljka.biljkaid
                                      )!.vrijemesadnje
                                    ).toLocaleDateString()}
                                  </TableCell>
                                );
                              } else {
                                return (
                                  <TableCell
                                    key={index}
                                    suppressHydrationWarning
                                  >
                                    {String(biljka[column as keyof Biljka])}
                                  </TableCell>
                                );
                              }
                            })}
                            <TableCell>
                              <Button
                                variant="outline"
                                onClick={() =>
                                  handleEdit(biljka.biljkaid, gredicaid)
                                }
                              >
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() =>
                                  handleDeletion(biljka.biljkaid, gredicaid)
                                }
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                {editBiljkaId !== null && editFormData && (
                  <CardContent>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold">Edit Biljka</h3>
                      <div className="mt-2">
                        <label className="block">
                          Količina:
                          <input
                            type="number"
                            name="kolicina"
                            value={editFormData.kolicina}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                          />
                        </label>
                      </div>
                      <div className="mt-2">
                        <label className="block">
                          Vrijeme Sadnje:
                          <input
                            type="date"
                            name="vrijemesadnje"
                            value={
                              editFormData.vrijemesadnje
                                ? new Date(editFormData.vrijemesadnje)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                          />
                        </label>
                      </div>
                      <div className="mt-4">
                        <Button variant="default" onClick={handleApply}>
                          Apply
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
                <CardFooter>
                  <div className="text-xs text-muted-foreground mt-4">
                    Showing <strong>1-{posadeneBiljke.length}</strong> of{" "}
                    <strong>{posadeneBiljke.length}</strong> products
                  </div>
                </CardFooter>
                <Button variant="default" onClick={() => setIsAdding(true)}>
                  Add Biljka
                </Button>
                {isAdding && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">Add Biljka</h3>
                    <div className="mt-2">
                      <label className="block">
                        Biljka:
                        <select
                          value={newBiljkaId ?? ""}
                          onChange={(e) =>
                            setNewBiljkaId(parseInt(e.target.value, 10))
                          }
                          className="w-full border rounded p-2"
                        >
                          <option value="" disabled>
                            Select a biljka
                          </option>
                          {biljke.map((biljka) => (
                            <option
                              key={biljka.biljkaid}
                              value={biljka.biljkaid}
                            >
                              {biljka.naziv}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <div className="mt-2">
                      <label className="block">
                        Količina:
                        <input
                          type="number"
                          value={newKolicina}
                          onChange={(e) =>
                            setNewKolicina(parseInt(e.target.value, 10))
                          }
                          className="w-full border rounded p-2"
                        />
                      </label>
                    </div>
                    <div className="mt-2">
                      <label className="block">
                        Vrijeme Sadnje:
                        <input
                          type="date"
                          value={newVrijemeSadnje}
                          onChange={(e) => setNewVrijemeSadnje(e.target.value)}
                          className="w-full border rounded p-2"
                        />
                      </label>
                    </div>
                    <div className="mt-4">
                      <Button variant="default" onClick={handleAddBiljka}>
                        Add
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsAdding(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};
