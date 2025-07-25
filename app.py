from flask import Flask, request, jsonify
from flask_cors import CORS
from compilador import Compilador
import traceback

app = Flask(__name__)
CORS(app)  # Permitir CORS para todas las rutas

# Instancia global del compilador
compilador = Compilador()

@app.route('/', methods=['GET'])
def home():
    """Endpoint de bienvenida"""
    return jsonify({
        'mensaje': 'API del Compilador LR - Analizador Léxico y Sintáctico',
        'version': '1.0',
        'endpoints': {
            'POST /compilar': 'Analiza código fuente completo',
            'POST /lexico': 'Solo análisis léxico',
            'POST /sintactico': 'Solo análisis sintáctico (requiere tokens)',
            'GET /gramatica': 'Muestra la gramática utilizada',
            'GET /tabla-lr': 'Muestra las tablas LR (ACTION y GOTO)'
        }
    })

@app.route('/compilar', methods=['POST'])
def compilar_codigo():
    """
    Endpoint principal para compilar código fuente
    Realiza análisis léxico y sintáctico completo
    """
    try:
        data = request.get_json()
        
        if not data or 'codigo' not in data:
            return jsonify({
                'error': 'Se requiere el campo "codigo" en el JSON',
                'ejemplo': {
                    'codigo': 'Start () { text variable1, variable2 }'
                }
            }), 400
        
        codigo_fuente = data['codigo']
        
        if not codigo_fuente.strip():
            return jsonify({
                'error': 'El código fuente no puede estar vacío'
            }), 400
        
        # Compilar el código
        resultado = compilador.compilar(codigo_fuente)
        
        # Preparar respuesta
        respuesta = {
            'codigo_fuente': codigo_fuente,
            'analisis_lexico': {
                'tokens': resultado['tokens'],
                'total_tokens': len(resultado['tokens'])
            },
            'analisis_sintactico': resultado['resultado_sintactico'],
            'exito': resultado.get('exito', False)
        }
        
        # Agregar información adicional de tokens si existen
        if resultado['tokens']:
            respuesta['analisis_lexico']['informacion_tokens'] = compilador.obtener_informacion_tokens(resultado['tokens'])
        
        if 'error' in resultado:
            respuesta['error'] = resultado['error']
            return jsonify(respuesta), 400
        
        return jsonify(respuesta)
        
    except Exception as e:
        return jsonify({
            'error': 'Error interno del servidor',
            'detalle': str(e),
            'traceback': traceback.format_exc()
        }), 500

@app.route('/lexico', methods=['POST'])
def analisis_lexico():
    """
    Endpoint para realizar solo análisis léxico
    """
    try:
        data = request.get_json()
        
        if not data or 'codigo' not in data:
            return jsonify({
                'error': 'Se requiere el campo "codigo" en el JSON'
            }), 400
        
        codigo_fuente = data['codigo']
        tokens = compilador.analizador_lexico.analizador_lexico(codigo_fuente)
        
        return jsonify({
            'codigo_fuente': codigo_fuente,
            'tokens': tokens,
            'total_tokens': len(tokens),
            'informacion_tokens': compilador.obtener_informacion_tokens(tokens)
        })
        
    except Exception as e:
        return jsonify({
            'error': 'Error en análisis léxico',
            'detalle': str(e)
        }), 500

@app.route('/sintactico', methods=['POST'])
def analisis_sintactico():
    """
    Endpoint para realizar solo análisis sintáctico
    Requiere una lista de tokens como entrada
    """
    try:
        data = request.get_json()
        
        if not data or 'tokens' not in data:
            return jsonify({
                'error': 'Se requiere el campo "tokens" en el JSON',
                'ejemplo': {
                    'tokens': [
                        {'token': 'Start', 'tipo': 'Start', 'categoria': 'palabra_reservada'},
                        {'token': '(', 'tipo': '(', 'categoria': 'simbolo_valido'}
                    ]
                }
            }), 400
        
        tokens = data['tokens']
        resultado = compilador.analizador_sintactico.analizar(tokens)
        
        return jsonify({
            'tokens_entrada': tokens,
            'resultado_sintactico': resultado
        })
        
    except Exception as e:
        return jsonify({
            'error': 'Error en análisis sintáctico',
            'detalle': str(e)
        }), 500

