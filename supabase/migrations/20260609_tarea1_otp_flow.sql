-- TAREA 1: Flujo OTP corregido
-- Ejecutar en el SQL Editor de Supabase Dashboard

-- 1. Columna para registrar cuándo el técnico confirmó el código
ALTER TABLE propuestas ADD COLUMN IF NOT EXISTS codigo_ingresado_at timestamptz;

-- 2. Columnas de timestamps para auditoría (activo desde hoy, dataset gratuito a futuro)
ALTER TABLE propuestas    ADD COLUMN IF NOT EXISTS aceptada_at   timestamptz;
ALTER TABLE publicaciones ADD COLUMN IF NOT EXISTS cerrada_at    timestamptz;

-- Nuevos valores de estado que se usan en código (columnas son text, sin restricción enum):
-- propuestas.estado:    'completada'   (trabajo confirmado por ambas partes)
-- publicaciones.status: 'en_curso'     (propuesta aceptada, trabajo en progreso)
--                        'cerrado'      (código confirmado, trabajo finalizado)
