import { createClient } from '@supabase/supabase-js';
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

async function updateProductImages() {
  try {
    // Obtener todos los productos
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, name');

    if (productsError) {
      console.error('Error obteniendo productos:', productsError);
      return;
    }

    if (!products || products.length === 0) {
      console.log('No se encontraron productos');
      return;
    }

    console.log(`Encontrados ${products.length} productos`);

    // Obtener lista de archivos en el bucket
    const { data: files, error: storageError } = await supabase
      .storage
      .from('products')
      .list();

    if (storageError) {
      console.error('Error obteniendo archivos:', storageError);
      return;
    }

    if (!files || files.length === 0) {
      console.log('No se encontraron imágenes en el bucket');
      return;
    }

    console.log(`Encontradas ${files.length} imágenes`);

    // Actualizar cada producto
    for (const product of products) {
      // Buscar una imagen que coincida con el nombre del producto
      const matchingFile = files.find(file => {
        const fileName = file.name.toLowerCase();
        const productName = product.name.toLowerCase();
        return fileName.includes(productName) || productName.includes(fileName.split('.')[0]);
      });

      if (matchingFile) {
        // Obtener URL pública de la imagen
        const { data: publicUrl } = supabase
          .storage
          .from('products')
          .getPublicUrl(matchingFile.name);

        if (publicUrl) {
          // Actualizar el producto con la URL de la imagen
          const { error: updateError } = await supabase
            .from('products')
            .update({ image_url: publicUrl.publicUrl })
            .eq('id', product.id);

          if (updateError) {
            console.error(`Error actualizando imagen para ${product.name}:`, updateError);
          } else {
            console.log(`✓ Imagen actualizada para ${product.name}`);
          }
        }
      } else {
        console.log(`⚠ No se encontró imagen para ${product.name}`);
      }
    }

    console.log('\nProceso completado exitosamente');
  } catch (error) {
    console.error('Error general:', error);
  }
}

// Ejecutar el script
updateProductImages(); 