import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Check, ChevronLeft, ChevronRight, Upload, User, Fingerprint, Users } from "lucide-react";
import { mockOwners } from "@/lib/mock-data";

const steps = [
  { id: 1, title: "Datos Personales", icon: User },
  { id: 2, title: "Identidad", icon: Fingerprint },
  { id: 3, title: "Filiación", icon: Users },
];

const breeds = ["Holstein", "Brown Swiss", "Jersey", "Brahman", "Angus", "Simmental", "Hereford", "Charolais", "Gyr", "Nelore"];

const RegistroPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    nickname: "",
    breed: "",
    sex: "",
    color: "",
    weight: "",
    tagCode: "",
    birthDate: "",
    birthPlace: "",
    observations: "",
    ownerId: "",
    photo: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!form.name.trim()) newErrors.name = "Nombre es requerido";
      if (!form.breed) newErrors.breed = "Raza es requerida";
      if (!form.sex) newErrors.sex = "Sexo es requerido";
    } else if (step === 2) {
      if (!form.tagCode.trim()) newErrors.tagCode = "Código de arete es requerido";
      if (!form.birthDate) newErrors.birthDate = "Fecha de nacimiento es requerida";
    } else if (step === 3) {
      if (!form.ownerId) newErrors.ownerId = "Propietario es requerido";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      toast.success("Registro exitoso", {
        description: `${form.name} ha sido registrado en el sistema.`,
      });
      navigate("/");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Nuevo Registro</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Registrar nuevo ganado en el sistema civil
          </p>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-2">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex items-center gap-2 flex-1">
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 text-sm font-medium transition-colors ${
                    currentStep > step.id
                      ? "bg-primary text-primary-foreground"
                      : currentStep === step.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
                </div>
                <span
                  className={`text-sm hidden sm:block ${
                    currentStep >= step.id ? "font-medium" : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`h-px flex-1 mx-2 ${
                    currentStep > step.id ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <Card className="p-6">
          {/* Step 1: Datos Personales */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Datos Personales
              </h2>

              {/* Photo Upload */}
              <div className="flex justify-center">
                <label className="cursor-pointer group">
                  <div className="h-32 w-32 rounded-xl border-2 border-dashed border-border group-hover:border-primary transition-colors flex flex-col items-center justify-center overflow-hidden bg-muted/50">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="h-full w-full object-cover" />
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-xs text-muted-foreground mt-1">Subir foto</span>
                      </>
                    )}
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre *</Label>
                  <Input
                    id="name"
                    placeholder="Ej: Esperanza"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nickname">Apodo</Label>
                  <Input
                    id="nickname"
                    placeholder='Ej: "La Reina"'
                    value={form.nickname}
                    onChange={(e) => updateField("nickname", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Raza *</Label>
                  <Select value={form.breed} onValueChange={(v) => updateField("breed", v)}>
                    <SelectTrigger className={errors.breed ? "border-destructive" : ""}>
                      <SelectValue placeholder="Seleccionar raza" />
                    </SelectTrigger>
                    <SelectContent>
                      {breeds.map((b) => (
                        <SelectItem key={b} value={b}>{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.breed && <p className="text-xs text-destructive">{errors.breed}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Sexo *</Label>
                  <Select value={form.sex} onValueChange={(v) => updateField("sex", v)}>
                    <SelectTrigger className={errors.sex ? "border-destructive" : ""}>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hembra">Hembra</SelectItem>
                      <SelectItem value="Macho">Macho</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.sex && <p className="text-xs text-destructive">{errors.sex}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    placeholder="Ej: Blanco y Negro"
                    value={form.color}
                    onChange={(e) => updateField("color", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso</Label>
                  <Input
                    id="weight"
                    placeholder="Ej: 520 kg"
                    value={form.weight}
                    onChange={(e) => updateField("weight", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Identidad */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Fingerprint className="h-5 w-5 text-primary" />
                Datos de Identidad
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tagCode">Código de Arete / DNI *</Label>
                  <Input
                    id="tagCode"
                    placeholder="DNI-VAC-00000000"
                    value={form.tagCode}
                    onChange={(e) => updateField("tagCode", e.target.value)}
                    className={`font-mono ${errors.tagCode ? "border-destructive" : ""}`}
                  />
                  {errors.tagCode && <p className="text-xs text-destructive">{errors.tagCode}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Fecha de Nacimiento *</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={form.birthDate}
                    onChange={(e) => updateField("birthDate", e.target.value)}
                    className={errors.birthDate ? "border-destructive" : ""}
                  />
                  {errors.birthDate && <p className="text-xs text-destructive">{errors.birthDate}</p>}
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="birthPlace">Lugar de Nacimiento</Label>
                  <Input
                    id="birthPlace"
                    placeholder="Ej: Fundo La Esperanza, Cajamarca"
                    value={form.birthPlace}
                    onChange={(e) => updateField("birthPlace", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Filiación */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Datos de Filiación
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Propietario *</Label>
                  <Select value={form.ownerId} onValueChange={(v) => updateField("ownerId", v)}>
                    <SelectTrigger className={errors.ownerId ? "border-destructive" : ""}>
                      <SelectValue placeholder="Seleccionar propietario" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockOwners.map((o) => (
                        <SelectItem key={o.id} value={o.id}>
                          {o.name} — {o.document}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.ownerId && <p className="text-xs text-destructive">{errors.ownerId}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="observations">Observaciones</Label>
                  <Textarea
                    id="observations"
                    placeholder="Notas adicionales sobre el registro..."
                    value={form.observations}
                    onChange={(e) => updateField("observations", e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Anterior
            </Button>
            {currentStep < 3 ? (
              <Button onClick={handleNext}>
                Siguiente
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                <Check className="h-4 w-4 mr-1" />
                Registrar
              </Button>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RegistroPage;
