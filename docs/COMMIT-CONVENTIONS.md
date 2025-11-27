# Conventional Commits - Guía de Convenciones

## ¿Qué son los Conventional Commits?

**Conventional Commits** es una especificación para escribir mensajes de commit estructurados y semánticamente significativos. Proporciona un conjunto de reglas para crear un historial de commits explícito y fácil de seguir.

### Beneficios

- ✅ **Historial legible**: Cualquier desarrollador puede entender qué cambió y por qué
- ✅ **Automatización**: Permite generar CHANGELOGs automáticamente
- ✅ **Versionado semántico**: Facilita determinar cuándo incrementar versiones (major, minor, patch)
- ✅ **Comunicación clara**: Mejora la colaboración en equipo
- ✅ **Búsqueda eficiente**: Facilita encontrar cambios específicos en el historial

---

## Estructura de un Commit

Un commit siguiendo Conventional Commits tiene la siguiente estructura:
```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

### Componentes

#### 1. **Type** (Requerido)
Describe la **naturaleza** del cambio.

#### 2. **Scope** (Opcional)
Indica el **módulo, componente o sección** del código afectado.

#### 3. **Subject** (Requerido)
Descripción **breve** del cambio en **imperativo** presente.

#### 4. **Body** (Opcional)
Descripción **detallada** del cambio. Explica el **qué** y **por qué**, no el **cómo**.

#### 5. **Footer** (Opcional)
Información sobre **breaking changes** o referencias a **issues/tickets**.

---

## Tipos de Commits (Types)

### Types Principales

| Type | Definición | Cuándo Usarlo | Afecta Versión |
|------|-----------|---------------|----------------|
| `feat` | **Feature** - Nueva funcionalidad | Agrega una nueva característica visible para el usuario final | MINOR (0.X.0) |
| `fix` | **Bug Fix** - Corrección de errores | Soluciona un comportamiento incorrecto o error en el código existente | PATCH (0.0.X) |
| `docs` | **Documentation** - Documentación | Cambios solo en documentación (README, comentarios, guías) | - |
| `style` | **Style** - Formato | Cambios que no afectan la lógica (espacios, formato, punto y coma faltante) | - |
| `refactor` | **Refactor** - Refactorización | Cambios en el código que no agregan funcionalidad ni corrigen bugs | - |
| `perf` | **Performance** - Rendimiento | Mejoras de rendimiento sin cambiar funcionalidad | PATCH |
| `test` | **Test** - Pruebas | Agregar o corregir tests | - |
| `build` | **Build** - Construcción | Cambios en el sistema de build o dependencias externas | - |
| `ci` | **CI** - Integración Continua | Cambios en configuración de CI/CD (GitHub Actions, Jenkins, etc.) | - |
| `chore` | **Chore** - Tareas | Cambios de mantenimiento que no modifican src ni tests | - |
| `revert` | **Revert** - Revertir | Revierte un commit anterior | Depende |

---

## Definiciones Detalladas de cada Type

### `feat` - Feature (Nueva Funcionalidad)

**Definición:**  
Introduce una nueva característica o funcionalidad al sistema que antes no existía.

**Características:**
- Agrega capacidades nuevas
- Es visible para el usuario final
- Incrementa la versión MINOR en SemVer

**Qué incluye:**
- Nuevos endpoints de API
- Nuevas páginas o vistas
- Nuevas funcionalidades de negocio
- Nuevos módulos o componentes

**Qué NO incluye:**
- Correcciones de bugs
- Mejoras de código interno sin funcionalidad nueva

---

### `fix` - Bug Fix (Corrección de Errores)

**Definición:**  
Corrige un comportamiento incorrecto, error o bug en el código existente.

**Características:**
- Soluciona algo que no funcionaba correctamente
- Restaura el comportamiento esperado
- Incrementa la versión PATCH en SemVer

**Qué incluye:**
- Corrección de errores de lógica
- Solución de crashes o excepciones
- Reparación de cálculos incorrectos
- Corrección de comportamientos inesperados

**Qué NO incluye:**
- Nuevas funcionalidades
- Mejoras de rendimiento (usar `perf`)

---

### `docs` - Documentation (Documentación)

**Definición:**  
Cambios exclusivamente en documentación, sin afectar el código fuente.

**Características:**
- Solo modifica archivos de documentación
- No afecta el comportamiento del código
- No incrementa versión

**Qué incluye:**
- Actualizar README.md
- Modificar comentarios en el código
- Crear o actualizar guías de usuario
- Corregir typos en documentación
- Agregar o mejorar JSDoc/docstrings

**Qué NO incluye:**
- Cambios en código fuente
- Refactorización de código

---

### `style` - Style (Formato)

**Definición:**  
Cambios que no afectan el significado del código, solo su formato o estilo visual.

**Características:**
- No cambia la lógica del código
- Mejora la legibilidad
- No incrementa versión

**Qué incluye:**
- Espacios en blanco
- Formato de código (prettier, eslint)
- Punto y coma faltante
- Indentación
- Organización de imports
- Nombres de variables (sin cambiar lógica)

**Qué NO incluye:**
- Cambios de lógica
- Refactorización estructural

---

### `refactor` - Refactor (Refactorización)

**Definición:**  
Cambios en el código que mejoran su estructura interna sin alterar su comportamiento externo.

**Características:**
- Mejora la calidad del código
- No agrega funcionalidad nueva
- No corrige bugs
- No incrementa versión

**Qué incluye:**
- Extraer funciones o métodos
- Renombrar variables por claridad
- Simplificar código complejo
- Eliminar código duplicado
- Mejorar la arquitectura interna
- Aplicar patrones de diseño

**Qué NO incluye:**
- Nuevas features
- Corrección de bugs
- Cambios solo de formato (usar `style`)

---

### `perf` - Performance (Rendimiento)

**Definición:**  
Cambios que mejoran el rendimiento del código sin alterar su funcionalidad.

**Características:**
- Optimiza velocidad o uso de recursos
- El comportamiento sigue siendo el mismo
- Incrementa versión PATCH

**Qué incluye:**
- Optimización de algoritmos
- Reducción de queries a base de datos
- Implementación de caché
- Lazy loading
- Reducción de consumo de memoria
- Mejora de tiempos de respuesta

**Qué NO incluye:**
- Refactorización sin mejora de rendimiento
- Nuevas funcionalidades

---

### `test` - Test (Pruebas)

**Definición:**  
Agregar, modificar o corregir tests sin cambiar el código de producción.

**Características:**
- Solo afecta archivos de test
- No modifica funcionalidad
- No incrementa versión

**Qué incluye:**
- Agregar tests unitarios
- Agregar tests de integración
- Corregir tests fallidos
- Mejorar cobertura de tests
- Actualizar mocks o fixtures

**Qué NO incluye:**
- Cambios en código de producción
- Corrección de bugs (usar `fix`)

---

### `build` - Build (Construcción)

**Definición:**  
Cambios que afectan el sistema de construcción o dependencias externas.

**Características:**
- Modifica el proceso de build
- Afecta dependencias
- No incrementa versión

**Qué incluye:**
- Actualizar dependencias en package.json
- Cambios en webpack, babel, rollup
- Modificar scripts de build
- Actualizar versiones de librerías
- Cambios en configuración de bundlers

**Qué NO incluye:**
- Cambios en código fuente
- Configuración de CI/CD (usar `ci`)

---

### `ci` - CI (Integración Continua)

**Definición:**  
Cambios en configuración y scripts de sistemas de integración/despliegue continuo.

**Características:**
- Solo afecta pipelines de CI/CD
- No modifica código de aplicación
- No incrementa versión

**Qué incluye:**
- Cambios en GitHub Actions
- Modificar archivos de Jenkins
- Actualizar configuración de Travis CI
- Cambios en CircleCI
- Scripts de deployment

**Qué NO incluye:**
- Scripts de build (usar `build`)
- Código de aplicación

---

### `chore` - Chore (Tareas)

**Definición:**  
Tareas de mantenimiento rutinarias que no modifican src ni tests.

**Características:**
- Cambios administrativos
- Configuración general
- No incrementa versión

**Qué incluye:**
- Actualizar .gitignore
- Modificar configuración de editores (.editorconfig)
- Cambios en archivos de licencia
- Actualizar configuración de linters
- Tareas de housekeeping

**Qué NO incluye:**
- Código de producción
- Tests
- Documentación (usar `docs`)

---

### `revert` - Revert (Revertir)

**Definición:**  
Revierte un commit anterior, deshaciendo sus cambios.

**Características:**
- Deshace cambios previos
- Debe referenciar el commit revertido
- Incremento de versión depende del commit revertido

**Formato especial:**
```
revert: <header of reverted commit>

