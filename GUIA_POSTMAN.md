# 📡 Guía de Uso con Postman - Compilador LR

Esta guía te mostrará cómo usar Postman para probar el analizador léxico y sintáctico LR que implementa el algoritmo que describiste.

## 🚀 Configuración Inicial

### 1. Ejecutar la API
```bash
# Activar el entorno virtual
source venv/bin/activate

# Ejecutar la aplicación
python app.py
```

La API estará disponible en: `http://localhost:5000`

### 2. Importar la Colección en Postman

1. Abre Postman
2. Click en "Import" (botón en la esquina superior izquierda)
3. Selecciona "File" 
4. Navega y selecciona el archivo `Compilador_LR_Postman_Collection.json`
5. Click "Import"

¡Listo! Tendrás una colección con 10 solicitudes pre-configuradas.

## 📋 Endpoints Disponibles

### 🏠 1. Información General
**GET** `http://localhost:5000/`

Obtiene información sobre la API y todos los endpoints disponibles.

**Respuesta esperada:**
```json
{
  "mensaje": "API del Compilador LR - Analizador Léxico y Sintáctico",
  "version": "1.0",
  "endpoints": {
    "POST /compilar": "Analiza código fuente completo",
    "POST /lexico": "Solo análisis léxico",
    "POST /sintactico": "Solo análisis sintáctico (requiere tokens)",
    "GET /gramatica": "Muestra la gramática utilizada",
    "GET /tabla-lr": "Muestra las tablas LR (ACTION y GOTO)"
  }
}
```

### 🔧 2. Compilación Completa
**POST** `http://localhost:5000/compilar`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "codigo": "Start () { text variable1 }"
}
```

**Respuesta exitosa:**
```json
{
  "codigo_fuente": "Start () { text variable1 }",
  "analisis_lexico": {
    "tokens": [...],
    "total_tokens": 7,
    "informacion_tokens": {...}
  },
  "analisis_sintactico": {
    "resultado": "CÓDIGO ACEPTADO - ANÁLISIS FINALIZADO",
    "exito": true
  },
  "exito": true
}
```

### 🔤 3. Solo Análisis Léxico
**POST** `http://localhost:5000/lexico`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "codigo": "Start () { text variable1 }"
}
```

**Respuesta:**
```json
{
  "codigo_fuente": "Start () { text variable1 }",
  "tokens": [
    {
      "token": "Start",
      "tipo": "Start",
      "categoria": "palabra_reservada"
    },
    {
      "token": "(",
      "tipo": "(",
      "categoria": "simbolo_valido"
    }
    // ... más tokens
  ],
  "total_tokens": 7,
  "informacion_tokens": {
    "tipos_encontrados": {...},
    "categorias_encontradas": {...}
  }
}
```

### 🌳 4. Solo Análisis Sintáctico
**POST** `http://localhost:5000/sintactico`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "tokens": [
    {"token": "Start", "tipo": "Start", "categoria": "palabra_reservada"},
    {"token": "(", "tipo": "(", "categoria": "simbolo_valido"},
    {"token": ")", "tipo": ")", "categoria": "simbolo_valido"},
    {"token": "{", "tipo": "{", "categoria": "simbolo_valido"},
    {"token": "text", "tipo": "text", "categoria": "palabra_reservada"},
    {"token": "variable1", "tipo": "id", "categoria": "identificador_valido"},
    {"token": "}", "tipo": "}", "categoria": "simbolo_valido"}
  ]
}
```

### 📚 5. Ver Gramática
**GET** `http://localhost:5000/gramatica`

Muestra todas las producciones de la gramática implementada.

### 📊 6. Ver Tablas LR
**GET** `http://localhost:5000/tabla-lr`

Muestra las tablas ACTION, GOTO y de reducciones del analizador LR.

### 💡 7. Ver Ejemplos
**GET** `http://localhost:5000/ejemplo`

Obtiene ejemplos de código válido para probar.

## ✅ Ejemplos de Código Válido

### Ejemplo 1: Declaración Simple
```
Start () { text variable1 }
```

### Ejemplo 2: Múltiples Variables (en desarrollo)
```
Start () { text variable1, variable2 }
```

### Ejemplo 3: Estructura Condicional (en desarrollo)
```
Start () { if ( condicion >= valor ) { text resultado } Else { text alternativo } }
```

### Ejemplo 4: Asignación (en desarrollo)
```
Start () { variable = expresion }
```

## 🧪 Cómo Probar Paso a Paso

### Paso 1: Verificar que la API funciona
1. En Postman, ejecuta la solicitud "1. Información de la API"
2. Deberías recibir un JSON con información sobre los endpoints

### Paso 2: Probar análisis léxico
1. Ejecuta "5. Solo Análisis Léxico"
2. Observa cómo se tokeniza el código
3. Revisa los tipos y categorías de tokens

### Paso 3: Probar compilación completa
1. Ejecuta "2. Compilación Completa - Ejemplo Simple"
2. Verifica que el resultado sea exitoso
3. Observa tanto el análisis léxico como el sintáctico

### Paso 4: Experimentar con código inválido
1. Ejecuta "10. Código Inválido - Error Sintáctico"
2. Observa cómo se manejan los errores

## 🔍 Interpretando las Respuestas

### Análisis Léxico Exitoso
- `total_tokens`: Número de tokens generados
- `tipos_encontrados`: Cuenta de cada tipo de token
- `categorias_encontradas`: Cuenta por categoría (identificador_valido, simbolo_valido, etc.)

### Análisis Sintáctico Exitoso
```json
{
  "resultado": "CÓDIGO ACEPTADO - ANÁLISIS FINALIZADO",
  "exito": true
}
```

### Manejo de Errores
```json
{
  "error": "Descripción específica del error",
  "exito": false
}
```

## 🎯 Algoritmo Implementado

El compilador sigue exactamente el algoritmo que describiste:

1. **Procesamiento línea por línea** del código fuente
2. **Análisis léxico** que identifica tokens y los clasifica
3. **Análisis sintáctico LR** que usa:
   - Pila de estados y símbolos
   - Tabla ACTION (shift/reduce)
   - Tabla GOTO para transiciones
   - Conteo correcto de palabras para reducciones
   - Manejo de la pila según tu algoritmo

## 🐛 Solución de Problemas

### Error: "Connection refused"
- Verifica que la API esté ejecutándose: `python app.py`
- Confirma que esté en el puerto 5000

### Error: "JSON parse error"
- Verifica que el Content-Type sea `application/json`
- Asegúrate de que el JSON esté bien formado

### Error: "Se requiere el campo 'codigo'"
- Verifica que el body contenga el campo `codigo` con el código fuente

### Error: "Acción no definida para estado X y token Y"
- Esto indica un error en el análisis sintáctico
- El código no cumple con la gramática implementada

## 🚀 Próximos Pasos

1. **Probar ejemplos básicos** para familiarizarte con la API
2. **Experimentar con código inválido** para entender los errores
3. **Revisar las tablas LR** para entender el funcionamiento interno
4. **Crear tus propios ejemplos** de código válido

¡La API está lista para ser probada con Postman siguiendo el algoritmo LR que describiste! 🎉