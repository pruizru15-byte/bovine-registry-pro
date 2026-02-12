import { useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { mockCows, mockOwners } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Download,
  Skull,
  Baby,
  CreditCard,
  ArrowLeft,
  Beef,
  QrCode,
} from "lucide-react";
import { toast } from "sonner";

const CowProfilePage = () => {
  const { id } = useParams();
  const cow = mockCows.find((c) => c.id === id);

  if (!cow) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
          <Beef className="h-12 w-12 mb-4" />
          <p>Registro no encontrado</p>
          <Link to="/ganado" className="text-primary hover:underline mt-2 text-sm">
            Volver a la lista
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const owner = mockOwners.find((o) => o.id === cow.ownerId);

  const handleExport = (type: string) => {
    toast.success(`Documento generado`, {
      description: `${type} de ${cow.name} descargado exitosamente.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <Link
          to="/ganado"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a la lista
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Photo & Status */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="aspect-square bg-muted flex items-center justify-center">
                <Beef className="h-20 w-20 text-muted-foreground/30" />
              </div>
              <div className="p-4 text-center">
                <h2 className="text-xl font-bold">{cow.name}</h2>
                <p className="text-sm text-muted-foreground">"{cow.nickname}"</p>
                <Badge
                  variant={cow.status === "Activo" ? "default" : "destructive"}
                  className={`mt-2 ${
                    cow.status === "Activo"
                      ? "bg-primary/10 text-primary hover:bg-primary/20 border-0"
                      : ""
                  }`}
                >
                  {cow.status}
                </Badge>
              </div>
            </Card>

            {/* Document Actions */}
            <Card className="p-4 space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Documentos
              </h3>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleExport("Partida de Nacimiento")}
              >
                <Baby className="h-4 w-4 mr-2 text-primary" />
                Partida de Nacimiento
              </Button>
              {cow.status === "Fallecido" && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleExport("Acta de Defunción")}
                >
                  <Skull className="h-4 w-4 mr-2 text-destructive" />
                  Acta de Defunción
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleExport("DNI Vacuno")}
              >
                <CreditCard className="h-4 w-4 mr-2 text-primary" />
                Descargar DNI
              </Button>
            </Card>
          </div>

          {/* Right: Details & DNI Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Details */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Información del Registro</h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <div>
                  <p className="text-muted-foreground">Código de Registro</p>
                  <p className="font-mono font-medium">{cow.id}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">DNI Vacuno</p>
                  <p className="font-mono font-medium">{cow.tagCode}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Raza</p>
                  <p className="font-medium">{cow.breed}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Sexo</p>
                  <p className="font-medium">{cow.sex}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Color</p>
                  <p className="font-medium">{cow.color}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Peso</p>
                  <p className="font-medium">{cow.weight}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Fecha de Nacimiento</p>
                  <p className="font-medium">
                    {new Date(cow.birthDate).toLocaleDateString("es-PE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                {cow.deathDate && (
                  <div>
                    <p className="text-muted-foreground">Fecha de Defunción</p>
                    <p className="font-medium text-destructive">
                      {new Date(cow.deathDate).toLocaleDateString("es-PE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-muted-foreground">Propietario</p>
                  <p className="font-medium">{cow.owner}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Fecha de Registro</p>
                  <p className="font-mono text-xs">
                    {new Date(cow.registeredAt).toLocaleDateString("es-PE")}
                  </p>
                </div>
              </div>
            </Card>

            {/* DNI Card */}
            <div>
              <h3 className="text-lg font-semibold mb-3">DNI Vacuno</h3>
              <div className="dni-card max-w-md">
                {/* Header */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                    <Beef className="h-3.5 w-3.5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold leading-none">
                      República Ganadera
                    </p>
                    <p className="text-[8px] font-mono text-muted-foreground uppercase tracking-wider">
                      Documento Nacional de Identidad Vacuna
                    </p>
                  </div>
                </div>

                <Separator className="mb-3" />

                <div className="flex gap-4">
                  {/* Photo */}
                  <div className="shrink-0">
                    <div className="h-24 w-20 rounded border bg-muted flex items-center justify-center">
                      <Beef className="h-8 w-8 text-muted-foreground/40" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 space-y-1 text-xs">
                    <div>
                      <span className="text-muted-foreground text-[10px]">NOMBRES</span>
                      <p className="font-bold">{cow.name} "{cow.nickname}"</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-[10px]">RAZA</span>
                      <p className="font-medium">{cow.breed}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-[10px]">NACIMIENTO</span>
                      <p className="font-mono text-[11px]">
                        {new Date(cow.birthDate).toLocaleDateString("es-PE")}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-[10px]">PROPIETARIO</span>
                      <p className="font-medium">{cow.owner}</p>
                    </div>
                  </div>

                  {/* QR */}
                  <div className="shrink-0 flex flex-col items-center gap-1">
                    <div className="h-16 w-16 rounded border bg-muted flex items-center justify-center">
                      <QrCode className="h-10 w-10 text-foreground/80" />
                    </div>
                  </div>
                </div>

                <Separator className="my-3" />

                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs font-bold text-primary">{cow.tagCode}</p>
                  <Badge
                    variant={cow.status === "Activo" ? "default" : "destructive"}
                    className={`text-[10px] ${
                      cow.status === "Activo"
                        ? "bg-primary/10 text-primary hover:bg-primary/20 border-0"
                        : ""
                    }`}
                  >
                    {cow.status}
                  </Badge>
                </div>

                {/* Decorative stamp */}
                <div className="official-stamp">
                  <Beef className="h-24 w-24" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CowProfilePage;
