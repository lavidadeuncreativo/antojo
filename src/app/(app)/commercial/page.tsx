import { Construction } from "lucide-react";

export default function ComercialPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-6">
        <Construction className="w-8 h-8 text-wine" />
      </div>
      <h1 className="text-2xl font-semibold mb-3">Módulo de Comercial</h1>
      <p className="text-text-secondary max-w-md">
        Este módulo se encuentra en construcción y será desarrollado en las próximas fases del proyecto ANTOJO OS.
      </p>
    </div>
  );
}
