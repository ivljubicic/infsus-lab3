"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MoreHorizontal, PlusCircle, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Gredica, Lokacija } from "@/types/database";

interface DashboardProps {
  gredice: Gredica[];
  lokacije: Lokacija[];
  columns: string[];
}

export const Dashboard: React.FC<DashboardProps> = ({
  gredice,
  lokacije,
  columns,
}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Gredica[]>(gredice);
  useEffect(() => {
    const filtered = gredice.filter((gredica: Gredica) =>
      columns.some((key) =>
        gredica[key as keyof Gredica]
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchTerm, gredice, columns]);

  const handleRowClick = (id: number) => {
    router.push(`/gredica/${id}`);
  };

  // const handleAddPlant = () => {
  //   router.push("/biljka/add");
  // };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            {/* <div className="flex items-center">
              <div className="ml-auto flex items-center gap-2">
                <Button
                  size="sm"
                  className="h-7 gap-1"
                  onClick={handleAddPlant}
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Plant
                  </span>
                </Button>
              </div>
            </div> */}
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Gredice</CardTitle>
                  <CardDescription>Pregled tvojih gredica.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {columns.includes("image_url") && (
                          <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                          </TableHead>
                        )}
                        {columns.map((column, index) => {
                          if (column === "lokacijaid") {
                            return (
                              <TableHead key={"lokacija"}>Lokacija</TableHead>
                            );
                          } else {
                            return (
                              <TableHead key={index}>
                                {column.charAt(0).toUpperCase() +
                                  column.slice(1)}
                              </TableHead>
                            );
                          }
                        })}
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length + 1}
                            className="text-center"
                          >
                            No data available
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredData.map((gredica) => (
                          <TableRow
                            key={gredica.gredicaid}
                            onClick={() => handleRowClick(gredica.gredicaid)}
                            className="cursor-pointer hover:bg-gray-200"
                          >
                            {columns.map((column, index) => {
                              if (column === "lokacijaid") {
                                return (
                                  <TableCell key={"lokacija"}>
                                    {lokacije[gredica.lokacijaid].ime}
                                  </TableCell>
                                );
                              } else {
                                return (
                                  <TableCell key={index}>
                                    {String(gredica[column as keyof Gredica])}
                                  </TableCell>
                                );
                              }
                            })}
                            {/* <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell> */}
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-{filteredData.length}</strong> of{" "}
                    <strong>{gredice.length}</strong> products
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