This reverts commit <hash>.
```

---

## Scope (Alcance)

### ¿Qué es el Scope?

El **scope** es un sustantivo que describe la sección del código afectada por el commit.

### Características

- **Opcional** pero recomendado
- Entre paréntesis después del type
- Minúsculas
- Sin espacios (usar guiones)
- Específico y claro

### Ejemplos de Scopes Comunes
```
- auth
- database
- api
- ui
- config
- models
- controllers
- services
- routes
- middleware
- utils
- validation
```

---

## Subject (Asunto)

### Reglas para el Subject

1. **Imperativo presente**: "add" no "added" ni "adds"
2. **Sin mayúscula inicial**: "add feature" no "Add feature"
3. **Sin punto final**: "add feature" no "add feature."
4. **Máximo 50-72 caracteres**
5. **Describe QUÉ hace, no CÓMO**

### Buenos subjects
```
add user authentication
fix memory leak in parser
update dependencies to latest versions
remove deprecated API endpoint
```

### Malos subjects
```
Added user authentication (no imperativo)
Fix bug (muy vago)
Changes (no descriptivo)
Updated some files (no específico)
```

---

## Body (Cuerpo)

### Cuándo usar Body

- Cuando el cambio requiere explicación adicional
- Para contexto histórico
- Para explicar el "por qué" no el "cómo"

### Formato

- Separar del subject con una línea en blanco
- Máximo 72 caracteres por línea
- Usar viñetas con `-` o `*` para listas

### Contenido del Body

**Responde:**
- ¿Por qué es necesario este cambio?
- ¿Qué problema soluciona?
- ¿Cuáles son los efectos secundarios?

---

## Footer (Pie)

### Usos del Footer

#### 1. Breaking Changes
```
BREAKING CHANGE: API endpoint /users now requires authentication
```

#### 2. Referencias a Issues
```
Closes #123
Fixes #456
Refs #789
```

#### 3. Múltiples Footers
```
Reviewed-by: Jane Doe
Refs: #123, #456
```

---

## Breaking Changes

### ¿Qué es un Breaking Change?

Un cambio que **rompe compatibilidad** con versiones anteriores.

### Cómo indicarlo

**Opción 1: En el footer**
```
feat(api): change user endpoint response format

