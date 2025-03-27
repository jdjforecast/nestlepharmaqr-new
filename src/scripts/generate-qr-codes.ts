import { createClient } from '@supabase/supabase-js';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Variables de entorno faltantes');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function generateQRCodes() {
  try {
    // Obtener todos los productos
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name');

    if (error) {
      console.error('Error obteniendo productos:', error);
      return;
    }

    if (!products || products.length === 0) {
      console.log('No se encontraron productos');
      return;
    }

    console.log(`Encontrados ${products.length} productos`);

    // Crear directorio para los códigos QR si no existe
    const qrDir = path.join(process.cwd(), 'public', 'qr-codes');
    if (!fs.existsSync(qrDir)) {
      fs.mkdirSync(qrDir, { recursive: true });
    }

    // Generar QR para cada producto
    for (const product of products) {
      // Usar ruta relativa en lugar de URL absoluta
      const productPath = `/productos/${product.id}`;
      const qrPath = path.join(qrDir, `${product.id}.png`);

      try {
        // Generar el código QR
        await QRCode.toFile(qrPath, productPath, {
          width: 400,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
        });

        // Actualizar el producto con la URL del QR
        const qrUrl = `/qr-codes/${product.id}.png`;
        const { error: updateError } = await supabase
          .from('products')
          .update({ qr_code_url: qrUrl })
          .eq('id', product.id);

        if (updateError) {
          console.error(`Error actualizando QR para ${product.name}:`, updateError);
        } else {
          console.log(`✓ QR generado para ${product.name}`);
        }
      } catch (err) {
        console.error(`Error generando QR para ${product.name}:`, err);
      }
    }

    console.log('\nProceso completado exitosamente');
  } catch (error) {
    console.error('Error general:', error);
  }
}

// Ejecutar el script
generateQRCodes(); 