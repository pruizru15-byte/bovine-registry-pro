import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, Search } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ownersApi } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

const PropietariosPage = () => {
  const [search, setSearch] = useState("");

  const { data: owners = [], isLoading } = useQuery({
    queryKey: ["owners"],
    queryFn: ownersApi.getAll,
  });

  const filtered = owners.filter(
    (o) =>
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.document.includes(search)
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Propietarios
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gestión de dueños vinculados al registro
          </p>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o documento..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-mono text-xs">ID</TableHead>
                <TableHead>NOMBRE</TableHead>
                <TableHead>DOCUMENTO</TableHead>
                <TableHead>TELÉFONO</TableHead>
                <TableHead>DIRECCIÓN</TableHead>
                <TableHead className="text-center">GANADO</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <TableCell key={j}><Skeleton className="h-4 w-full" /></TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                filtered.map((owner) => (
                  <TableRow key={owner.id}>
                    <TableCell className="font-mono text-sm text-primary">
                      {owner.id}
                    </TableCell>
                    <TableCell className="font-medium">{owner.name}</TableCell>
                    <TableCell className="font-mono text-sm">{owner.document}</TableCell>
                    <TableCell className="text-sm">{owner.phone}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                      {owner.address}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{owner.cattleCount}</Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
              {!isLoading && filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No se encontraron propietarios
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

export default PropietariosPage;
