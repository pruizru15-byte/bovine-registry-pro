import { Beef, TrendingUp, Skull, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockCows } from "@/lib/mock-data";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

const stats = [
  {
    label: "Total Registrados",
    value: mockCows.length,
    icon: Beef,
    change: "+2 este mes",
  },
  {
    label: "Nacimientos",
    value: mockCows.filter(
      (c) => new Date(c.birthDate) > new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
    ).length,
    icon: TrendingUp,
    change: "Últimos 60 días",
  },
  {
    label: "Fallecimientos",
    value: mockCows.filter((c) => c.status === "Fallecido").length,
    icon: Skull,
    change: "Total histórico",
  },
  {
    label: "Registros Hoy",
    value: 0,
    icon: Calendar,
    change: new Date().toLocaleDateString("es-PE"),
  },
];

const Index = () => {
  const recentCows = [...mockCows].sort(
    (a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime()
  );

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Resumen general del Registro Civil de Ganado Vacuno
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="stat-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-2">{stat.change}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Records */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Registros Recientes</h2>
          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-mono text-xs">CÓDIGO</TableHead>
                  <TableHead>NOMBRE</TableHead>
                  <TableHead>RAZA</TableHead>
                  <TableHead>PROPIETARIO</TableHead>
                  <TableHead>ESTADO</TableHead>
                  <TableHead className="font-mono text-xs">FECHA REG.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCows.map((cow) => (
                  <TableRow key={cow.id} className="cursor-pointer hover:bg-muted/50">
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
                      <span className="text-muted-foreground text-xs ml-1">
                        "{cow.nickname}"
                      </span>
                    </TableCell>
                    <TableCell>{cow.breed}</TableCell>
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
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {new Date(cow.registeredAt).toLocaleDateString("es-PE")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
