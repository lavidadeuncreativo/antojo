"use client";

import { Calendar as CalendarIcon, Clock } from "lucide-react";

export default function CalendarPage() {
  const schedule = [
    { time: "09:00 AM", task: "Reunión Equipo Comercial", type: "Interno" },
    { time: "11:30 AM", task: "Entrega Barriles Cold Brew", type: "Logística" },
    { time: "14:00 PM", task: "Cata de Nuevos Sabores", type: "Producto" },
    { time: "16:00 PM", task: "Revisión de Inventario Semanal", type: "Operaciones" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 select-none text-left pt-6">
      <div className="border-b border-[#E5E5E5] pb-8">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-black uppercase" style={{ letterSpacing: "-0.04em" }}>
          CALENDARIO
        </h1>
        <p className="text-sm text-black/60 mt-4 uppercase tracking-widest font-medium">
          Agenda y Programación
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/3">
          <div className="p-8 border border-[#E5E5E5]">
            <h2 className="text-sm font-bold uppercase tracking-widest text-black mb-6">Julio 2026</h2>
            {/* Simple mock calendar grid */}
            <div className="grid grid-cols-7 gap-y-4 text-center text-xs mb-2 text-[#999999] font-bold">
              <div>L</div><div>M</div><div>M</div><div>J</div><div>V</div><div>S</div><div>D</div>
            </div>
            <div className="grid grid-cols-7 gap-y-4 text-center text-sm">
              <div className="text-[#E5E5E5]">29</div><div className="text-[#E5E5E5]">30</div>
              <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div>
              <div>6</div><div>7</div><div>8</div><div>9</div><div>10</div><div>11</div><div>12</div>
              <div>13</div><div>14</div><div>15</div><div>16</div><div>17</div><div>18</div><div>19</div>
              <div>20</div><div>21</div><div>22</div><div className="bg-black text-white w-7 h-7 mx-auto rounded-full flex items-center justify-center font-bold">23</div><div>24</div><div>25</div><div>26</div>
              <div>27</div><div>28</div><div>29</div><div>30</div><div>31</div><div className="text-[#E5E5E5]">1</div><div className="text-[#E5E5E5]">2</div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3 space-y-0">
          <h2 className="text-xs font-bold text-[#999999] uppercase tracking-widest border-b border-black pb-4 mb-4">Agenda del Día</h2>
          
          {schedule.map((item, idx) => (
            <div key={idx} className="flex gap-6 py-6 border-b border-[#E5E5E5] group cursor-pointer hover:pl-2 transition-all">
              <div className="text-sm font-bold text-[#999999] w-20 flex-shrink-0 pt-1">
                {item.time}
              </div>
              <div>
                <div className="text-xl font-bold text-black mb-1">{item.task}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#999999]">{item.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
