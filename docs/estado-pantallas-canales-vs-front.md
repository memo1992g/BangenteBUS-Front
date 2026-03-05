# Estado de pantallas: Canales (legacy) vs BangenteBUS-Front

## Objetivo
Este documento resume qué opciones del menú lateral de **Canales** están actualmente representadas en este frontend (`BangenteBUS-Front`), cuáles están parciales y cuáles no están visibles todavía como opción específica.

## Criterio de clasificación
- ✅ **Implementada**: existe módulo/acción en `src/lib/config/modules.ts` y/o endpoint claramente expuesto en la UI.
- 🟡 **Parcial / Agrupada**: existe cobertura funcional, pero no 1:1 con el nombre/flujo legacy.
- ❌ **No visible**: no aparece como módulo/acción específica en el frontend actual.

## Base técnica consultada
- Catálogo de módulos y acciones: `src/lib/config/modules.ts`
- Ruteo dinámico de módulos: `src/app/ops/[moduleId]/page.tsx`
- Endpoints disponibles: `src/lib/endpoints.ts`
- Componentes específicos por módulo en `src/components/ops/*`

---

## Resumen ejecutivo

- El frontend actual tiene **24 módulos operativos** configurados.
- Hay cobertura de secciones clave: pagos, divisas, inversiones, mantenimiento, consultas, seguridad, notificaciones, apertura, certificaciones y referencias.
- No existe todavía una paridad total 1:1 con las **70 opciones** del menú legacy; en especial, varias entradas de **Divisas** e **Inversiones** están consolidadas en menos pantallas o quedan como pendientes.

---

## Mapeo por sección (alto nivel)

### Apertura de Cuentas
- Carga de Archivo → ✅ Implementada (`apertura-cuentas`)

### Certificación de Cuenta
- Validar → ✅ Implementada (`certificaciones`)

### Referencias Bancarias
- Validar → ✅ Implementada (`referencias`)

### Contingencia Saren
- Enviar Archivo → ✅ Implementada (`saren`)

### Pagos Masivos
- Carga Manual → 🟡 Parcial (flujo cubierto por `list / validate / process`)

### Pagos Servicios
- Montos → ✅ Implementada (`pago-servicios`)

### Notificación de Viaje
- Crear Notificación / Crear Notificación CC → 🟡 Parcial (módulos `travel-notices` y `callcenter`)
- Reportes de Notificación → 🟡 Parcial (listado/export dentro de `travel-notices`)

### Seguridad
- Accesos → ✅ Implementada (`seguridad` con perfiles)
- Preguntas de Desafío → ✅ Implementada (`seguridad`)
- Condicionamiento IP → 🟡 Parcial / no explícita 1:1

### Consultas
- Consulta Clientes → ✅ Implementada (`consultas`)
- Bitácora Administrador → ✅ Implementada (`audit`)
- Log Operacional (IB/App) → 🟡 Parcial (endpoint existe, opción de menú dedicada no)

### Mantenimiento
- Parámetros Generales → ✅ Implementada (`parameters`)
- Publicidad → ✅ Implementada (`publicity`)
- Mensajes → ✅ Implementada (`system-messages`)
- Menú IB / Menú App → ✅ Implementada (`menu-ib`, `menu-app`)
- Límites especiales / Parámetros BCV → 🟡 Parcial

### Mantenimiento Divisas
- Configuración (balances, tasas, comisiones, canales, parámetros) → ✅ Implementada (`exchange-config`)
- Operaciones (intervención, menudeo, mesa, sustitución, recepción, órdenes) → ✅ Implementada (`exchange-ops`)
- Reportes BCV → ✅ Implementada (`exchange-bcv`)
- Tablas/Catálogo (sesiones, markets, balances catálogo, modalidades, productos, monedas) → ✅ Implementada (`exchange-catalog`)
- Opciones legacy puntuales (contingencia específica, motivos, segmentación, subflujos separados por compra/venta, etc.) → ❌/🟡 según caso

### Mantenimiento Inversiones
- Convocatorias, instrumentos, tasas → ✅ Implementada (`investment-config`)
- Resultados/cancelación/pre-cancelación → ✅ Implementada (`investment-ops`)
- Segmentación → ✅ Implementada (`investment-segments`)
- Opciones legacy muy específicas (anular título, editar instrumento defecto, operación compra como opción separada, etc.) → 🟡/❌ según caso

---

## Inventario actual de módulos en BangenteBUS-Front

1. pago-masivo
2. pago-servicios
3. saren
4. exchange-config
5. exchange-ops
6. exchange-bcv
7. exchange-catalog
8. investment-config
9. investment-ops
10. investment-segments
11. publicity
12. parameters
13. system-messages
14. travel-notices
15. consultas
16. audit
17. seguridad
18. menu-ib
19. menu-app
20. referencias
21. certificaciones
22. apertura-cuentas
23. callcenter
24. approval-rules

---

## Nota de uso
Si se requiere paridad total con las 70 opciones legacy, el siguiente paso recomendado es una matriz detallada 1:1 (opción legacy → módulo actual → endpoint → estado → brecha) para planificar backlog técnico.
