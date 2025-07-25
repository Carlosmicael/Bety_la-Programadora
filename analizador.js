// Definiciones de tokens mejoradas
const tokenDefs = [
    { re: /^\/#([\s\S]*?)#\//, sig: "Comentario multilínea", cat: "Comentario" },
    { re: /^\/#.*(?:\r?\n|$)/, sig: "Comentario de una línea", cat: "Comentario" },
    { re: /^"(?:\\.|[^"])*"/, sig: "Constante de texto", cat: "Cadena" },
    { re: /^'(?:\\.|[^'])*'/, sig: "Constante carácter", cat: "Carácter" },
    { re: /^\d+\.\d+/, sig: "Número decimal", cat: "Numérico" },
    { re: /^\.\d+/, sig: "Número decimal", cat: "Numérico" },
    { re: /^\d+/, sig: "Número entero", cat: "Numérico" },

    { re: /^(?:const|let|var)\b/, sig: "Declaración var.", cat: "Palabra reservada" },
    { re: /^(?:text|number|bo|ch)\b/, sig: "Tipo de dato", cat: "Palabra reservada" },
    { re: /^(?:true|false)\b/, sig: "Booleano", cat: "Palabra reservada" },
    { re: /^(?:if|else|for|fun|match|case|default|length|return)\b/, sig: "Control/Estructura", cat: "Palabra reservada" },
    { re: /^(?:pr|cl)\b/, sig: "Salida", cat: "Palabra reservada" },
    { re: /^pi\b/, sig: "Constante π", cat: "Palabra reservada" },

    { re: /^=>/, sig: "Flecha", cat: "Asignación / arrow" },
    { re: /^>=/, sig: "Mayor o igual", cat: "Comparación" },
    { re: /^<=/, sig: "Menor o igual", cat: "Comparación" },
    { re: /^>/, sig: "Mayor", cat: "Comparación" },
    { re: /^</, sig: "Menor", cat: "Comparación" },
    { re: /^==/, sig: "Igual igual", cat: "Comparación" },
    { re: /^!=/, sig: "Diferente de", cat: "Comparación" },
    { re: /^&&/, sig: "And lógico", cat: "Lógico" },
    { re: /^\|\|/, sig: "Or lógico", cat: "Lógico" },
    { re: /^!/, sig: "Negación", cat: "Lógico" },
    { re: /^\?/, sig: "Ternario", cat: "Operador ternario" },
    { re: /^:/, sig: "dos puntos", cat: "Asignación" },
    { re: /^=/, sig: "Asignación (igual)", cat: "Asignación" },

    { re: /^\+/, sig: "Suma", cat: "Aritmético" },
    { re: /^\-/, sig: "Resta", cat: "Aritmético" },
    { re: /^\*/, sig: "Multiplicación", cat: "Aritmético" },
    { re: /^\//, sig: "División", cat: "Aritmético" },
    { re: /^%/, sig: "Porcentaje", cat: "Aritmético" },

    { re: /^\[/, sig: "Corchete abierto", cat: "Agrupación" },
    { re: /^\]/, sig: "Corchete cerrado", cat: "Agrupación" },
    { re: /^\{/, sig: "Llave abierta", cat: "Agrupación" },
    { re: /^\}/, sig: "Llave cerrada", cat: "Agrupación" },
    { re: /^\(/, sig: "Paréntesis abierto", cat: "Agrupación" },
    { re: /^\)/, sig: "Paréntesis cerrado", cat: "Agrupación" },
    { re: /^,/, sig: "Coma", cat: "Separador" },
    { re: /^;/, sig: "Punto y coma", cat: "Separador" },
    { re: /^\./, sig: "Punto", cat: "Separador" },

    { re: /^_[A-Za-záéíóúÁÉÍÓÚñÑ][A-Za-záéíóúÁÉÍÓÚñÑ0-9_]*/, sig: "Identificador", cat: "Letra/nombre" },
    { re: /^[A-Za-záéíóúÁÉÍÓÚñÑ][A-Za-záéíóúÁÉÍÓÚñÑ0-9_]*/, sig: "Identificador", cat: "Letra/nombre" },

    { re: /^\s+/, ignore: true },
];

// Tablas para el analizador sintáctico LR
const tablaAcciones = {
    0: {
        'id': { 'd': 1 },
        'let': { 'd': 2 },
        'if': { 'd': 3 },
        'fun': { 'd': 4 },
        'pr': { 'd': 5 },
        '$': { 'acep': true }
    },
    1: {
        '=': { 'd': 6 },
        '+': { 'r': 1 },
        '-': { 'r': 1 },
        '*': { 'r': 1 },
        '/': { 'r': 1 },
        ';': { 'r': 1 },
        ')': { 'r': 1 },
        '$': { 'r': 1 }
    },
    2: {
        'id': { 'd': 7 }
    },
    3: {
        '(': { 'd': 8 }
    },
    4: {
        'id': { 'd': 9 }
    },
    5: {
        '(': { 'd': 10 }
    },
    6: {
        'id': { 'd': 11 },
        'number': { 'd': 12 },
        'string': { 'd': 13 }
    },
    7: {
        '=': { 'd': 14 }
    },
    8: {
        'id': { 'd': 15 },
        'number': { 'd': 16 }
    },
    9: {
        '(': { 'd': 17 }
    },
    10: {
        'string': { 'd': 18 },
        'id': { 'd': 19 }
    }
};

const reglasReduccion = {
    'r1': { 'E': 'id' },
    'r2': { 'S': 'let id = E ;' },
    'r3': { 'S': 'id = E ;' },
    'r4': { 'E': 'E + E' },
    'r5': { 'E': 'E - E' },
    'r6': { 'E': 'E * E' },
    'r7': { 'E': 'E / E' },
    'r8': { 'E': '( E )' },
    'r9': { 'E': 'number' },
    'r10': { 'E': 'string' },
    'r11': { 'S': 'if ( E ) { S }' },
    'r12': { 'S': 'fun id ( params ) => { S }' },
    'r13': { 'S': 'pr ( E )' }
};

// Función mejorada de análisis léxico
function analizar() {
    const code = document.getElementById('inputCode').value;
    const tabla = document.querySelector('#tablaTokens');
    const erroresDiv = document.getElementById('errores');
    
    // Limpiar resultados anteriores
    tabla.innerHTML = '';
    erroresDiv.innerHTML = '';

    if (!code.trim()) {
        tabla.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; color: var(--text-muted); padding: 2rem;">
                    <i class="fas fa-info-circle"></i>
                    Ingresa código para analizar
                </td>
            </tr>
        `;
        return [];
    }

    let tokens = [];
    let idx = 0;
    let numeroToken = 1;
    let errores = [];

    while (idx < code.length) {
        let matched = false;
        
        for (const def of tokenDefs) {
            const textoRest = code.slice(idx);
            const m = def.re.exec(textoRest);
            
            if (m) {
                matched = true;
                const tok = m[0];
                
                if (!def.ignore) {
                    // Crear objeto token
                    const tokenObj = {
                        valor: tok,
                        tipo: def.sig,
                        categoria: def.cat,
                        posicion: idx
                    };
                    
                    tokens.push(tokenObj);
                    
                    // Agregar fila a la tabla
                    const row = tabla.insertRow();
                    row.insertCell().textContent = numeroToken++;
                    row.insertCell().textContent = tok;
                    row.insertCell().textContent = def.sig;
                    row.insertCell().textContent = def.cat;
                    
                    // Agregar clase para resaltado
                    row.className = 'token-row';
                }
                
                idx += tok.length;
                break;
            }
        }
        
        if (!matched) {
            // Token desconocido
            const error = `Token no reconocido en posición ${idx}: "${code[idx]}"`;
            errores.push(error);
            
            erroresDiv.innerHTML += `
                <div class="error">
                    <i class="fas fa-exclamation-circle"></i>
                    ${error}
                </div>
            `;
            idx++;
        }
    }

    // Agregar token de fin de cadena
    tokens.push({ valor: '$', tipo: 'Fin de cadena', categoria: 'Control' });
    
    // Mostrar errores si existen
    if (errores.length > 0) {
        erroresDiv.innerHTML = `
            <div class="error-container">
                <h4><i class="fas fa-exclamation-triangle"></i> Errores encontrados:</h4>
                ${errores.map(error => `<div class="error">${error}</div>`).join('')}
            </div>
        `;
    } else {
        erroresDiv.innerHTML = `
            <div style="text-align: center; color: var(--success-color); padding: 1rem;">
                <i class="fas fa-check-circle" style="font-size: 1.5rem; margin-bottom: 0.5rem; display: block;"></i>
                Análisis léxico completado sin errores
            </div>
        `;
    }

    return tokens;
}

// Función mejorada del analizador sintáctico LR
function parserLR(lineasCodigo) {
    const consolaSintactico = document.getElementById('consolaSintactico');
    consolaSintactico.innerHTML = '';
    
    function log(mensaje, tipo = 'info') {
        const div = document.createElement('div');
        div.className = `console-line ${tipo}`;
        div.innerHTML = `<span style="color: var(--text-muted);">[${new Date().toLocaleTimeString()}]</span> ${mensaje}`;
        consolaSintactico.appendChild(div);
        consolaSintactico.scrollTop = consolaSintactico.scrollHeight;
    }

    log('<i class="fas fa-play"></i> Iniciando análisis sintáctico LR...', 'info');

    try {
        for (let indexLinea = 0; indexLinea < lineasCodigo.length; indexLinea++) {
            let linea = lineasCodigo[indexLinea].trim();
            
            if (!linea) continue; // Saltar líneas vacías
            
            log(`<br><i class="fas fa-arrow-right"></i> Analizando línea ${indexLinea + 1}: <code>${linea}</code>`, 'info');

            // Obtener tokens de la línea
            let tokens = analizarLinea(linea);
            log(`Tokens encontrados: ${tokens.length}`, 'info');

            // Inicializar pila y estado
            let pila = [0];
            let estado = 0;
            let aceptado = false;

            log(`Estado inicial de la pila: [${pila.join(', ')}]`, 'info');

            // Procesar cada token
            for (let tokenIndex = 0; tokenIndex < tokens.length; tokenIndex++) {
                const token = tokens[tokenIndex];
                const tokenKey = obtenerClaveToken(token);
                
                log(`Procesando token: "${token.valor}" (${tokenKey})`, 'info');

                let procesamientoCompleto = false;
                let intentos = 0;
                const maxIntentos = 10; // Prevenir bucles infinitos

                while (!procesamientoCompleto && intentos < maxIntentos) {
                    intentos++;
                    estado = pila[pila.length - 1];
                    
                    if (!tablaAcciones[estado]) {
                        log(`❌ Error: Estado ${estado} no encontrado en tabla de acciones`, 'error');
                        break;
                    }

                    const accion = tablaAcciones[estado][tokenKey];
                    
                    if (!accion) {
                        log(`❌ Error sintáctico: No hay acción para token "${tokenKey}" en estado ${estado}`, 'error');
                        break;
                    }

                    const tipoAccion = Object.keys(accion)[0];
                    const valorAccion = accion[tipoAccion];

                    if (tipoAccion === 'd') {
                        // Desplazamiento
                        pila.push(tokenKey);
                        pila.push(valorAccion);
                        log(`⬆️ Desplazamiento: pila = [${pila.join(', ')}]`, 'success');
                        procesamientoCompleto = true;
                        
                    } else if (tipoAccion === 'r') {
                        // Reducción
                        const reglaKey = 'r' + valorAccion;
                        const regla = reglasReduccion[reglaKey];
                        
                        if (!regla) {
                            log(`❌ Error: Regla ${reglaKey} no encontrada`, 'error');
                            break;
                        }

                        const noTerminal = Object.keys(regla)[0];
                        const produccion = regla[noTerminal];
                        
                        // Calcular elementos a remover (aproximación)
                        const elementosARemover = produccion.split(' ').length * 2;
                        
                        // Remover elementos de la pila
                        for (let i = 0; i < elementosARemover && pila.length > 1; i++) {
                            pila.pop();
                        }
                        
                        // Agregar no terminal
                        const estadoAnterior = pila[pila.length - 1];
                        pila.push(noTerminal);
                        
                        // Buscar nuevo estado (simplificado)
                        const nuevoEstado = estadoAnterior + 1; // Simplificación
                        pila.push(nuevoEstado);
                        
                        log(`🔄 Reducción con regla ${reglaKey}: ${noTerminal} → ${produccion}`, 'warning');
                        log(`   Pila después de reducción: [${pila.join(', ')}]`, 'warning');
                        
                    } else if (tipoAccion === 'acep') {
                        // Aceptación
                        log(`✅ ¡Cadena aceptada!`, 'success');
                        aceptado = true;
                        procesamientoCompleto = true;
                    }
                }

                if (intentos >= maxIntentos) {
                    log(`⚠️ Advertencia: Se alcanzó el máximo de intentos para el token "${tokenKey}"`, 'warning');
                }
            }

            if (aceptado) {
                log(`✅ Línea ${indexLinea + 1} analizada correctamente`, 'success');
            } else {
                log(`❌ Error en el análisis de la línea ${indexLinea + 1}`, 'error');
            }
        }

        log('<br><i class="fas fa-check"></i> Análisis sintáctico completado', 'success');
        
    } catch (error) {
        log(`❌ Error crítico durante el análisis: ${error.message}`, 'error');
        console.error('Error en parserLR:', error);
    }
}

// Función auxiliar para analizar una línea específica
function analizarLinea(linea) {
    let tokens = [];
    let idx = 0;

    while (idx < linea.length) {
        let matched = false;
        
        for (const def of tokenDefs) {
            const textoRest = linea.slice(idx);
            const m = def.re.exec(textoRest);
            
            if (m) {
                matched = true;
                const tok = m[0];
                
                if (!def.ignore) {
                    tokens.push({
                        valor: tok,
                        tipo: def.sig,
                        categoria: def.cat,
                        posicion: idx
                    });
                }
                
                idx += tok.length;
                break;
            }
        }
        
        if (!matched) {
            idx++; // Saltar caracteres no reconocidos
        }
    }

    // Agregar token de fin
    tokens.push({ valor: '$', tipo: 'Fin de cadena', categoria: 'Control' });
    return tokens;
}

// Función auxiliar para obtener la clave del token para la tabla de acciones
function obtenerClaveToken(token) {
    const valor = token.valor;
    const tipo = token.tipo;
    
    // Mapear tokens específicos
    if (valor === '$') return '$';
    if (tipo === 'Identificador') return 'id';
    if (tipo === 'Número entero' || tipo === 'Número decimal') return 'number';
    if (tipo === 'Constante de texto') return 'string';
    
    // Palabras reservadas y operadores
    const palabrasReservadas = ['let', 'if', 'fun', 'pr', 'const', 'var'];
    if (palabrasReservadas.includes(valor)) return valor;
    
    // Operadores y símbolos
    const operadores = ['+', '-', '*', '/', '=', '(', ')', '{', '}', ';', ','];
    if (operadores.includes(valor)) return valor;
    
    // Por defecto, usar el valor del token
    return valor;
}

// Función para validar identificadores
function esIdentificadorValido(token) {
    return token.tipo === 'Identificador' && 
           /^[A-Za-záéíóúÁÉÍÓÚñÑ_][A-Za-záéíóúÁÉÍÓÚñÑ0-9_]*$/.test(token.valor);
}

// Mejorar la visualización de errores
function mostrarError(mensaje, linea = null, posicion = null) {
    const erroresDiv = document.getElementById('errores');
    const errorElement = document.createElement('div');
    errorElement.className = 'error';
    
    let errorText = `<i class="fas fa-exclamation-circle"></i> ${mensaje}`;
    if (linea !== null) errorText += ` (Línea: ${linea})`;
    if (posicion !== null) errorText += ` (Posición: ${posicion})`;
    
    errorElement.innerHTML = errorText;
    erroresDiv.appendChild(errorElement);
}

// Exportar funciones para uso global
window.analizar = analizar;
window.parserLR = parserLR;