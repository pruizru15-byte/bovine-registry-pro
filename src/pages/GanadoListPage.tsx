import { mockCows } from "@/lib/mock-data";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Beef, Search } from "lucide-react";
import { useState } from "react";

const GanadoListPage = () => {
  const [search, setSearch] = useState("");

  const filtered = mockCows.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.tagCode.toLowerCase().includes(search.toLowerCase()) ||
      c.owner.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Beef className="h-6 w-6 text-primary" />
              Ganado Registrado
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {mockCows.length} registros en el sistema
            </p>
          </div>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, código o dueño..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-mono text-xs">DNI VACUNO</TableHead>
                <TableHead>NOMBRE</TableHead>
                <TableHead>RAZA</TableHead>
                <TableHead>SEXO</TableHead>
                <TableHead>PROPIETARIO</TableHead>
                <TableHead>ESTADO</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((cow) => (
                <TableRow key={cow.id}>
                  <TableCell>
                    <Link
                      to={`/ganado/${cow.id}`}
                      className="font-mono text-sm text-primary hover:underline"
                    >
                      {cow.tagCode}
                    </Link>
                  </TableCell>
                  <TableCell className="font-medium">
                    {cow.name}
                    {cow.nickname && (
                      <span className="text-muted-foreground text-xs ml-1">
                        "{cow.nickname}"
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{cow.breed}</TableCell>
                  <TableCell>{cow.sex}</TableCell>
                  <TableCell>{cow.owner}</TableCell>
                  <TableCell>
                    <Badge
                      variant={cow.status === "Activo" ? "default" : "destructive"}
                      className={
                        cow.status === "Activo"
                          ? "bg-primary/10 text-primary hover:bg-primary/20 border-0"
                          : ""
                      }
                    >
                      {cow.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No se encontraron registros
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default GanadoListPage;
