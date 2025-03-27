-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Políticas para la tabla users
CREATE POLICY "Usuarios pueden ver sus propios datos"
ON users FOR SELECT
TO authenticated
USING (clerk_id::text = auth.uid()::text);

CREATE POLICY "Usuarios pueden actualizar sus propios datos"
ON users FOR UPDATE
TO authenticated
USING (clerk_id::text = auth.uid()::text);

-- Políticas para la tabla products
CREATE POLICY "Cualquiera puede ver productos"
ON products FOR SELECT
TO public
USING (true);

CREATE POLICY "Solo administradores pueden crear/actualizar productos"
ON products FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Solo administradores pueden actualizar productos"
ON products FOR UPDATE
TO authenticated
USING (true);

-- Políticas para la tabla cart_items
CREATE POLICY "Usuarios pueden ver sus propios items del carrito"
ON cart_items FOR SELECT
TO authenticated
USING (user_id IN (SELECT id FROM users WHERE clerk_id::text = auth.uid()::text));

CREATE POLICY "Usuarios pueden agregar items a su carrito"
ON cart_items FOR INSERT
TO authenticated
WITH CHECK (user_id IN (SELECT id FROM users WHERE clerk_id::text = auth.uid()::text));

CREATE POLICY "Usuarios pueden eliminar items de su carrito"
ON cart_items FOR DELETE
TO authenticated
USING (user_id IN (SELECT id FROM users WHERE clerk_id::text = auth.uid()::text)); 