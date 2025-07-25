import re

class AnalizadorLexico:
    def __init__(self):
        # Definir patrones para tokens
        self.patrones = [
            ('IDENTIFICADOR', r'[a-zA-Z_][a-zA-Z0-9_]*'),
            ('NUMERO', r'\d+'),
            ('TEXTO', r'"[^"]*"'),
            ('MAYOR_IGUAL', r'>='),
            ('IGUAL', r'='),
            ('PARENTESIS_IZQ', r'\('),
            ('PARENTESIS_DER', r'\)'),
            ('LLAVE_IZQ', r'\{'),
            ('LLAVE_DER', r'\}'),
            ('COMA', r','),
            ('DOLAR', r'\$'),
            ('ESPACIO', r'\s+'),
        ]
        
        # Palabras reservadas
        self.palabras_reservadas = {
            'Start': 'Start',
            'text': 'text',
            'if': 'if',
            'Else': 'Else'
        }
    
    def analizador_lexico(self, codigo):
        """
        Analiza el código y devuelve una lista de tokens
        """
        tokens = []
        lineas = codigo.split('\n')
        
        for linea in lineas:
            if not linea.strip():
                continue
                
            posicion = 0
            while posicion < len(linea):
                encontrado = False
                
                for nombre_token, patron in self.patrones:
                    regex = re.compile(patron)
                    match = regex.match(linea, posicion)
                    
                    if match:
                        valor = match.group(0)
                        
                        if nombre_token == 'ESPACIO':
                            posicion = match.end()
                            encontrado = True
                            break
                        
                        # Verificar si es palabra reservada
                        if nombre_token == 'IDENTIFICADOR':
                            if valor in self.palabras_reservadas:
                                tokens.append({
                                    'token': valor,
                                    'tipo': self.palabras_reservadas[valor],
                                    'categoria': 'palabra_reservada'
                                })
                            else:
                                tokens.append({
                                    'token': valor,
                                    'tipo': 'id',
                                    'categoria': 'identificador_valido'
                                })
                        else:
                            # Mapear otros tokens
                            tipo_token = self._mapear_tipo_token(nombre_token, valor)
                            tokens.append({
                                'token': valor,
                                'tipo': tipo_token,
                                'categoria': 'simbolo_valido'
                            })
                        
                        posicion = match.end()
                        encontrado = True
                        break
                
                if not encontrado:
                    # Token no reconocido
                    tokens.append({
                        'token': linea[posicion],
                        'tipo': 'ERROR',
                        'categoria': 'error'
                    })
                    posicion += 1
        
        return tokens
    
    def _mapear_tipo_token(self, nombre_token, valor):
        """Mapea los nombres de tokens a los símbolos de la gramática"""
        mapeo = {
            'PARENTESIS_IZQ': '(',
            'PARENTESIS_DER': ')',
            'LLAVE_IZQ': '{',
            'LLAVE_DER': '}',
            'COMA': ',',
            'MAYOR_IGUAL': '>=',
            'IGUAL': '=',
            'DOLAR': '$',
            'NUMERO': 'id',  # Los números se tratan como identificadores en esta gramática
            'TEXTO': 'text'
        }
        return mapeo.get(nombre_token, valor)