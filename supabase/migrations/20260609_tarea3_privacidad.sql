-- TAREA 3: Privacidad — datos del técnico fuera de propuestas
-- Ejecutar en el SQL Editor de Supabase Dashboard

-- 1. Tabla de perfiles profesionales (sin DNI)
CREATE TABLE IF NOT EXISTS perfiles_profesionales (
  user_id    uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre     text,
  telefono   text,
  email      text,
  rubro      text,
  zona       text,
  verificado boolean DEFAULT false,
  creado_at  timestamptz DEFAULT now()
);

-- 2. Tabla de verificaciones (DNI separado, solo legible por el dueño)
CREATE TABLE IF NOT EXISTS verificaciones (
  user_id   uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  dni       text,
  creado_at timestamptz DEFAULT now()
);

-- 3. RLS perfiles_profesionales
ALTER TABLE perfiles_profesionales ENABLE ROW LEVEL SECURITY;

-- El dueño puede leer y editar su propio perfil
CREATE POLICY "perfil_owner" ON perfiles_profesionales
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Un usuario puede leer telefono/email si tiene una propuesta aceptada/completada con ese profesional
CREATE POLICY "perfil_contacto_si_aceptado" ON perfiles_profesionales
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM propuestas p
      JOIN publicaciones pub ON pub.id = p.publicacion_id::uuid
      WHERE p.profesional_id = perfiles_profesionales.user_id
        AND pub.user_id = auth.uid()
        AND p.estado IN ('aceptada', 'completada')
    )
  );

-- 4. RLS verificaciones (solo el dueño)
ALTER TABLE verificaciones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "verificaciones_owner" ON verificaciones
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 5. Trigger: auto-crear perfil cuando se registra un profesional
CREATE OR REPLACE FUNCTION crear_perfil_al_registrarse()
RETURNS TRIGGER AS $$
BEGIN
  IF (NEW.raw_user_meta_data->>'es_profesional')::boolean = true THEN
    INSERT INTO perfiles_profesionales (user_id, nombre, telefono, email, rubro, zona)
    VALUES (
      NEW.id,
      TRIM(COALESCE(NEW.raw_user_meta_data->>'nombre','') || ' ' || COALESCE(NEW.raw_user_meta_data->>'apellido','')),
      NEW.raw_user_meta_data->>'telefono',
      NEW.email,
      NEW.raw_user_meta_data->>'categoria',
      NEW.raw_user_meta_data->>'zona'
    )
    ON CONFLICT (user_id) DO NOTHING;

    IF (NEW.raw_user_meta_data->>'dni') IS NOT NULL AND (NEW.raw_user_meta_data->>'dni') != '' THEN
      INSERT INTO verificaciones (user_id, dni)
      VALUES (NEW.id, NEW.raw_user_meta_data->>'dni')
      ON CONFLICT (user_id) DO NOTHING;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION crear_perfil_al_registrarse();

-- 6. Backfill: poblar perfiles desde user_metadata existente
INSERT INTO perfiles_profesionales (user_id, nombre, telefono, email, rubro, zona)
SELECT
  u.id,
  TRIM(COALESCE(u.raw_user_meta_data->>'nombre','') || ' ' || COALESCE(u.raw_user_meta_data->>'apellido','')),
  u.raw_user_meta_data->>'telefono',
  u.email,
  u.raw_user_meta_data->>'categoria',
  u.raw_user_meta_data->>'zona'
FROM auth.users u
WHERE (u.raw_user_meta_data->>'es_profesional')::boolean = true
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO verificaciones (user_id, dni)
SELECT u.id, u.raw_user_meta_data->>'dni'
FROM auth.users u
WHERE (u.raw_user_meta_data->>'es_profesional')::boolean = true
  AND u.raw_user_meta_data->>'dni' IS NOT NULL
  AND u.raw_user_meta_data->>'dni' != ''
ON CONFLICT (user_id) DO NOTHING;
