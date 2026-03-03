# BangenteBUS-Front (Next.js)

UI genérica para ejecutar acciones contra Bangente BUS y comparar equivalencia operativa contra Canales.

## Requisitos
- Node 18+

## Setup
1) Copiá `.env.example` a `.env.local` y configura:
- `NEXT_PUBLIC_BUS_BASE_URL=http://<host>:<puerto>`

2) Instala dependencias:
```bash
npm install
```

3) Corre local:
```bash
npm run dev
```

Abrí `http://localhost:3000` y entra a **Operativo**.

## Uso
- Elegí un módulo
- Ajustá el JSON del request (si aplica)
- Ejecutá y revisá la respuesta / error

## Nota
Los `requestTemplate` están vacíos a propósito para que los completes con los contratos finales.
Archivo: `src/lib/config/modules.ts`
