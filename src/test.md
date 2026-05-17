# Kamchiliklar

- GitHub OAuth hali ham real `.env` qiymatlariga bog'liq. `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` va `GITHUB_REDIRECT_URI` bo'lmasa flow ishga tushmaydi.
- GitHub callback faqat GitHub token/user endpointlariga tayanadi. Internet yoki GitHub servisida muammo bo'lsa login to'xtaydi.
- Hozirgi auth backend mock asosida ishlaydi. Production darajadagi server, session storage va revoke flow yo'q.
- Moved root layerlar `src` ichiga ko'chirildi, lekin FSD bo'yicha yanada chuqurroq ajratish hali ham mumkin. Masalan, ayrim UI bo'laklarini `widgets` va domen ma'lumotlarini `entities` ga yanada aniqroq bo'lish mumkin.
- Kurslar, FAQ, testimonials va boshqa kontent hozir statik data orqali berilgan. Admin panel yoki CMS ulanishi yo'q.
- Route-guards testlarida React `act` warning'lari to'liq yo'qolmagan bo'lishi mumkin. Bu testlarni yanada nozikroq boundary bilan qayta yozish mumkin.
- GitHub oqimi uchun hozir unit testlar bor, lekin to'liq end-to-end brauzer testi yo'q.
