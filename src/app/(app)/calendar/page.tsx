"use client";

import { Calendar as CalendarIcon, Clock } from "lucide-react";

export default function CalendarPage() {
  const schedule: any[] = [];

  return (
    <div className="max-w-4xl mx-auto space-y-12 select-none text-left pt-6">
      <div className="pt-14 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--color-border)]">
        <div>
          <span className="label-micro block mb-3">Agenda y Programación</span>
          <h1 className="hero-title">
            CALENDARIO <span className="italic-light">diario.</span>
          </h1>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/3">
          <div className="card">
            <h2 className="section-title border-none mb-6">Julio 2026</h2>
            {/* Simple mock calendar grid */}
            <div className="grid grid-cols-7 gap-y-4 text-center text-[10px] mb-2 text-[var(--color-text-muted)] font-extrabold uppercase tracking-widest">
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
          <h2 className="section-title border-b border-[var(--color-border)] pb-4 mb-4">Agenda del Día</h2>
          
          {schedule.length === 0 ? (
            <div className="empty-state border-0">
              <CalendarIcon size={32} className="empty-state__icon" strokeWidth={1.5} />
              <span className="empty-state__label">Sin eventos para hoy</span>
            </div>
          ) : (
            schedule.map((item, idx) => (
              <div key={idx} className="flex gap-6 py-6 border-b border-[var(--color-border)] group cursor-pointer hover:pl-2 transition-all">
                <div className="text-sm font-bold text-[var(--color-text-muted)] w-20 flex-shrink-0 pt-1">
                  {item.time}
                </div>
                <div>
                  <div className="text-xl font-bold text-black mb-1">{item.task}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">{item.type}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
