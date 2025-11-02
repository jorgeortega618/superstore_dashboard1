# Guía de Instalación y Deployment

## 📋 Pasos para Ejecutar Localmente

### 1. Instalar Dependencias

```bash
cd c:\Users\jorge\Downloads\superstore_dashboard
npm install
```

### 2. Procesar los Datos del Excel

Este paso convierte el archivo Excel a JSON para el dashboard:

```bash
npm run process-data
```

Esto creará el archivo `public/data.json` con los datos procesados.

### 3. Ejecutar en Modo Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 4. Build para Producción (Opcional)

```bash
npm run build
npm start
```

## 🚀 Deployment en Vercel

### Opción 1: Deployment Automático desde GitHub

1. **Sube tu código a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Superstore Dashboard"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/superstore-dashboard.git
   git push -u origin main
   ```

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Haz clic en "New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente Next.js
   - Haz clic en "Deploy"

3. **Configuración Automática:**
   - El archivo `vercel.json` ya está configurado
   - Ejecutará `npm run process-data` antes del build
   - El deployment será automático

### Opción 2: Deployment Manual con Vercel CLI

1. **Instalar Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login en Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Deploy a Producción:**
   ```bash
   vercel --prod
   ```

## ⚠️ Importante Antes de Deployment

### Asegúrate de que existe `public/data.json`

Antes de hacer deployment, verifica que el archivo de datos existe:

```bash
npm run process-data
```

Si ves el mensaje "✅ Processed X rows", el archivo se creó correctamente.

### Verifica que el Build Funciona

```bash
npm run build
```

Si el build es exitoso, estás listo para deployment.

## 🔧 Troubleshooting

### Error: "Cannot find module 'xlsx'"

Solución:
```bash
npm install
```

### Error: "data.json not found"

Solución:
```bash
npm run process-data
```

### El mapa no se muestra

Verifica que tienes conexión a internet. El mapa usa datos de CDN.

### Errores de TypeScript

Los errores de lint son normales antes de instalar dependencias. Ejecuta:
```bash
npm install
```

## 📊 Estructura de Datos Esperada

El archivo Excel debe tener estas columnas:
- Order Date
- Ship Date
- Sales
- Profit
- Quantity
- Category
- Sub-Category
- Segment
- State
- Order ID

## 🎨 Personalización

### Cambiar Colores

Edita `tailwind.config.ts`:

```typescript
colors: {
  primary: "hsl(221.2 83.2% 53.3%)", // Azul principal
  // Cambia estos valores HSL
}
```

### Cambiar Año por Defecto

Edita `app/page.tsx`, línea ~30:

```typescript
const [selectedYear, setSelectedYear] = useState<number>(2022); // Cambia aquí
```

## 📱 Responsive Design

El dashboard es completamente responsivo:
- **Mobile**: Vista de columna única
- **Tablet**: Grid de 2 columnas
- **Desktop**: Grid de 3-4 columnas

## 🔐 Variables de Entorno

Este proyecto no requiere variables de entorno. Si necesitas agregar APIs en el futuro, crea un archivo `.env.local`:

```
NEXT_PUBLIC_API_KEY=tu_api_key
```

## 📈 Performance

- Todos los cálculos usan `useMemo` para optimización
- Datos cargados una sola vez
- Componentes optimizados para re-renders mínimos
- Imágenes y assets optimizados por Next.js

## 🌐 URLs del Proyecto

Después del deployment en Vercel, obtendrás:
- **Production**: `https://tu-proyecto.vercel.app`
- **Preview**: URLs únicas para cada commit

## 📞 Soporte

Si tienes problemas:
1. Verifica que Node.js 18+ esté instalado
2. Borra `node_modules` y ejecuta `npm install` de nuevo
3. Verifica que el archivo Excel esté en `data/`
4. Revisa la consola del navegador para errores

## ✅ Checklist de Deployment

- [ ] Dependencias instaladas (`npm install`)
- [ ] Datos procesados (`npm run process-data`)
- [ ] Build exitoso (`npm run build`)
- [ ] Código en GitHub (opcional)
- [ ] Proyecto creado en Vercel
- [ ] Deployment exitoso
- [ ] Dashboard funcionando en producción

¡Listo! Tu dashboard estará disponible en Vercel con una URL pública.