BREAKING CHANGE: User API now returns nested object instead of flat structure
```

**Opción 2: Con `!` después del scope**
```
feat(api)!: change user endpoint response format
```

### Efecto en versión

Breaking changes incrementan la versión MAJOR (X.0.0)

---

## Reglas Generales

### Hacer (DO)

- Usar commits atómicos (un propósito por commit)
- Escribir en imperativo presente
- Ser específico y descriptivo
- Mantener subject corto (≤50 caracteres)
- Separar subject de body con línea en blanco
- Usar body para explicar "qué" y "por qué"
- Referenciar issues cuando sea relevante

### No Hacer (DON'T)

- Commits genéricos como "fix bug" o "update code"
- Mezclar múltiples cambios no relacionados
- Usar tiempo pasado ("added", "fixed")
- Commits muy grandes
- Subject con más de 72 caracteres
- Olvidar el type

---

## Plantilla de Referencia Rápida
```
<type>(<scope>): <subject>
│       │            │
│       │            └─> Resumen en imperativo, minúsculas, sin punto final (≤50 chars)
│       │
│       └─> Scope: auth, database, api, ui, etc.
│
└─> Type: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert


[Body opcional: explicación detallada]
- Qué cambió y por qué
- Contexto adicional
- Efectos secundarios


[Footer opcional]
BREAKING CHANGE: descripción
Fixes #123
Closes #456
```

---

## Recursos Adicionales

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)

---

## ✅ Checklist

Antes de hacer commit, verifica:

- [ ] El type es correcto y específico
- [ ] El subject está en imperativo presente
- [ ] El subject no excede 50 caracteres
- [ ] Hay línea en blanco entre subject y body
- [ ] El body explica el "qué" y "por qué"
- [ ] Se referencian issues relacionados
- [ ] Los breaking changes están marcados
- [ ] El commit es atómico (un propósito)

---

**Última actualización:** Diciembre 2025