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
import { deletePosadena } from "@/model/gredicaModel";

interface DashboardProps {
  biljke: Biljka[];
  posadene: Posadena[];
  gredicaid: number;
}

export const Dashboard: React.FC<DashboardProps> = ({
  biljke: initialBiljke,
  posadene,
  gredicaid,
}) => {
  const [biljke, setBiljke] = useState(initialBiljke);

  function handleDeletion(biljkaid: number, gredicaid: number) {
    deletePosadena(gredicaid, biljkaid).then(() => {
      setBiljke((prevBiljke) =>
        prevBiljke.filter((biljka) => biljka.biljkaid !== biljkaid)
      );
    });
  }

  function handleEdit(biljkaid: number, gredicaid: number) {}

  const columns = [
    "naziv",
    "kolicina",
    "osuncanje",
    "vlaznost",
    "phtla",
    "vrijemebranja",
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
                              } else {
                                return (
                                  <TableCell
                                    key={index}
                                    suppressHydrationWarning
                                  >
                                    {String(biljka[column])}
                                  </TableCell>
                                );
                              }
                            })}
                            <TableCell>
                              <Button variant="outline">Edit</Button>
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
