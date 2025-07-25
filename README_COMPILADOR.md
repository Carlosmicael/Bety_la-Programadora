# 🚀 Compilador LR - Analizador Léxico y Sintáctico

Este proyecto implementa un compilador con analizador léxico y sintáctico LR basado en el algoritmo descrito. La aplicación está construida como una API REST usando Flask que puedes probar fácilmente con Postman.

## 📋 Características

- **Analizador Léxico**: Tokeniza el código fuente identificando palabras reservadas, identificadores, símbolos y operadores
- **Analizador Sintáctico LR**: Implementa el algoritmo LR con las tablas ACTION y GOTO especificadas
- **API REST**: Endpoints para análisis completo, solo léxico, solo sintáctico
- **Manejo de Errores**: Detección y reporte de errores léxicos y sintácticos
- **Documentación Integrada**: Endpoints para ver gramática, tablas LR y ejemplos

## 🏗️ Gramática Implementada

```
I' -> I $
I -> Start ( ) { B }
B -> US
B -> US B
US -> DV
DV -> V
DV -> V DV
V -> TV LV
TV -> text
LV -> id , LV
US -> IF
IF -> if ( COND ) { B } Else { B }
COND -> id OR id
OR -> >=
US -> Asig
Asig -> id = E
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Python 3.8 o superior
- pip (gestor de paquetes de Python)
- Postman (para probar la API)

### Pasos de Instalación

1. **Instalar dependencias**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Ejecutar la aplicación**:
   ```bash
   python app.py
   ```

3. **Verificar que la API esté funcionando**:
   - Abre tu navegador y ve a: `http://localhost:5000`
   - Deberías ver un JSON con información de la API

## 📡 Endpoints de la API

### Base URL: `http://localhost:5000`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Información general de la API |
| POST | `/compilar` | Análisis léxico y sintáctico completo |
| POST | `/lexico` | Solo análisis léxico |
| POST | `/sintactico` | Solo análisis sintáctico |
| GET | `/gramatica` | Muestra la gramática |
| GET | `/tabla-lr` | Muestra las tablas LR |
| GET | `/ejemplo` | Ejemplos de código válido |

## 🧪 Pruebas con Postman

### Opción 1: Importar Colección (Recomendado)
1. Abre Postman
2. Click en "Import"
3. Selecciona el archivo `Compilador_LR_Postman_Collection.json`
4. La colección se importará con todas las pruebas pre-configuradas

### Opción 2: Crear Solicitudes Manualmente

#### 1. Compilación Completa
```
POST http://localhost:5000/compilar
Content-Type: application/json

{
  "codigo": "Start () { text variable1, variable2 }"
}
```

#### 2. Solo Análisis Léxico
```
POST http://localhost:5000/lexico
Content-Type: application/json

{
  "codigo": "Start () { text variable1, variable2 }"
}
```

#### 3. Solo Análisis Sintáctico
```
POST http://localhost:5000/sintactico
Content-Type: application/json

{
  "tokens": [
    {"token": "Start", "tipo": "Start", "categoria": "palabra_reservada"},
    {"token": "(", "tipo": "(", "categoria": "simbolo_valido"},
    {"token": ")", "tipo": ")", "categoria": "simbolo_valido"},
    {"token": "{", "tipo": "{", "categoria": "simbolo_valido"},
    {"token": "text", "tipo": "text", "categoria": "palabra_reservada"},
    {"token": "variable1", "tipo": "id", "categoria": "identificador_valido"},
    {"token": ",", "tipo": ",", "categoria": "simbolo_valido"},
    {"token": "variable2", "tipo": "id", "categoria": "identificador_valido"},
    {"token": "}", "tipo": "}", "categoria": "simbolo_valido"}
  ]
}
```

## 📝 Ejemplos de Código Válido

### Ejemplo 1: Declaración Simple
```
Start () { text variable1, variable2 }
```

### Ejemplo 2: Estructura Condicional
```
Start () { if ( condicion >= valor ) { text resultado } Else { text alternativo } }
```

### Ejemplo 3: Asignación
```
Start () { variable = expresion }
```

### Ejemplo 4: Programa Complejo
```
Start () {
    text mensaje1, mensaje2
    if ( usuario >= admin ) {
        resultado = procesado
    } Else {
        text error
    }
}
```

## 🔧 Estructura del Proyecto

```
├── analizador_lexico.py          # Módulo del analizador léxico
├── analizador_sintactico.py      # Módulo del analizador sintáctico LR
├── compilador.py                 # Clase principal del compilador
├── app.py                        # API Flask
├── requirements.txt              # Dependencias Python
├── Compilador_LR_Postman_Collection.json  # Colección de Postman
└── README_COMPILADOR.md          # Este archivo
```

## 🎯 Algoritmo Implementado

El compilador sigue exactamente el algoritmo descrito:

1. **Procesamiento línea por línea**: El código se divide en líneas y cada una se procesa individualmente
2. **Análisis léxico**: Cada línea se envía al analizador léxico que genera tokens
3. **Análisis sintáctico LR**: Los tokens se procesan usando:
   - Pila de estados y símbolos
   - Tabla ACTION para determinar acciones (shift/reduce)
   - Tabla GOTO para transiciones
   - Conteo correcto de palabras para reducciones
   - Manejo de la pila según el algoritmo especificado

## 🐛 Manejo de Errores

La API maneja varios tipos de errores:

- **Errores léxicos**: Tokens no reconocidos
- **Errores sintácticos**: Violaciones de la gramática
- **Errores de formato**: JSON mal formado
- **Errores de validación**: Campos faltantes o inválidos

## 📊 Respuestas de la API

### Respuesta Exitosa
```json
{
  "codigo_fuente": "Start () { text variable1, variable2 }",
  "analisis_lexico": {
    "tokens": [...],
    "total_tokens": 9,
    "informacion_tokens": {...}
  },
  "analisis_sintactico": {
    "resultado": "CÓDIGO ACEPTADO - ANÁLISIS FINALIZADO",
    "exito": true
  },
  "exito": true
}
```

### Respuesta con Error
```json
{
  "error": "Descripción del error",
  "codigo_fuente": "...",
  "analisis_lexico": {...},
  "analisis_sintactico": {...},
  "exito": false
}
```

## 🔍 Depuración

Para ver el proceso paso a paso:
1. Ejecuta la aplicación en modo debug (ya está habilitado)
2. Observa la consola para ver el procesamiento línea por línea
3. Los tokens generados se muestran en tiempo real
4. Los errores incluyen trazas detalladas

## 💡 Consejos para Uso

1. **Usa la colección de Postman** para pruebas rápidas
2. **Revisa el endpoint `/ejemplo`** para obtener código válido
3. **Consulta `/gramatica`** para entender las reglas
4. **Usa `/tabla-lr`** para ver las tablas de análisis
5. **Prueba casos de error** para entender el manejo de errores

## 🚀 Ejecución Rápida

```bash
# 1. Instalar dependencias
pip install -r requirements.txt

# 2. Ejecutar API
python app.py

# 3. Abrir Postman e importar la colección
# 4. ¡Comenzar a probar!
```

¡La API estará disponible en `http://localhost:5000` y lista para ser probada con Postman! 🎉