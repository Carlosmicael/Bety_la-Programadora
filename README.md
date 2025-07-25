# Cámara de Comercio de Loja - Sistema de Servicios

Una página web moderna y elegante para la Cámara de Comercio de Loja que permite a los usuarios publicar y visualizar servicios y productos consumibles.

## 🌟 Características

### ✨ Diseño Moderno
- **Colores azules elegantes** con gradientes atractivos
- **Animaciones suaves** y efectos de transición
- **Diseño responsivo** que se adapta a todos los dispositivos
- **Interfaz intuitiva** y fácil de usar

### 📝 Sistema de Publicaciones
- **Formulario completo** para crear publicaciones
- **Campos incluidos**:
  - Título de la publicación (máx. 200 caracteres)
  - Contenido descriptivo
  - Categoría de servicio
  - Múltiples imágenes (opcional)
  - Fecha de creación automática

### 🖼️ Gestión de Imágenes
- **Carga múltiple** de imágenes
- **Drag & drop** para facilitar la subida
- **Vista previa** de imágenes seleccionadas
- **Validación** de formato y tamaño (máx. 5MB por imagen)
- **Eliminación individual** de imágenes

### 🎯 Secciones Principales
1. **Inicio** - Hero section con información institucional
2. **¿Por qué elegirnos?** - Beneficios y características
3. **Publicaciones** - Sistema de publicaciones de servicios
4. **Servicios** - Catálogo de servicios ofrecidos
5. **Contacto** - Información de contacto

## 🚀 Cómo usar

### Para abrir la página:
1. Abre el archivo `index.html` en tu navegador web
2. La página se cargará automáticamente con el diseño completo

### Para crear una publicación:
1. Ve a la sección "Publicaciones"
2. Completa el formulario con:
   - **Título**: Nombre de tu servicio o producto
   - **Servicio**: Selecciona la categoría apropiada
   - **Contenido**: Descripción detallada
   - **Imágenes**: Sube fotos (opcional)
3. Haz clic en "Publicar"
4. Tu publicación aparecerá inmediatamente en la lista

### Navegación:
- Usa el menú superior para navegar entre secciones
- En dispositivos móviles, usa el menú hamburguesa
- Los enlaces se desplazan suavemente a cada sección

## 🎨 Características de Diseño

### Colores Principales:
- **Azul Primario**: #1e40af
- **Azul Secundario**: #3b82f6  
- **Azul Claro**: #60a5fa
- **Gradientes**: Combinaciones suaves de azules

### Animaciones:
- **Fade in up**: Elementos aparecen desde abajo
- **Float**: Tarjetas flotantes en el hero
- **Hover effects**: Efectos al pasar el mouse
- **Scroll animations**: Animaciones al hacer scroll

### Responsividad:
- **Desktop**: Diseño completo con todas las características
- **Tablet**: Adaptación de columnas y espaciado
- **Mobile**: Menú hamburguesa y diseño vertical

## 📱 Compatibilidad

- ✅ Chrome (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Dispositivos móviles (iOS/Android)

## 🔧 Estructura de Archivos

```
/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidad JavaScript
└── README.md           # Este archivo
```

## 📋 Campos del Modelo de Publicación

El sistema maneja publicaciones con la siguiente estructura (compatible con Django):

```python
class Publicacion(models.Model):
    autor = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'is_superuser': True})
    titulo = models.CharField(max_length=200)
    contenido = models.TextField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    servicio = models.ForeignKey(Servicios, on_delete=models.CASCADE)

class ImagenPublicacion(models.Model):
    publicacion = models.ForeignKey(Publicacion, related_name='imagenes', on_delete=models.CASCADE)
    imagen = models.ImageField(upload_to='publicaciones/')
```

## 🎯 Funcionalidades JavaScript

- **Gestión de formularios**: Validación y envío
- **Carga de imágenes**: Preview y validación
- **Navegación suave**: Scroll animado entre secciones
- **Responsive menu**: Menú móvil funcional
- **Notificaciones**: Mensajes de éxito/error
- **Animaciones**: Efectos visuales y transiciones

## 🌐 Información Institucional Incluida

La página incluye toda la información solicitada:

- **Misión institucional**: "Nuestro gremio a lo largo de los años..."
- **Beneficios**: Múltiples beneficios para afiliados
- **Razones para elegir**: Seguridad, herramientas de calidad, componente humano
- **Servicios**: Certificaciones, capacitación, networking, consultoría

## 📞 Personalización

Para personalizar la información de contacto, edita las siguientes secciones en `index.html`:

- Dirección en la sección de contacto
- Teléfono y email
- Enlaces de redes sociales
- Logo e información institucional

## 🚀 Próximas Mejoras

- Integración con base de datos
- Sistema de autenticación
- Panel de administración
- Búsqueda y filtros avanzados
- Sistema de comentarios
- Galería de imágenes expandida

---

**Desarrollado para la Cámara de Comercio de Loja**  
*Sistema de gestión de servicios y publicaciones* 
