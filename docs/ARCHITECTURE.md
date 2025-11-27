# Sistema Integral de Gestión Comercial - Backend

## Tabla de Contenidos
- [Introducción](#introducción)
- [Arquitectura](#arquitectura)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Explicación de Carpetas](#explicación-de-carpetas)
- [Flujo de una Petición](#flujo-de-una-petición)
- [Convenciones y Buenas Prácticas](#convenciones-y-buenas-prácticas)
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)

---

##  Introducción

Este proyecto implementa el backend de un **Sistema Integral de Gestión Comercial** para bares, tiendas y supermercados, utilizando una arquitectura moderna y escalable.

### Tecnologías Utilizadas
- **Node.js** - Runtime de JavaScript
- **Express** - Framework web minimalista
- **PostgreSQL** - Base de datos relacional
- **Sequelize** - ORM para Node.js
- **JWT** - Autenticación mediante tokens
- **Bcrypt** - Encriptación de contraseñas

---

## Arquitectura

### ¿Qué es la Arquitectura Modular por Dominios?

Es un patrón arquitectónico donde el código se organiza en **módulos independientes** basados en **dominios de negocio** (funcionalidades). Cada módulo contiene todo lo necesario para operar de manera autónoma.

### Nombres Alternativos
- **Modular Monolithic Architecture** (Monolito Modular)
- **Vertical Slice Architecture** (Arquitectura de Corte Vertical)
- **Package by Feature** (Empaquetado por Característica)
- **Domain-Driven Design Simplificado** (DDD Lite)

### Principios Fundamentales
```
┌─────────────────────────────────────────────────────────────┐
│                    MÓDULO INDEPENDIENTE                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🔷 Routes (Endpoints)        ← Define las rutas HTTP      │
│          ↓                                                  │
│  🔷 Controllers               ← Maneja las peticiones       │
│          ↓                                                  │
│  🔷 Services                  ← Lógica de negocio           │
│          ↓                                                  │
│  🔷 Models                    ← Entidades de base de datos  │
│                                                             │
│  🔷 Validators                ← Validaciones de entrada     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Ventajas de esta Arquitectura

| Ventaja | Descripción |
|---------|-------------|
| 🧩 **Modularidad** | Cada módulo es independiente y puede modificarse sin afectar otros |
| 📈 **Escalabilidad** | Fácil agregar nuevas funcionalidades como módulos separados |
| 🔧 **Mantenibilidad** | El código está organizado por dominio, facilitando su comprensión |
| 🧪 **Testeable** | Cada módulo puede probarse de forma aislada |
| 👥 **Trabajo en Equipo** | Múltiples desarrolladores pueden trabajar en diferentes módulos |
| 🔄 **Reusabilidad** | Los módulos pueden reutilizarse en otros proyectos |

---

## Estructura del Proyecto
```
SmartTrade-Backend/
│
├── src/                                    # Código fuente principal
│   │
│   ├── config/                             # CONFIGURACIONES GLOBALES
│   │   ├── app.js                          # Configuración general de la app
│   │   ├── database.js                     # Configuración de Sequelize/PostgreSQL
│   │   ├── jwt.js                          # Configuración de JSON Web Tokens
│   │   └── email.js                        # Configuración de correos (Nodemailer)
│   │
│   ├── modules/                            # MÓDULOS DEL SISTEMA (DOMINIOS)
│   │   │
│   │   ├── auth/                           # Módulo: Login y Seguridad
│   │   │   ├── controllers/                # Controladores del módulo
│   │   │   │   └── auth.controller.js
│   │   │   ├── services/                   # Servicios (lógica de negocio)
│   │   │   │   └── auth.service.js
│   │   │   ├── models/                     # Modelos de base de datos
│   │   │   │   ├── User.js
│   │   │   │   └── Role.js
│   │   │   ├── routes/                     # Rutas/Endpoints
│   │   │   │   └── auth.routes.js
│   │   │   └── validators/                 # Validaciones de entrada
│   │   │       └── auth.validator.js
│   │   │
│   │   ├── employees/                      # Módulo: Gestión de Empleados
│   │   │   ├── controllers/
│   │   │   │   └── employee.controller.js
│   │   │   ├── services/
│   │   │   │   └── employee.service.js
│   │   │   ├── models/
│   │   │   │   ├── Employee.js
│   │   │   │   └── Attendance.js
│   │   │   ├── routes/
│   │   │   │   └── employee.routes.js
│   │   │   └── validators/
│   │   │       └── employee.validator.js
│   │   │
│   │   ├── categories/                     # Módulo: Categorías de Productos
│   │   ├── inventory/                      # Módulo: Inventario
│   │   ├── suppliers/                      # Módulo: Proveedores
│   │   ├── purchases/                      # Módulo: Compras
│   │   ├── sales/                          # Módulo: Ventas y Facturación
│   │   ├── cashRegister/                   # Módulo: Caja y Arqueo
│   │   ├── credits/                        # Módulo: Créditos (Fiar)
│   │   ├── expenses/                       # Módulo: Gastos y Finanzas
│   │   ├── audit/                          # Módulo: Auditoría
│   │   ├── notifications/                  # Módulo: Notificaciones
│   │   ├── reports/                        # Módulo: Reportes y Dashboard
│   │   └── settings/                       # Módulo: Configuración General
│   │
│   ├── shared/                             # CÓDIGO COMPARTIDO
│   │   ├── constants/                      # Constantes del sistema
│   │   │   ├── roles.js                    # Roles de usuarios
│   │   │   ├── permissions.js              # Permisos del sistema
│   │   │   └── status.js                   # Estados (activo, inactivo, etc.)
│   │   ├── interfaces/                     # Interfaces TypeScript (si se usa)
│   │   ├── types/                          # Tipos personalizados
│   │   └── helpers/                        # Funciones auxiliares
│   │       ├── pagination.js               # Paginación de resultados
│   │       └── filters.js                  # Filtros de búsqueda
│   │
│   ├── middlewares/                        # MIDDLEWARES GLOBALES
│   │   ├── auth.middleware.js              # Verificación de autenticación
│   │   ├── error.middleware.js             # Manejo centralizado de errores
│   │   ├── validation.middleware.js        # Validación de datos
│   │   └── audit.middleware.js             # Registro de auditoría
│   │
│   ├── utils/                              # UTILIDADES GENERALES
│   │   ├── logger.js                       # Sistema de logs
│   │   ├── response.js                     # Formato de respuestas HTTP
│   │   ├── encryption.js                   # Funciones de encriptación
│   │   └── date.js                         # Manejo de fechas
│   │
│   ├── database/                           # CONFIGURACIÓN DE BASE DE DATOS
│   │   ├── index.js                        # Inicialización de Sequelize
│   │   ├── migrations/                     # Migraciones de DB
│   │   └── seeders/                        # Datos de prueba
│   │
│   ├── app.js                              # Configuración de Express
│   └── server.js                           # Punto de entrada de la app
│
├── .env                                    # Variables de entorno (NO subir a git)
├── .env.example                            # Ejemplo de variables de entorno
├── .gitignore                              # Archivos ignorados por git
├── .sequelizerc                            # Configuración de Sequelize CLI
├── package.json                            # Dependencias del proyecto
└── README.md                               # Este archivo
```

---

## Explicación de Carpetas

### `/src/config/` - Configuraciones Globales

Contiene archivos de configuración que se usan en toda la aplicación.

| Archivo | Propósito | Ejemplo de Contenido |
|---------|-----------|----------------------|
| `app.js` | Configuración general de la app | Puerto, CORS, límites de peticiones |
| `database.js` | Conexión a PostgreSQL con Sequelize | Host, puerto, credenciales, pool |
| `jwt.js` | Configuración de tokens JWT | Secret key, tiempo de expiración |
| `email.js` | Configuración de correos | SMTP, credenciales de Nodemailer |

**Ejemplo: `config/database.js`**
```javascript
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
  }
};
```

---

### `/src/modules/` - Módulos del Sistema

Cada módulo representa un **dominio de negocio** completo y autocontenido.

#### Estructura de un Módulo
```
modules/sales/
├── controllers/      ← Manejan las peticiones HTTP
├── services/         ← Contienen la lógica de negocio
├── models/           ← Definen las entidades de base de datos
├── routes/           ← Definen los endpoints del módulo
└── validators/       ← Validan los datos de entrada
```

#### **Controllers** (Controladores)

**¿Qué hacen?**
- Reciben las peticiones HTTP
- Llaman a los servicios
- Devuelven las respuestas al cliente

**Responsabilidades:**
- ✅ Recibir datos del request (body, params, query)
- ✅ Llamar al servicio correspondiente
- ✅ Formatear la respuesta
- ❌ NO contienen lógica de negocio
- ❌ NO acceden directamente a la base de datos

**Ejemplo: `sales/controllers/sale.controller.js`**
```javascript
const saleService = require('../services/sale.service');

class SaleController {
  // Crear una nueva venta
  async create(req, res, next) {
    try {
      const saleData = req.body;
      const userId = req.user.id;
      
      const sale = await saleService.createSale(saleData, userId);
      
      res.status(201).json({
        success: true,
        message: 'Venta creada exitosamente',
        data: sale
      });
    } catch (error) {
      next(error);
    }
  }

  // Listar todas las ventas
  async getAll(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      
      const sales = await saleService.getAllSales({ page, limit });
      
      res.status(200).json({
        success: true,
        data: sales
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SaleController();
```

---

#### **Services** (Servicios)

**¿Qué hacen?**
- Contienen toda la lógica de negocio
- Realizan operaciones complejas
- Coordinan múltiples modelos

**Responsabilidades:**
- ✅ Implementar reglas de negocio
- ✅ Validar datos de negocio
- ✅ Interactuar con los modelos
- ✅ Orquestar operaciones complejas
- ✅ Manejar transacciones
- ❌ NO manejan peticiones HTTP directamente

**Ejemplo: `sales/services/sale.service.js`**
```javascript
const { Sale, SaleDetail, Product } = require('../models');
const { sequelize } = require('../../database');

class SaleService {
  async createSale(saleData, userId) {
    const transaction = await sequelize.transaction();
    
    try {
      // 1. Crear la venta
      const sale = await Sale.create({
        userId,
        total: saleData.total,
        paymentMethod: saleData.paymentMethod
      }, { transaction });

      // 2. Crear los detalles de la venta
      const details = saleData.items.map(item => ({
        saleId: sale.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.quantity * item.price
      }));
      
      await SaleDetail.bulkCreate(details, { transaction });

      // 3. Actualizar el stock de cada producto
      for (const item of saleData.items) {
        await Product.decrement('stock', {
          by: item.quantity,
          where: { id: item.productId },
          transaction
        });
      }

      await transaction.commit();
      
      return sale;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getAllSales({ page, limit }) {
    const offset = (page - 1) * limit;
    
    return await Sale.findAndCountAll({
      limit,
      offset,
      include: [{ model: SaleDetail }],
      order: [['createdAt', 'DESC']]
    });
  }
}

module.exports = new SaleService();
```

---

#### **Models** (Modelos)

**¿Qué hacen?**
- Definen la estructura de las tablas
- Establecen relaciones entre tablas
- Proporcionan métodos de acceso a datos

**Responsabilidades:**
- ✅ Definir campos de la tabla
- ✅ Establecer validaciones de Sequelize
- ✅ Definir relaciones (hasMany, belongsTo, etc.)
- ✅ Hooks (beforeCreate, afterUpdate, etc.)
- ❌ NO contienen lógica de negocio compleja

**Ejemplo: `sales/models/Sale.js`**
```javascript
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database');

const Sale = sequelize.define('Sale', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  paymentMethod: {
    type: DataTypes.ENUM('cash', 'transfer', 'credit'),
    allowNull: false,
    defaultValue: 'cash'
  },
  status: {
    type: DataTypes.ENUM('completed', 'cancelled'),
    defaultValue: 'completed'
  }
}, {
  tableName: 'sales',
  timestamps: true
});

// Relaciones
Sale.associate = (models) => {
  Sale.belongsTo(models.User, { foreignKey: 'userId' });
  Sale.hasMany(models.SaleDetail, { foreignKey: 'saleId' });
};

module.exports = Sale;
```

---

#### **Routes** (Rutas)

**¿Qué hacen?**
- Definen los endpoints HTTP
- Aplican middlewares específicos
- Conectan URLs con controladores

**Responsabilidades:**
- ✅ Definir rutas (GET, POST, PUT, DELETE)
- ✅ Aplicar middlewares de autenticación
- ✅ Aplicar middlewares de validación
- ✅ Vincular rutas con controladores

**Ejemplo: `sales/routes/sale.routes.js`**
```javascript
const express = require('express');
const router = express.Router();
const saleController = require('../controllers/sale.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const validateSale = require('../validators/sale.validator');

// Todas las rutas requieren autenticación
router.use(authMiddleware.verifyToken);

// POST /api/sales - Crear nueva venta
router.post('/', 
  validateSale.create,
  saleController.create
);

// GET /api/sales - Listar todas las ventas
router.get('/', 
  saleController.getAll
);

// GET /api/sales/:id - Obtener una venta por ID
router.get('/:id', 
  saleController.getById
);

// PUT /api/sales/:id - Actualizar una venta
router.put('/:id',
  validateSale.update,
  saleController.update
);

// DELETE /api/sales/:id - Eliminar una venta
router.delete('/:id',
  saleController.delete
);

module.exports = router;
```

---

#### **Validators** (Validadores)

**¿Qué hacen?**
- Validan los datos de entrada
- Verifican tipos de datos
- Aseguran que los datos cumplen reglas

**Responsabilidades:**
- ✅ Validar formato de datos
- ✅ Verificar campos requeridos
- ✅ Validar tipos de datos
- ✅ Sanitizar entrada de usuario

**Ejemplo: `sales/validators/sale.validator.js`**
```javascript
const { body, param, validationResult } = require('express-validator');

const saleValidator = {
  create: [
    body('items')
      .isArray({ min: 1 })
      .withMessage('Debe incluir al menos un producto'),
    
    body('items.*.productId')
      .isInt()
      .withMessage('ID de producto inválido'),
    
    body('items.*.quantity')
      .isInt({ min: 1 })
      .withMessage('La cantidad debe ser mayor a 0'),
    
    body('paymentMethod')
      .isIn(['cash', 'transfer', 'credit'])
      .withMessage('Método de pago inválido'),
    
    body('total')
      .isFloat({ min: 0 })
      .withMessage('El total debe ser mayor o igual a 0'),
    
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }
      next();
    }
  ],

  update: [
    param('id')
      .isInt()
      .withMessage('ID inválido'),
    
    body('status')
      .optional()
      .isIn(['completed', 'cancelled'])
      .withMessage('Estado inválido'),
    
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }
      next();
    }
  ]
};

module.exports = saleValidator;
```

---

### `/src/shared/` - Código Compartido

Contiene código que puede ser usado por múltiples módulos.

#### `/shared/constants/`

**Constantes del sistema** que no cambian.

**Ejemplo: `shared/constants/roles.js`**
```javascript
module.exports = {
  ADMIN: 'admin',
  CASHIER: 'cashier',
  SUPERVISOR: 'supervisor',
  EMPLOYEE: 'employee'
};
```

**Ejemplo: `shared/constants/status.js`**
```javascript
module.exports = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};
```

#### `/shared/helpers/`

**Funciones auxiliares** reutilizables.

**Ejemplo: `shared/helpers/pagination.js`**
```javascript
const paginate = (page = 1, limit = 10) => {
  const offset = (parseInt(page) - 1) * parseInt(limit);
  
  return {
    limit: parseInt(limit),
    offset
  };
};

const paginateResponse = (data, page, limit) => {
  const totalPages = Math.ceil(data.count / limit);
  
  return {
    data: data.rows,
    pagination: {
      total: data.count,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  };
};

module.exports = { paginate, paginateResponse };
```

---

### `/src/middlewares/` - Middlewares Globales

Funciones que se ejecutan antes de los controladores.

#### `auth.middleware.js`

Verifica que el usuario esté autenticado.
```javascript
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');

const authMiddleware = {
  verifyToken: (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Token no proporcionado'
        });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }
  },

  checkRole: (roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: 'No tiene permisos suficientes'
        });
      }
      next();
    };
  }
};

