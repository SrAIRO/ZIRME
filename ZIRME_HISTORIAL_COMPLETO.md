# ZIRME - HISTORIAL EVOLUTIVO COMPLETO
## Desde V1 hasta V11.4 (28 Febrero 2026)

---

## 📜 ÍNDICE
1. [V1-V4: Fundación](#v1-v4-fundación)
2. [V5-V9: Expansión de Herramientas](#v5-v9-expansión-de-herramientas)
3. [V10: Grandes Funcionalidades](#v10-grandes-funcionalidades)
4. [V11.0-V11.1: ML Detection Rewrite](#v110-v111-ml-detection-rewrite)
5. [V11.2: Correcciones Críticas](#v112-correcciones-críticas)
6. [V11.3: Arquitectura Estructural](#v113-arquitectura-estructural)
7. [V11.4: Internacionalización](#v114-internacionalización)

---

## V1-V4: FUNDACIÓN

### V1: Prototipo Inicial
**Objetivo**: Herramienta básica de batch cropping

**Funcionalidades**:
- Carga múltiple de imágenes
- Crop manual con handles
- Exportación individual

**Stack Técnico**:
- React (Babel standalone)
- Canvas API
- Sin dependencias externas

---

### V2: Organización Visual
**Cambios**:
- Sistema de miniaturas en grid
- Sidebar derecho para configuración
- Crop visual con sombra
- Handles redimensionables

**UI/UX**:
- Tema oscuro (#181818)
- Morado corporativo (#7c5cff)
- Grid responsive

---

### V3: Batch Processing
**Funcionalidades añadidas**:
- Exportación ZIP múltiple
- Renombrado por lotes
- Aspect ratio locks
- Focal point manual

**Mejoras**:
- Progress bar para batch export
- Toast notifications
- Drag & drop file upload

---

### V4: Sidebar Reorganization
**Cambios estructurales**:
- Panel derecho reorganizado por secciones
- Tab system (Settings / Export)
- Accordion panels colapsables
- Output size configuration

**Optimizaciones**:
- Mejor flow de trabajo
- Menos clutter visual

---

## V5-V9: EXPANSIÓN DE HERRAMIENTAS

### V5-V6: Smart Crop
**Integración smartcrop.js**:
- Detección automática de punto focal
- Algoritmo de saliency mapping
- Fallback a centro si falla

**Features**:
- Toggle "Automatic (auto detect)"
- Apply to all batch
- Manual override disponible

---

### V7: Modo Edición
**Gran milestone**: Editor completo por imagen

**Características**:
- Canvas zoomable (wheel zoom)
- Pan con click derecho
- Crop refinement en editor
- Botón "Edit" por imagen

**Arquitectura**:
- Componente `EditOverlay` separado
- Estado de zoom/pan en refs
- DrawNow() imperativo (sin RAF)

---

### V8: Blur Brush
**Nueva herramienta**: Pincel de desenfoque

**Implementación**:
- Size, strength, hardness, opacity
- Radial gradient masking
- Canvas temporal para blur effect
- Direct painting en file.ec

**UX**:
- Panel lateral con controles
- Cursor visual del pincel

---

### V9: Cursor Visual & Optimizaciones
**Mejoras críticas**:
- Cursor de brocha con hardness/opacity visual
- Undo/Redo verificado funcional
- Smart fill optimizado (sin artifacts)
- Pixelate brush añadido

**Correcciones**:
- Smart fill eliminó líneas visuales
- Algoritmo gradient mejorado

---

## V10: GRANDES FUNCIONALIDADES

### Nuevas Herramientas
**Eraser Tool** (3 modos):
- Transparent: Borra a alpha
- Solid: Pinta color sólido
- Smart: Content-aware fill

**Annotate Tool** (2 modos):
- Draw: Dibujo libre
- Text: Bloques de texto editables

**Transform**:
- Rotation (90°, 180°, 270°)
- Flip horizontal/vertical

---

### Sistema de Texto
**Implementación**:
- Bloques de texto re-editables
- Drag & drop posicionamiento
- Font, size, color, opacity
- Persistent layers

**Problemas V10**:
- Sistema complejo
- UX no alcanza nivel Photoshop
- **Decisión**: Eliminar en V11

---

### Paneles Colapsables
**Mejora UX**:
- Click en herramienta → Toggle panel
- Botón X para cerrar
- Reduce clutter visual

**Color Picker Custom**:
- Dial circular de hue
- Slider de brightness
- Evita popup nativo

---

### Problemas Críticos V10
1. **Undo/Redo inconsistente** (solo primer stroke)
2. **Body crop sin rostro falla** (scale 3-4x incorrecta)
3. **Tool panels no colapsables** completamente
4. **PoseNet roto** (loading duplicado)
5. **Text UX crea bloques no deseados**

---

## V11.0-V11.1: ML DETECTION REWRITE

### Problema Raíz Identificado
**V10 estrategia incorrecta**:
```
COCO-SSD detecta persona completa [cabeza+pies]
→ Quitar 20% superior (estimación cabeza)
→ Crop pequeño (600px)
→ Forzar 1920x1080 → scale 3.2x
→ ❌ CROP GIGANTE con fondo excesivo
```

---

### V11.1: Nueva Jerarquía ML
**Estrategia correcta**:
```
NIVEL 1: PoseNet (PRIMARIO)
  → Detecta hombros (funciona aunque rostro tapado)
  → Crop desde coordenadas exactas
  → ✅ PERFECTO sin estimación

NIVEL 2: Face-API (SECUNDARIO)
  → Solo si PoseNet falla
  → Crop desde clavícula (50% debajo rostro)
  → ✅ PERFECTO con rostro visible

NIVEL 3: COCO-SSD (TERCIARIO)
  → Solo si ambos anteriores fallan
  → Offset 12% (conservador)
  → NO forzar tamaño mínimo
  → ✅ Natural sin scale extremo
```

---

### Análisis Bibliotecas ML

**COCO-SSD**:
- ✅ Rápido
- ❌ Solo bbox completo, no distingue partes

**Face-API**:
- ✅ Perfecto cuando rostro visible
- ❌ Falla cuando rostro tapado

**PoseNet** (AHORA PRIMARIO):
- ✅ Detecta 17 keypoints (hombros incluidos)
- ✅ Hombros visibles aunque rostro tapado
- ✅ Más preciso que estimación COCO-SSD

**Alternativas evaluadas**:
- Body-Pix: ⭐⭐⭐⭐⭐ precisión, ⭐⭐ velocidad → Muy lento
- MediaPipe: Setup complejo (WASM) → Descartado
- **Conclusión**: PoseNet óptimo para batch

---

### detectBodyCrop() Reescrito
**Cambios implementados**:

**Nivel 1 - PoseNet**:
```javascript
const pose = await poseNetModel.estimateSinglePose(canvas);
const leftShoulder = pose.keypoints.find(kp => kp.part === 'leftShoulder');
const rightShoulder = pose.keypoints.find(kp => kp.part === 'rightShoulder');

if(leftShoulder?.score > 0.35 && rightShoulder?.score > 0.35) {
  const shoulderY = (left.y + right.y) / 2;
  const shoulderWidth = Math.abs(right.x - left.x);
  const bodyWidth = shoulderWidth * 2.5;
  const bodyHeight = shoulderWidth * 3.2;
  // ✅ Crop desde hombros exactos
}
```

**Nivel 2 - Face-API**:
```javascript
const faces = await faceapi.detectAllFaces(canvas);
if(faces.length > 0) {
  const clavicleY = face.y + face.height * 1.5;
  // ✅ Crop desde clavícula
}
```

**Nivel 3 - COCO-SSD**:
```javascript
const headOffset = height * 0.12; // Solo 12% conservador
y = y + headOffset;
// ✅ NO forzar tamaño mínimo
```

---

### Otros Cambios V11.1
1. **Sistema texto ELIMINADO** (no funcional)
2. **Toggle PoseNet VISIBLE** en UI
3. **Settings state actualizado** (poseNetEnabled: false)
4. **Logs depuración mejorados** (_method, _poseScore, _conservative)

---

### Testing V11.1
**Caso crítico**: Mujer con teléfono tapando rostro
- ✅ PoseNet detecta hombros
- ✅ Crop correcto sin fondo excesivo
- ✅ Console: "✓ PoseNet: hombros detectados (L:0.XX R:0.XX)"

---

## V11.2: CORRECCIONES CRÍTICAS

### Problemas Reportados V11.1
1. 🔴 **PoseNet no respeta tamaño objetivo** (1024x1024 → otro tamaño)
2. 🔴 **Modo edición pantalla negra** (Click "Editar" → Black screen)
3. 🟡 **Crop se borra al re-seleccionar** imagen

---

### FIX 1: PoseNet SIEMPRE Respeta Tamaño
**Problema**:
```javascript
if(adjustToTargetSize && cropW < outW && cropH < outH) {
  const scale = Math.max(outW / cropW, outH / cropH);
  if(scale < 1.8) { // ❌ Si scale >= 1.8, NO ajusta
    cropW *= scale;
  }
}
```

**Solución V11.2**:
```javascript
if(adjustToTargetSize) {
  if(cropW < outW || cropH < outH) {
    const scale = Math.max(outW / cropW, outH / cropH);
    cropW *= scale; // ✅ SIN restricción scale
    cropH *= scale;
  }
}
```

**Resultado**: Si configuras 1024x1024, SIEMPRE exporta 1024x1024 ✅

---

### FIX 2: Modo Edición Funciona
**Causa**: Editor de texto flotante (127 líneas) accedía `activeText` eliminado

**Solución**: Eliminadas líneas 2299-2425
- Bloque completo JSX del editor texto
- Estado `activeText` ya no existe
- Pantalla NO se queda negra

---

### FIX 3: Crop Persistente
**Problema**: onClick siempre creaba nuevo crop

**Solución**:
```javascript
// Solo crear nuevo crop si NO hay crop existente
if(!cr || cr.w<=2) {
  if(p.x>=0 && p.x<=file.ec.width ...) {
    onCropChange(file.id, {x:p.x, y:p.y, w:0, h:0});
  }
}
```

**Resultado**: Re-seleccionar imagen mantiene crop ✅

---

## V11.3: ARQUITECTURA ESTRUCTURAL

### Problemas Identificados
1. 🔴 **Modo edición aplica cambios globalmente** (panel derecho)
2. 🔴 **Undo/Redo deshace imagen INCORRECTA** (selId en vez de editId)
3. 🟡 **Resolución mínima NO se respeta** (con adjustToTargetSize OFF)
4. 🟢 **Panel izquierdo UX confusa** (click izq abre/cierra)

---

### FIX 1: Aislamiento Modo Edición
**applyFocalAll() reescrito**:
```javascript
const applyFocalAll = useCallback(async()=>{
  // V11.3 CRÍTICO: Guard al inicio
  const currentEditId = editIdRef.current;
  
  if(currentEditId) {
    // MODO EDICIÓN: Solo procesar imagen activa
    const f = filesRef.current.find(ff => ff.id === currentEditId);
    // ... procesamiento solo esta imagen
    setFiles(prev => prev.map(ff => 
      ff.id === currentEditId ? {...ff, crop: {...nc}} : ff
    ));
    return; // ✅ Salir sin procesar otras
  }
  
  // MODO NORMAL: Lógica selId/multiSel
});
```

**Resultado**: Panel derecho solo afecta imagen en edición ✅

---

### FIX 2: Undo/Redo Usa EditId
**Problema**: undoSel() usaba SIEMPRE selId

**Solución**:
```javascript
const undoSel = useCallback(()=>{
  // V11.3: Priorizar editId
  const targetId = editId || selId;
  if(!targetId) return;
  
  setFiles(prev=>prev.map(f=>{
    if(f.id!==targetId) return f; // ✅ Solo imagen correcta
    // ... lógica undo
  }));
},[editId,selId,t]); // ✅ Depende de editId
```

**activeFile actualizado**:
```javascript
const activeFile = editFile || sel;
const canUndo = (activeFile?.history||[]).length>0;
const canRedo = (activeFile?.future||[]).length>0;
```

**Resultado**: Undo/Redo opera sobre imagen editada ✅

---

### FIX 3: Validación Resolución ESTRICTA
**Problema**: Dependía de flag `adjustToTargetSize`

**Solución V11.3 - TODOS los niveles**:
```javascript
// PoseNet, Face-API, COCO-SSD:
// V11.3: SIEMPRE respetar mínimo (incondicional)
if(cropW < outW || cropH < outH) {
  const scale = Math.max(outW / cropW, outH / cropH);
  cropW *= scale;
  cropH *= scale;
}
```

**Resultado**: NUNCA baja del mínimo configurado ✅

---

### FIX 4: Panel Izquierdo UX
**Cambios**:
```javascript
onClick={()=>{
  // V11.3: Solo seleccionar herramienta
  setTool(tb.id);
}}
onContextMenu={(e)=>{
  e.preventDefault();
  // V11.3: Click derecho toggle panel
  setToolPanelOpen(toolPanelOpen===tb.id ? null : tb.id);
}}
```

**Botones X eliminados**: 3 ubicaciones

**Resultado**:
- ✅ Click izquierdo → Seleccionar
- ✅ Click derecho → Toggle panel
- ✅ Sin redundancia

---

### Comparativa V11.2 vs V11.3

| Característica | V11.2 | V11.3 |
|----------------|-------|-------|
| Panel derecho en edición | ❌ Global | ✅ Solo activa |
| Undo/Redo en edición | ❌ Usa selId | ✅ Usa editId |
| Resolución mínima | ⚠️ Depende flag | ✅ SIEMPRE respeta |
| Panel izquierdo | ⚠️ Click izq toggle | ✅ Click der toggle |
| Botones X | ❌ Presentes | ✅ Eliminados |

---

## V11.4: INTERNACIONALIZACIÓN

### Cambios Implementados (3/11)

**1. Idioma default → Inglés**:
```javascript
// V11.3: "es"
// V11.4: "en"
const [lang, setLang] = useState(()=>{
  try{return localStorage.getItem("zirme-lang")||"en";}
  catch(e){return "en";}
});
```

**2. Drop overlay → Inglés**:
```html
<!-- V11.3 -->
<div class="label">Suelta tus imágenes aquí</div>

<!-- V11.4 -->
<div class="label">Drop your images here</div>
```

**3. Nombre base export → Flexible**:
```javascript
// V11.3: Forzaba "image"
value={settings.renameBase||"image"}

// V11.4: Permite vacío
value={settings.renameBase}
```

---

### Cambios Pendientes (8/11)

**Estado**: Identificados pero NO implementados

**Requieren**:
1. CSS Cleanup
2. Header reorganization + botones
3. Actualizar miniaturas en edición
4. Undo/Redo efecto inmediato
5. Cuerpo + PoseNet redundante
6. Investigar resolución mínima performance
7. Modo edición niveles (análisis profundo)
8. Feedback button + Clear All

Ver documento `ZIRME_PENDIENTES_V11.5.md` para detalles

---

## 📊 RESUMEN ESTADÍSTICO

### Líneas de Código
- V1: ~500 líneas
- V5: ~1200 líneas
- V10: ~3800 líneas
- V11.1: ~4001 líneas
- V11.4: ~3915 líneas

### Tamaño Archivo
- V1: ~25KB
- V5: ~60KB
- V10: ~195KB
- V11.4: ~200KB

### Dependencias Externas
- React (Babel standalone)
- smartcrop.js
- TensorFlow.js
- COCO-SSD
- Face-API.js
- PoseNet
- JSZip

### Herramientas Disponibles
1. Crop (manual + auto)
2. Smart Crop (smartcrop.js)
3. ML Detection (Face/Body)
4. Blur Brush
5. Pixelate Brush
6. Eraser (3 modos)
7. Annotate (draw)
8. Transform (rotate/flip)
9. Border
10. Watermark
11. Batch Export (ZIP)
12. Rename (batch)

---

## 🎯 HITOS PRINCIPALES

**V1-V4**: Fundación sólida
**V5-V7**: Smart features + Editor
**V8-V9**: Herramientas brush
**V10**: Máximas funcionalidades (pre-limpieza)
**V11.1**: ML Detection reescrito correctamente
**V11.3**: Arquitectura modo edición aislada
**V11.4**: Internacionalización básica

---

## 🔮 EVOLUCIÓN FUTURA

**Prioridad Alta**:
- Completar V11.5+ (8 pendientes)
- Testing exhaustivo V11.3
- CSS cleanup

**Prioridad Media**:
- Performance optimizations
- Más formatos export (AVIF, WebP)
- Batch undo/redo

**Prioridad Baja**:
- Cloud integration opcional
- Preset templates
- Advanced color grading

---

*Documento generado: 28 Febrero 2026*
*Última versión: V11.4*
*Total de versiones: 14 iteraciones mayores*
