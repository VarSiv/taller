-- TAREA 2: Tabla disputas + estado en_disputa
-- Ejecutar en el SQL Editor de Supabase Dashboard

CREATE TABLE IF NOT EXISTS disputas (
  id             uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  propuesta_id   uuid REFERENCES propuestas(id) ON DELETE CASCADE,
  publicacion_id uuid REFERENCES publicaciones(id) ON DELETE CASCADE,
  autor_id       uuid REFERENCES auth.users(id),
  rol            text CHECK (rol IN ('demandante', 'oferente')),
  motivo         text NOT NULL,
  estado         text DEFAULT 'abierta' CHECK (estado IN ('abierta', 'resuelta')),
  creado_at      timestamptz DEFAULT now()
);

-- RLS: cada parte solo ve sus propias disputas
ALTER TABLE disputas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "disputas_insert" ON disputas
  FOR INSERT WITH CHECK (auth.uid() = autor_id);

CREATE POLICY "disputas_select_own" ON disputas
  FOR SELECT USING (auth.uid() = autor_id);

-- Nuevo valor para publicaciones.status: 'en_disputa' (columna text, sin restricción enum)
