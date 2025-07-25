import re

class AnalizadorSintactico:
    def __init__(self):
        # Tabla ACTION de la gramática LR
        self.tabla_action = {
            0: {'$': None, 'Start': 's2', '(': None, ')': None, '{': None, '}': None, 'text': None, 'id': None, ',': None, 'if': None, 'Else': None, '>=': None, '=': None},
            1: {'$': 's3', 'Start': None, '(': None, ')': None, '{': None, '}': None, 'text': None, 'id': None, ',': None, 'if': None, 'Else': None, '>=': None, '=': None},
            2: {'$': None, 'Start': None, '(': 's4', ')': None, '{': None, '}': None, 'text': None, 'id': None, ',': None, 'if': None, 'Else': None, '>=': None, '=': None},
            3: {'$': 'r1', 'Start': None, '(': None, ')': None, '{': None, '}': None, 'text': None, 'id': None, ',': None, 'if': None, 'Else': None, '>=': None, '=': None},
            4: {'$': None, 'Start': None, '(': None, ')': 's5', '{': None, '}': None, 'text': None, 'id': None, ',': None, 'if': None, 'Else': None, '>=': None, '=': None},
            5: {'$': None, 'Start': None, '(': None, ')': None, '{': 's6', '}': None, 'text': None, 'id': None, ',': None, 'if': None, 'Else': None, '>=': None, '=': None},
            6: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': None, 'text': 's16', 'id': 's14', ',': None, 'if': 's13', 'Else': None, '>=': None, '=': None},
            7: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': 's17', 'text': None, 'id': None, ',': None, 'if': None, 'Else': None, '>=': None, '=': None},
            8: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': 'r3', 'text': 's16', 'id': 's14', ',': None, 'if': 's13', 'Else': None, '>=': None, '=': None},
            9: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': 'r5', 'text': 'r5', 'id': 'r5', ',': None, 'if': 'r5', 'Else': None, '>=': None, '=': None},
            10: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': 'r10', 'text': 'r10', 'id': 'r10', ',': None, 'if': 'r10', 'Else': None, '>=': None, '=': None},
            11: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': 'r15', 'text': 'r15', 'id': 'r15', ',': None, 'if': 'r15', 'Else': None, '>=': None, '=': None},
            12: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': 'r6', 'text': 's16', 'id': 'r6', ',': None, 'if': 'r6', 'Else': None, '>=': None, '=': None},
            13: {'$': None, 'Start': None, '(': 's20', ')': None, '{': None, '}': None, 'text': None, 'id': None, ',': None, 'if': None, 'Else': None, '>=': None, '=': None},
            14: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': None, 'text': None, 'id': None, ',': None, 'if': None, 'Else': None, '>=': None, '=': 's21'},
            15: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': None, 'text': None, 'id': 's23', ',': 's23', 'if': None, 'Else': None, '>=': None, '=': None},
            16: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': 'r9', 'text': 'r9', 'id': 'r9', ',': 'r9', 'if': 'r9', 'Else': None, '>=': None, '=': None},
            17: {'$': 'r2', 'Start': None, '(': None, ')': None, '{': None, '}': None, 'text': None, 'id': None, ',': None, 'if': None, 'Else': None, '>=': None, '=': None},
            18: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': 'r3', 'text': None, 'id': None, ',': None, 'if': None, 'Else': None, '>=': None, '=': None},
            19: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': 'r6', 'text': 'r6', 'id': 'r6', ',': None, 'if': 'r6', 'Else': None, '>=': None, '=': None},
            20: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': None, 'text': None, 'id': 's25', ',': None, 'if': None, 'Else': None, '>=': None, '=': None},
            21: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': None, 'text': None, 'id': None, ',': None, 'if': None, 'Else': None, '>=': None, '=': None},
            22: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': 'r8', 'text': 'r8', 'id': 'r8', ',': None, 'if': 'r8', 'Else': None, '>=': None, '=': None},
            23: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': 'r14', 'text': 'r14', 'id': 's27', ',': 's23', 'if': 'r14', 'Else': None, '>=': None, '=': None},
            24: {'$': None, 'Start': None, '(': None, ')': 's28', '{': None, '}': None, 'text': None, 'id': None, ',': None, 'if': None, 'Else': None, '>=': None, '=': None},
            25: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': None, 'text': None, 'id': None, ',': None, 'if': None, 'Else': None, '>=': 's30', '=': None},
            26: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': 'r16', 'text': 'r16', 'id': 'r16', ',': None, 'if': 'r16', 'Else': None, '>=': None, '=': None},
            27: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': 'r14', 'text': 'r14', 'id': 's27', ',': 's23', 'if': 'r14', 'Else': None, '>=': None, '=': None},
            28: {'$': None, 'Start': None, '(': None, ')': None, '{': 's32', '}': None, 'text': None, 'id': None, ',': None, 'if': None, 'Else': None, '>=': None, '=': None},
            29: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': None, 'text': None, 'id': 's33', ',': None, 'if': None, 'Else': None, '>=': None, '=': None},
            30: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': None, 'text': None, 'id': None, ',': 'r13', 'if': None, 'Else': None, '>=': None, '=': None},
            31: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': 'r9', 'text': 'r9', 'id': 'r9', ',': None, 'if': 'r9', 'Else': None, '>=': None, '=': None},
            32: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': None, 'text': 's16', 'id': 's14', ',': None, 'if': 's13', 'Else': None, '>=': None, '=': None},
            33: {'$': None, 'Start': None, '(': None, ')': 'r12', '{': None, '}': None, 'text': None, 'id': None, ',': None, 'if': None, 'Else': None, '>=': None, '=': None},
            34: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': 's35', 'text': None, 'id': None, ',': None, 'if': None, 'Else': None, '>=': None, '=': None},
            35: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': None, 'text': None, 'id': None, ',': None, 'if': None, 'Else': 's36', '>=': None, '=': None},
            36: {'$': None, 'Start': None, '(': None, ')': None, '{': 's37', '}': None, 'text': None, 'id': None, ',': None, 'if': None, 'Else': None, '>=': None, '=': None},
            37: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': None, 'text': 's16', 'id': 's14', ',': None, 'if': 's13', 'Else': None, '>=': None, '=': None},
            38: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': 's39', 'text': None, 'id': None, ',': None, 'if': None, 'Else': None, '>=': None, '=': None},
            39: {'$': None, 'Start': None, '(': None, ')': None, '{': None, '}': 'r11', 'text': 'r11', 'id': 'r11', ',': None, 'if': 'r11', 'Else': None, '>=': None, '=': None}
        }
        
        # Tabla GOTO
        self.tabla_goto = {
            0: {'E': None, '$': None, "I'": 1, 'I': 1, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            1: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            2: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            3: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            4: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            5: {'E': None, '$': None, "I'": None, 'I': None, 'B': 7, 'US': 8, 'DV': 9, 'V': 12, 'TV': 15, 'LV': 22, 'IF': 10, 'COND': None, 'OR': None, 'Asig': 11},
            6: {'E': None, '$': None, "I'": None, 'I': None, 'B': 7, 'US': 8, 'DV': 9, 'V': 12, 'TV': 15, 'LV': 22, 'IF': 10, 'COND': None, 'OR': None, 'Asig': 11},
            7: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            8: {'E': None, '$': None, "I'": None, 'I': None, 'B': 18, 'US': 8, 'DV': 9, 'V': 12, 'TV': 15, 'LV': 22, 'IF': 10, 'COND': None, 'OR': None, 'Asig': 11},
            9: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            10: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            11: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            12: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': 19, 'V': 12, 'TV': 15, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            13: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            14: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            15: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': 22, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            16: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            17: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            18: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            19: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            20: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': 24, 'OR': None, 'Asig': None},
            21: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            22: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            23: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': 31, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            24: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            25: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': 29, 'Asig': None},
            26: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            27: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': 31, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            28: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            29: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            30: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            31: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            32: {'E': None, '$': None, "I'": None, 'I': None, 'B': 34, 'US': 8, 'DV': 9, 'V': 12, 'TV': 15, 'LV': 22, 'IF': 10, 'COND': None, 'OR': None, 'Asig': 11},
            33: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            34: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            35: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            36: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            37: {'E': None, '$': None, "I'": None, 'I': None, 'B': 38, 'US': 8, 'DV': 9, 'V': 12, 'TV': 15, 'LV': 22, 'IF': 10, 'COND': None, 'OR': None, 'Asig': 11},
            38: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None},
            39: {'E': None, '$': None, "I'": None, 'I': None, 'B': None, 'US': None, 'DV': None, 'V': None, 'TV': None, 'LV': None, 'IF': None, 'COND': None, 'OR': None, 'Asig': None}
        }
        
        # Tabla de reducciones
        self.tabla_reducciones = {
            'r1': {'produccion': "I' -> I $", 'elementos': 2},
            'r2': {'produccion': 'I -> Start ( ) { B }', 'elementos': 6},
            'r3': {'produccion': 'B -> US', 'elementos': 1},
            'r4': {'produccion': 'B -> US B', 'elementos': 2},
            'r5': {'produccion': 'US -> DV', 'elementos': 1},
            'r6': {'produccion': 'DV -> V', 'elementos': 1},
            'r7': {'produccion': 'DV -> V DV', 'elementos': 2},
            'r8': {'produccion': 'V -> TV LV', 'elementos': 2},
            'r9': {'produccion': 'TV -> text', 'elementos': 1},
            'r10': {'produccion': 'LV -> id , LV', 'elementos': 3},
            'r11': {'produccion': 'US -> IF', 'elementos': 1},
            'r12': {'produccion': 'IF -> if ( COND ) { B } Else { B }', 'elementos': 10},
            'r13': {'produccion': 'COND -> id OR id', 'elementos': 3},
            'r14': {'produccion': 'LV -> id', 'elementos': 1},
            'r15': {'produccion': 'US -> Asig', 'elementos': 1},
            'r16': {'produccion': 'Asig -> id = E', 'elementos': 3}
        }
        
        self.pila = []
        self.entrada = []
        self.posicion = 0
        
    def contar_palabras(self, cadena):
        """Cuenta las palabras en una cadena según las reglas especificadas"""
        # Separar por espacios y filtrar elementos vacíos
        elementos = [elem.strip() for elem in cadena.split() if elem.strip()]
        
        contador = 0
        for elemento in elementos:
            # Identificadores como ID, US, B, etc. se cuentan como una palabra
            if re.match(r'^[A-Z][A-Z\']*$', elemento):
                contador += 1
            # Caracteres especiales individuales
            elif elemento in ['(', ')', '{', '}', ',', '>=', '=', '$']:
                contador += 1
            # Palabras reservadas
            elif elemento in ['Start', 'text', 'if', 'Else', 'id']:
                contador += 1
            else:
                # Para otros casos, contar cada carácter no alfabético como separado
                i = 0
                while i < len(elemento):
                    if elemento[i].isalpha():
                        # Encontrar toda la secuencia alfabética
                        j = i
                        while j < len(elemento) and elemento[j].isalpha():
                            j += 1
                        contador += 1
                        i = j
                    else:
                        contador += 1
                        i += 1
        
        return contador
    
    def analizar(self, tokens):
        """Algoritmo principal del analizador LR"""
        self.pila = [0]  # Inicializar pila con estado 0
        self.entrada = [token['tipo'] for token in tokens] + ['$']
        self.posicion = 0
        
        while True:
            # Obtener estado actual (tope de la pila)
            if len(self.pila) == 1:
                estado_actual = self.pila[0]  # Solo queda s
            else:
                estado_actual = self.pila[-1]  # sprima (último elemento)
            
            # Token actual
            if self.posicion >= len(self.entrada):
                return {'error': 'Análisis terminado sin aceptación - fin de entrada'}
            token_actual = self.entrada[self.posicion]
            
            # Buscar en tabla ACTION
            if estado_actual not in self.tabla_action:
                return {'error': f'Estado {estado_actual} no encontrado en tabla ACTION'}
            
            if token_actual not in self.tabla_action[estado_actual]:
                return {'error': f'Token {token_actual} no encontrado en estado {estado_actual}'}
            
            accion = self.tabla_action[estado_actual][token_actual]
            
            if accion is None:
                return {'error': f'Acción no definida para estado {estado_actual} y token {token_actual}'}
            
            if accion == 'acc':
                return {'resultado': 'CÓDIGO ACEPTADO - ANÁLISIS FINALIZADO', 'exito': True}
            
            elif accion.startswith('s'):  # Shift
                nuevo_estado = int(accion[1:])
                
                # Meter token a la pila (como ID si es identificador válido)
                if token_actual == 'id':
                    self.pila.append('id')
                else:
                    self.pila.append(token_actual)
                
                # Meter nuevo estado a la pila
                self.pila.append(nuevo_estado)
                
                # Avanzar posición en la entrada solo si no es '$'
                if token_actual != '$':
                    self.posicion += 1
                
            elif accion.startswith('r'):  # Reduce
                reduccion = self.tabla_reducciones[accion]
                produccion = reduccion['produccion']
                elementos_a_eliminar = reduccion['elementos']
                
                # Contar palabras en la producción
                lado_derecho = produccion.split(' -> ')[1]
                palabras = self.contar_palabras(lado_derecho)
                elementos_a_quitar = palabras * 2
                
                # Eliminar elementos de la pila
                for _ in range(elementos_a_quitar):
                    if len(self.pila) > 1:
                        self.pila.pop()
                
                # Obtener el no terminal del lado izquierdo
                no_terminal = produccion.split(' -> ')[0]
                
                # Meter el no terminal a la pila
                self.pila.append(no_terminal)
                
                # Determinar estado para GOTO
                if len(self.pila) >= 2:
                    estado_goto = self.pila[-2]  # Penúltimo elemento
                else:
                    estado_goto = self.pila[0]  # Solo queda estado inicial
                
                # Verificar si es aceptación después de reducir I' -> I $
                if accion == 'r1' and no_terminal == "I'" and estado_goto == 0:
                    return {'resultado': 'CÓDIGO ACEPTADO - ANÁLISIS FINALIZADO', 'exito': True}
                
                # Buscar en tabla GOTO
                if estado_goto in self.tabla_goto and no_terminal in self.tabla_goto[estado_goto]:
                    nuevo_estado = self.tabla_goto[estado_goto][no_terminal]
                    if nuevo_estado is not None:
                        self.pila.append(nuevo_estado)
                    else:
                        return {'error': f'GOTO no definido para estado {estado_goto} y no terminal {no_terminal}'}
                else:
                    return {'error': f'Estado {estado_goto} o no terminal {no_terminal} no encontrado en tabla GOTO'}
            
            else:
                return {'error': f'Acción desconocida: {accion}'}
        
        return {'error': 'Análisis terminado sin aceptación'}