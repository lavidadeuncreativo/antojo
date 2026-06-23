"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Correo o contraseña incorrectos. Intenta de nuevo.");
      setLoading(false);
      return;
    }

    router.push(next);
    router.refresh();
  }

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--color-cream)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{ width: "100%", maxWidth: 400 }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            style={{
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              fontWeight: 700,
              fontSize: 40,
              color: "var(--color-text)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            ANTOJO<span style={{ color: "var(--color-wine)" }}>.</span>
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "var(--color-text-muted)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginTop: 6,
            }}
          >
            OS
          </div>
        </div>

        {/* Card */}
        <div className="card" style={{ padding: 32 }}>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 600,
              marginBottom: 6,
              color: "var(--color-text)",
            }}
          >
            Bienvenido de vuelta
          </h1>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", marginBottom: 28 }}>
            Ingresa a tu cuenta para continuar.
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 14px",
                background: "var(--color-error-bg)",
                border: "1px solid rgba(168,66,66,0.2)",
                borderRadius: "var(--radius-md)",
                fontSize: 14,
                color: "var(--color-error)",
                marginBottom: 20,
              }}
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="form-group">
              <label htmlFor="email" className="label">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                className="input-base"
                placeholder="hola@antojo.mx"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="label">
                Contraseña
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="input-base"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  style={{ paddingRight: 44 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--color-text-muted)",
                    padding: 4,
                  }}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: "100%", justifyContent: "center", marginTop: 8, height: 44 }}
            >
              {loading ? (
                <span style={{ opacity: 0.7 }}>Ingresando…</span>
              ) : (
                <>
                  <LogIn size={16} />
                  Ingresar
                </>
              )}
            </button>
          </form>
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "var(--color-text-muted)",
            marginTop: 24,
          }}
        >
          ANTOJO OS — Centro operativo
        </p>
      </motion.div>
    </div>
  );
}
