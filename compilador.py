from analizador_lexico import AnalizadorLexico
from analizador_sintactico import AnalizadorSintactico

class Compilador:
    def __init__(self):
        self.analizador_lexico = AnalizadorLexico()
        self.analizador_sintactico = AnalizadorSintactico()
    
    def compilar(self, codigo_fuente):
        """
        Función principal del compilador que sigue el algoritmo descrito:
        1. Recorre línea por línea el código
        2. Envía cada línea al analizador léxico
        3. Procesa los tokens con el analizador sintáctico
        """
        try:
            # Dividir el código en líneas
            lineas_codigo = codigo_fuente.split('\n')
            todos_los_tokens = []
            
            # Procesar línea por línea como se describe en el algoritmo
            for i, linea in enumerate(lineas_codigo, 1):
                if linea.strip():  # Solo procesar líneas no vacías
                    print(f"Procesando línea {i}: {linea}")
                    
                    # Enviar línea al analizador léxico
                    tokens_linea = self.analizador_lexico.analizador_lexico(linea)
                    
                    if tokens_linea:
                        todos_los_tokens.extend(tokens_linea)
                        print(f"Tokens obtenidos: {[token['token'] for token in tokens_linea]}")
            
            if not todos_los_tokens:
                return {
                    'error': 'No se generaron tokens del código fuente',
                    'tokens': [],
                    'resultado_sintactico': None
                }
            
            print(f"\nTodos los tokens: {[token['token'] for token in todos_los_tokens]}")
            print(f"Tipos de tokens: {[token['tipo'] for token in todos_los_tokens]}")
            
            # Procesar tokens con el analizador sintáctico
            resultado_sintactico = self.analizador_sintactico.analizar(todos_los_tokens)
            
            return {
                'tokens': todos_los_tokens,
                'resultado_sintactico': resultado_sintactico,
                'exito': resultado_sintactico.get('exito', False)
            }
            
        except Exception as e:
            return {
                'error': f'Error durante la compilación: {str(e)}',
                'tokens': [],
                'resultado_sintactico': None
            }
    
    def obtener_informacion_tokens(self, tokens):
        """Proporciona información detallada sobre los tokens generados"""
        info = {
            'total_tokens': len(tokens),
            'tipos_encontrados': {},
            'categorias_encontradas': {},
            'tokens_detallados': []
        }
        
        for token in tokens:
            # Contar tipos
            tipo = token['tipo']
            if tipo in info['tipos_encontrados']:
                info['tipos_encontrados'][tipo] += 1
            else:
                info['tipos_encontrados'][tipo] = 1
            
            # Contar categorías
            categoria = token['categoria']
            if categoria in info['categorias_encontradas']:
                info['categorias_encontradas'][categoria] += 1
            else:
                info['categorias_encontradas'][categoria] = 1
            
            # Detalles del token
            info['tokens_detallados'].append({
                'token': token['token'],
                'tipo': token['tipo'],
                'categoria': token['categoria']
            })
        
        return info