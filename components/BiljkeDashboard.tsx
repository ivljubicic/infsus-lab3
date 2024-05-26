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
import { deletePosadena, updatePosadena } from "@/model/gredicaModel";

interface DashboardProps {
  biljke: Biljka[];
  posadene: Posadena[];
  gredicaid: number;
}

export const Dashboard: React.FC<DashboardProps> = ({
  biljke: initialBiljke,
  posadene: initialPosadene,
  gredicaid,
}) => {
  const [biljke, setBiljke] = useState(initialBiljke);
  const [posadene, setPosadene] = useState(initialPosadene);
  const [editBiljkaId, setEditBiljkaId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Posadena | null>(null);

  function handleDeletion(biljkaid: number, gredicaid: number) {
    deletePosadena(gredicaid, biljkaid).then(() => {
      setBiljke((prevBiljke) =>
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
                  <CardTitle>Biljke</CardTitle>
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
                      {biljke.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length}
                            className="text-center"
                          >
                            No data available
                          </TableCell>
                        </TableRow>
                      ) : (
                        biljke.map((biljka) => (
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
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-{biljke.length}</strong> of{" "}
                    <strong>{biljke.length}</strong> products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};
