# Migración pendientes (views placeholder)

Este documento lista los `moduleId/view` que hoy quedaron con UI placeholder y requieren integración de endpoint/contrato final.

## Exchange Config
- `/ops/exchange-config?view=rates`
- `/ops/exchange-config?view=commissions`
- `/ops/exchange-config?view=channels`
- `/ops/exchange-config?view=parameters`

## Exchange Ops
- `/ops/exchange-ops?view=orders`
- `/ops/exchange-ops?view=intervention`
- `/ops/exchange-ops?view=retail`
- `/ops/exchange-ops?view=desk`
- `/ops/exchange-ops?view=substitution`
- `/ops/exchange-ops?view=reception`

## Exchange BCV
- `/ops/exchange-bcv?view=report`
- `/ops/exchange-bcv?view=interventions`
- `/ops/exchange-bcv?view=substitutions`

## Exchange Catalog
- `/ops/exchange-catalog?view=sessions`
- `/ops/exchange-catalog?view=markets`
- `/ops/exchange-catalog?view=balances`
- `/ops/exchange-catalog?view=modalities`
- `/ops/exchange-catalog?view=products`
- `/ops/exchange-catalog?view=currencies`

## Investment Ops
- `/ops/investment-ops?view=results-preview`
- `/ops/investment-ops?view=results-process`
- `/ops/investment-ops?view=cancel-eligible`
- `/ops/investment-ops?view=cancel-execute`
- `/ops/investment-ops?view=precancel`

## Investment Segments
- `/ops/investment-segments?view=segments`
- `/ops/investment-segments?view=customer-types`
- `/ops/investment-segments?view=customers`

## Módulos pendientes con pantalla stub
- `/ops/audit`
- `/ops/menu-ib`
- `/ops/menu-app`
- `/ops/callcenter`
- `/ops/approval-rules`

## Falta para cerrar cada placeholder
1. Confirmar endpoint backend final.
2. Definir contrato request/response.
3. Reemplazar botón "Ejecutar" placeholder por integración real.
4. Agregar validaciones de formulario y manejo de errores por caso.
