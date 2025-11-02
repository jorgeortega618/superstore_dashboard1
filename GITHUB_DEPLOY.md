# Guía para Publicar en GitHub

## 📋 Pasos para Publicar en GitHub

### 1. Inicializar Git y Hacer Commit

Ejecuta estos comandos en la terminal (en el directorio del proyecto):

```bash
# Inicializar repositorio git
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit: Superstore Dashboard with Next.js"
```

### 2. Conectar con GitHub

```bash
# Agregar el repositorio remoto
git remote add origin https://github.com/jorgeortega618/superstore_dashboard1.git

# Verificar que se agregó correctamente
git remote -v
```

### 3. Subir el Código

```bash
# Cambiar a la rama main (si es necesario)
git branch -M main

# Subir el código a GitHub
git push -u origin main
```

## 🚀 Deploy Automático en Vercel

Una vez que el código esté en GitHub, puedes hacer deploy automático en Vercel:

### Opción 1: Desde Vercel Dashboard

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "New Project"
3. Importa tu repositorio: `jorgeortega618/superstore_dashboard1`
4. Vercel detectará automáticamente Next.js
5. **IMPORTANTE**: Antes de hacer deploy, configura el Build Command:
   - Build Command: `npm run process-data && npm run build`
   - O usa el archivo `vercel.json` que ya está configurado
6. Haz clic en "Deploy"

### Opción 2: Desde la Terminal

```bash
# Instalar Vercel CLI (si no lo tienes)
npm install -g vercel

# Login en Vercel
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

## ⚠️ Importante Antes del Deploy

### 1. Procesar los Datos

Asegúrate de que el archivo `public/data.json` existe:

```bash
npm run process-data
```

### 2. Verificar que el Build Funciona

```bash
npm run build
```

Si hay errores, corrígelos antes de hacer deploy.

### 3. Verificar el archivo vercel.json

El archivo `vercel.json` ya está configurado para procesar los datos automáticamente:

```json
{
  "buildCommand": "npm run process-data && npm run build",
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

## 📝 Comandos Completos (Copia y Pega)

```bash
# 1. Inicializar Git
git init
git add .
git commit -m "Initial commit: Superstore Dashboard with Next.js"

# 2. Conectar con GitHub
git remote add origin https://github.com/jorgeortega618/superstore_dashboard1.git
git branch -M main

# 3. Subir a GitHub
git push -u origin main
```

## 🔄 Actualizaciones Futuras

Cuando hagas cambios en el futuro:

```bash
# Ver cambios
git status

# Agregar cambios
git add .

# Hacer commit
git commit -m "Descripción de los cambios"

# Subir a GitHub
git push
```

Vercel detectará automáticamente los cambios y hará un nuevo deploy.

## 📊 Estructura del Repositorio

Tu repositorio incluirá:

```
superstore_dashboard1/
├── app/                    # Páginas Next.js
├── components/             # Componentes React
├── lib/                    # Utilidades
├── scripts/                # Script de procesamiento
├── data/                   # Archivo Excel original
├── public/                 # Archivos estáticos
├── package.json            # Dependencias
├── vercel.json            # Configuración de Vercel
├── README.md              # Documentación
└── ...
```

## 🎯 URLs Finales

Después del deploy tendrás:

- **GitHub**: https://github.com/jorgeortega618/superstore_dashboard1
- **Vercel**: https://superstore-dashboard1.vercel.app (o similar)

## 🔐 Consideraciones de Seguridad

- ✅ El archivo `.gitignore` ya está configurado
- ✅ No se subirán `node_modules`
- ✅ No se subirán archivos temporales
- ⚠️ El archivo Excel se subirá (está en `data/`)
  - Si contiene datos sensibles, agrégalo a `.gitignore`

## 📱 Verificación Post-Deploy

1. ✅ El sitio carga correctamente
2. ✅ Los datos se muestran
3. ✅ Los filtros funcionan
4. ✅ El mapa es interactivo
5. ✅ Las gráficas se renderizan
6. ✅ El diseño es responsivo

## 🐛 Troubleshooting

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/jorgeortega618/superstore_dashboard1.git
```

### Error: "data.json not found" en Vercel
- Verifica que `vercel.json` tiene el buildCommand correcto
- O agrega `public/data.json` al repositorio

### Error de Build en Vercel
- Revisa los logs en Vercel Dashboard
- Verifica que todas las dependencias estén en `package.json`

## ✅ Checklist Final

- [ ] Git inicializado
- [ ] Código en GitHub
- [ ] `npm run process-data` ejecutado
- [ ] `npm run build` funciona localmente
- [ ] Deploy en Vercel exitoso
- [ ] Dashboard funcionando en producción
- [ ] URL compartida con el equipo

¡Listo para publicar! 🚀
