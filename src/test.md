# Kamchiliklar va keyingi qadamlar

## Hozirgi holat

- Router, auth layer, shared UI va test infratuzilmasi ishga tushgan, lekin backend hali yo'q, shuning uchun auth va kontentning katta qismi mock qatlamiga tayangan.
- UI hozir stable, lekin data source'lar hali to'liq Swagger/OpenAPI gateway'iga ulanmagan.

## Saqlanib qolgan risklar

- GitHub OAuth hali real `.env` qiymatlariga bog'liq. `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` va `GITHUB_REDIRECT_URI` bo'lmasa flow ishga tushmaydi.
- GitHub callback GitHub token/user endpointlariga bevosita tayanadi. Internet yoki GitHub servisida muammo bo'lsa login to'xtaydi.
- Auth oqimi mock asosida ishlaydi. Production darajadagi server session storage, refresh-token rotation va revoke flow hali yo'q.
- RBAC hali implement qilinmagan. `admin`, `teacher`, `student`, `parent` rollari uchun `RoleRoute` va `PermissionRoute` tayyorlanishi kerak.

## Arxitektura bo'shliqlari

- Fake data hali to'liq `shared/mocks/` ichida markazlashmagan. Courses, FAQ, testimonials, home/about/contact kontenti va dashboard/notification scenariylari alohida mock paketlarga bo'linishi kerak.
- Repository qatlam hamma domenlar uchun bir xil darajada to'liq emas. Auth uchun boundary bor, lekin `course`, `faq`, `teacher`, `student`, `dashboard`, `notification` repository'lari hali alohida standartga keltirilishi kerak.
- OpenAPI integratsiyasi uchun `shared/openapi/` va `shared/generated/` scaffold mavjud bo'lishi kerak, lekin hozir codegen pipeline ulanmagan.
- `shared/api/http.ts` kabi bitta aniq HTTP boundary va barcha feature repository'lari uchun yagona gateway contract hali to'liq yakunlanmagan.

## Test va sifat bo'shliqlari

- Auth, mock va GitHub loader'lar uchun unit testlar bor, lekin `MSW` bilan repository testlari hali kengaytirilmagan.
- To'liq `Playwright` E2E yo'q. Login, register, verify va GitHub auth oqimlari uchun brauzer testlari keyingi bosqichda kerak.
- Route-guards testlarida React `act` warning'lari to'liq yo'qolmagan bo'lishi mumkin. Bu testlarni yanada nozikroq boundary bilan qayta yozish kerak.

## Backend kelganda faqat nimalar o'zgaradi

- O'zgaradigan joylar: repository implementatsiyasi, mock switching, `shared/api/http.ts` transport qatlami, generated OpenAPI client'lar.
- O'zgarmaydigan joylar: pages, widgets, features UI, forms, hooks, layouts, route structure, Zustand store contract'lari, component API'lari.
- Maqsad: backend kelganda UI'ga tegmasdan faqat data access qatlamini almashtirish.
