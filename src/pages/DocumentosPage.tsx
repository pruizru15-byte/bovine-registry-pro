import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Baby, Skull, CreditCard, FileText, Download } from "lucide-react";
import { mockCows } from "@/lib/mock-data";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const DocumentosPage = () => {
  const handleExport = (cowName: string, docType: string) => {
    toast.success(`${docType} generado`, {
      description: `Documento de ${cowName} listo para descarga.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Documentación
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Genera y descarga documentos oficiales para cada registro
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockCows.map((cow) => (
            <Card key={cow.id} className="p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{cow.name}</h3>
                  <p className="text-xs text-muted-foreground font-mono">{cow.tagCode}</p>
                </div>
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
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-xs"
                  onClick={() => handleExport(cow.name, "Partida de Nacimiento")}
                >
                  <Baby className="h-3.5 w-3.5 mr-2 text-primary" />
                  Partida de Nacimiento
                  <Download className="h-3 w-3 ml-auto text-muted-foreground" />
                </Button>
                {cow.status === "Fallecido" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs"
                    onClick={() => handleExport(cow.name, "Acta de Defunción")}
                  >
                    <Skull className="h-3.5 w-3.5 mr-2 text-destructive" />
                    Acta de Defunción
                    <Download className="h-3 w-3 ml-auto text-muted-foreground" />
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-xs"
                  onClick={() => handleExport(cow.name, "DNI Vacuno")}
                >
                  <CreditCard className="h-3.5 w-3.5 mr-2 text-primary" />
                  Descargar DNI
                  <Download className="h-3 w-3 ml-auto text-muted-foreground" />
                </Button>
              </div>
              <Link
                to={`/ganado/${cow.id}`}
                className="text-xs text-primary hover:underline block text-center"
              >
                Ver perfil completo →
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DocumentosPage;