module.exports = authMiddleware;
```

#### `error.middleware.js`

Maneja todos los errores de la aplicación.
```javascript
const errorMiddleware = (err, req, res, next) => {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorMiddleware;
```

---

### `/src/utils/` - Utilidades

Funciones de propósito general.

#### `response.js`

Formatea las respuestas HTTP de manera consistente.
```javascript
class ApiResponse {
  static success(res, data, message = 'Operación exitosa', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  static error(res, message = 'Error en la operación', statusCode = 500) {
    return res.status(statusCode).json({
      success: false,
      message
    });
  }

  static created(res, data, message = 'Recurso creado') {
    return res.status(201).json({
      success: true,
      message,
      data
    });
  }
}

module.exports = ApiResponse;
```

---

## Flujo de una Petición

Veamos cómo fluye una petición HTTP a través de la arquitectura:
```
┌──────────────────────────────────────────────────────────────────┐
│                    FLUJO DE UNA PETICIÓN                         │
└──────────────────────────────────────────────────────────────────┘

1️⃣  Cliente envía petición
         ↓
    POST /api/sales
    {
      "items": [...],
      "total": 100,
      "paymentMethod": "cash"
    }

2️⃣  Express Router recibe la petición
         ↓
    src/modules/sales/routes/sale.routes.js

3️⃣  Middlewares se ejecutan en orden
         ↓
    - authMiddleware.verifyToken    (Verifica el token JWT)
    - validateSale.create           (Valida los datos)

4️⃣  Controller recibe la petición
         ↓
    src/modules/sales/controllers/sale.controller.js
    - Extrae datos del request
    - Llama al servicio

5️⃣  Service ejecuta la lógica de negocio
         ↓
    src/modules/sales/services/sale.service.js
    - Crea la venta
    - Actualiza el inventario
    - Registra en auditoría

6️⃣  Models interactúan con la base de datos
         ↓
    src/modules/sales/models/Sale.js
    src/modules/inventory/models/Product.js
    - INSERT en tabla sales
    - UPDATE en tabla products

7️⃣  Service devuelve resultado al Controller
         ↓
    return sale;

8️⃣  Controller formatea y envía respuesta
         ↓
    res.status(201).json({
      success: true,
      message: 'Venta creada',
      data: sale
    })

9️⃣  Cliente recibe la respuesta
         ↓
    Status: 201 Created
    {
      "success": true,
      "message": "Venta creada exitosamente",
      "data": { ... }
    }
```

---

## Convenciones y Buenas Prácticas

### Nomenclatura

| Elemento | Convención | Ejemplo |
|----------|-----------|---------|
| Archivos | camelCase.tipo.js | `sale.controller.js` |
| Clases | PascalCase | `SaleController` |
| Funciones | camelCase | `createSale()` |
| Variables | camelCase | `totalSales` |
| Constantes | UPPER_SNAKE_CASE | `MAX_ITEMS` |
| Rutas API | kebab-case | `/api/cash-register` |

### Reglas de Oro

#### 1. **Responsabilidad Única**
Cada archivo/clase debe tener una sola responsabilidad.

✅ **Correcto:**
```javascript
// sale.service.js - Solo lógica de ventas
class SaleService {
  createSale() { }
  updateSale() { }
}
```

❌ **Incorrecto:**
```javascript
// sale.service.js - Hace demasiado
class SaleService {
  createSale() { }
  sendEmail() { }      // ❌ No corresponde aquí
  updateInventory() { } // ❌ Debería estar en InventoryService
}
```

#### 2. **No Repetir Código (DRY)**

Si una función se usa en varios lugares, muévela a `/utils/` o `/shared/helpers/`.

#### 3. **Manejo de Errores Consistente**

Siempre usa try-catch y pasa errores al middleware de errores.
```javascript
async create(req, res, next) {
  try {
    // Tu código aquí
  } catch (error) {
    next(error); // ✅ Pasa el error al middleware
  }
}
```

#### 4. **Validación en Capas**

- **Validators**: Validación de formato
- **Services**: Validación de negocio
```javascript
// Validator: Verifica que el email tenga formato correcto
body('email').isEmail()

// Service: Verifica que el email no esté registrado
const existingUser = await User.findOne({ where: { email } });
if (existingUser) throw new Error('Email ya registrado');
```

#### 5. **Transacciones para Operaciones Múltiples**

Si una operación modifica varias tablas, usa transacciones.
```javascript
const transaction = await sequelize.transaction();
try {
  await Sale.create(data, { transaction });
  await Product.update(data, { transaction });
  await transaction.commit();
} catch (error) {
  await transaction.rollback();
  throw error;
}
```

---

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:
```env
# Servidor
NODE_ENV=development
PORT=3000

# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gestion_comercial
DB_USER=postgres
DB_PASS=tu_contraseña

# JWT
JWT_SECRET=tu_clave_secreta_super_segura_aqui
JWT_EXPIRES_IN=24h

# Email (Opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_correo@gmail.com
SMTP_PASS=tu_contraseña
```

---

## Scripts Disponibles
```bash
# Desarrollo
npm run dev          # Inicia con nodemon (recarga automática)

# Producción
npm start            # Inicia el servidor

# Base de datos
npm run migrate      # Ejecuta migraciones
npm run migrate:undo # Deshace última migración
npm run seed         # Ejecuta seeders
```

---

## Ejemplo Completo: Módulo de Ventas
```
modules/sales/
│
├── controllers/
│   └── sale.controller.js      # Maneja peticiones HTTP
│
├── services/
│   └── sale.service.js         # Lógica de negocio
│
├── models/
│   ├── Sale.js                 # Modelo de Venta
│   └── SaleDetail.js           # Modelo de Detalle de Venta
│
├── routes/
│   └── sale.routes.js          # Endpoints del módulo
│
└── validators/
    └── sale.validator.js       # Validaciones
```

### Flujo Completo
```javascript
// 1. ROUTE
router.post('/', validateSale.create, saleController.create);

// 2. VALIDATOR
body('total').isFloat({ min: 0 })

// 3. CONTROLLER
const sale = await saleService.createSale(req.body, req.user.id);

// 4. SERVICE
const sale = await Sale.create({ total, userId });
await Product.decrement('stock', { by: quantity });

// 5. MODEL
Sale.belongsTo(User);
Sale.hasMany(SaleDetail);

// 6. RESPONSE
res.status(201).json({ success: true, data: sale });
```

---

## 🎓 Recursos Adicionales

- [Documentación de Sequelize](https://sequelize.org/)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Node.js Design Patterns](https://www.nodejsdesignpatterns.com/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

---

## 📞 Soporte

Si tienes dudas sobre la arquitectura, revisa este README o consulta con el equipo de desarrollo.

---

## 📄 Licencia

Este proyecto es privado y confidencial.

---

**Última actualización:** Diciembre 2025