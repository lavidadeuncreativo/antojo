"use client";

import { Download } from "lucide-react";

export default function ReportsPage() {
  const reports: any[] = [];

  return (
    <div className="max-w-4xl mx-auto space-y-12 select-none text-left pt-6">
      <div className="pt-14 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--color-border)]">
        <div>
          <span className="label-micro block mb-3">Documentos y Cierres</span>
          <h1 className="hero-title">
            REPORTES <span className="italic-light">generados.</span>
          </h1>
        </div>
        <button className="btn btn-primary w-fit md:self-end">
          Generar Reporte
        </button>
      </div>

      <div className="table-container">
        <table className="antojo-table">
          <thead>
            <tr>
              <th>Documento</th>
              <th>Categoría</th>
              <th className="text-right">Fecha</th>
              <th className="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: 0, border: 'none' }}>
                  <div className="empty-state border-0 border-b border-[var(--color-border)]">
                    <Download size={32} className="empty-state__icon" strokeWidth={1.5} />
                    <span className="empty-state__label">Sin reportes</span>
                    <p className="empty-state__text">Aún no hay reportes generados.</p>
                  </div>
                </td>
              </tr>
            ) : (
              reports.map((report, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="text-base font-bold text-black">{report.title}</div>
                    <div className="text-[10px] text-[var(--color-text-secondary)] font-bold uppercase tracking-widest mt-1">{report.size} • PDF</div>
                  </td>
                  <td>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black bg-[var(--color-surface)] px-2 py-1">
                      {report.type}
                    </span>
                  </td>
                  <td className="text-right font-bold text-[var(--color-text-secondary)] text-sm">
                    {report.date}
                  </td>
                  <td className="text-right">
                    <button className="btn-icon btn-ghost ml-auto">
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