@app.route('/gramatica', methods=['GET'])
def mostrar_gramatica():
    """
    Endpoint que muestra la gramática utilizada
    """
    gramatica = {
        'producciones': [
            "I' -> I $",
            "I -> Start ( ) { B }",
            "B -> US",
            "B -> US B",
            "US -> DV",
            "DV -> V",
            "DV -> V DV",
            "V -> TV LV",
            "TV -> text",
            "LV -> id , LV",
            "US -> IF",
            "IF -> if ( COND ) { B } Else { B }",
            "COND -> id OR id",
            "OR -> >=",
            "US -> Asig",
            "Asig -> id = E"
        ],
        'simbolos_terminales': ['$', 'Start', '(', ')', '{', '}', 'text', 'id', ',', 'if', 'Else', '>=', '='],
        'simbolos_no_terminales': ["I'", 'I', 'B', 'US', 'DV', 'V', 'TV', 'LV', 'IF', 'COND', 'OR', 'Asig', 'E'],
        'simbolo_inicial': "I'"
    }
    
    return jsonify(gramatica)

@app.route('/tabla-lr', methods=['GET'])
def mostrar_tabla_lr():
    """
    Endpoint que muestra las tablas LR (ACTION y GOTO)
    """
    return jsonify({
        'tabla_action': compilador.analizador_sintactico.tabla_action,
        'tabla_goto': compilador.analizador_sintactico.tabla_goto,
        'tabla_reducciones': compilador.analizador_sintactico.tabla_reducciones
    })

@app.route('/ejemplo', methods=['GET'])
def obtener_ejemplo():
    """
    Endpoint que proporciona ejemplos de código válido
    """
    ejemplos = {
        'ejemplo_simple': {
            'descripcion': 'Programa básico con declaración de variables',
            'codigo': 'Start () { text variable1, variable2 }'
        },
        'ejemplo_con_if': {
            'descripcion': 'Programa con estructura condicional',
            'codigo': 'Start () { if ( condicion >= valor ) { text resultado } Else { text alternativo } }'
        },
        'ejemplo_asignacion': {
            'descripcion': 'Programa con asignación',
            'codigo': 'Start () { variable = expresion }'
        },
        'ejemplo_complejo': {
            'descripcion': 'Programa más complejo combinando elementos',
            'codigo': '''Start () {
    text mensaje1, mensaje2
    if ( usuario >= admin ) {
        resultado = procesado
    } Else {
        text error
    }
}'''
        }
    }
    
    return jsonify(ejemplos)

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'error': 'Endpoint no encontrado',
        'mensaje': 'Verifica la URL y el método HTTP',
        'endpoints_disponibles': [
            'GET /',
            'POST /compilar',
            'POST /lexico',
            'POST /sintactico',
            'GET /gramatica',
            'GET /tabla-lr',
            'GET /ejemplo'
        ]
    }), 404

@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({
        'error': 'Método no permitido',
        'mensaje': 'Verifica que estés usando el método HTTP correcto'
    }), 405

if __name__ == '__main__':
    print("🚀 Iniciando API del Compilador LR...")
    print("📋 Endpoints disponibles:")
    print("   GET  /              - Información de la API")
    print("   POST /compilar      - Análisis completo")
    print("   POST /lexico        - Solo análisis léxico")
    print("   POST /sintactico    - Solo análisis sintáctico")
    print("   GET  /gramatica     - Mostrar gramática")
    print("   GET  /tabla-lr      - Mostrar tablas LR")
    print("   GET  /ejemplo       - Ejemplos de código")
    print("\n🔗 URL base: http://localhost:5000")
    print("📡 Usa Postman para probar la API")
    
    app.run(debug=True, host='0.0.0.0', port=5000)