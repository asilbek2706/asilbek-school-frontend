import { Globe, Rocket, Users2 } from "lucide-react";
import type { IOurGoals } from "../interfaces/ourGoals.interface";

export const goals: IOurGoals[] = [
  {
    title: "Global Standartlar va Xalqaro Muhandislar",
    description: "Bizning maqsadimiz — O'zbekiston yoshlarini jahon miqyosidagi muhandislar darajasiga olib chiqish va xalqaro bozor talablariga javob beradigan mutaxassislarni tayyorlash.",
    icon: <Globe className="w-12 h-12 text-blue-400" />,
    gradient: "from-blue-500/20 to-cyan-500/10",
  },
  {
    title: "Nazariya Emas, Real Amaliy Natija",
    description: "Maqsadimiz — shunchaki sertifikat berish emas, balki talabalarni birinchi kunidanoq real loyihalar ustida ishlashga, murakkab muammolarni yechishga va ishga joylashishga to'liq tayyorlash.",
    icon: <Rocket className="w-12 h-12 text-orange-400" />,
    gradient: "from-orange-500/20 to-red-500/10",
  },
  {
    title: "Kuchli Frontend Ekotizimi va Hamjamiyati",
    description: "Maqsadimiz — sohadagi eng kuchli muhandislarni bir joyga jamlash, doimiy o'sish muhitini yaratish va O'zbekistonda innovatsion Frontend ekotizimini shakllantirish.",
    icon: <Users2 className="w-12 h-12 text-purple-400" />,
    gradient: "from-purple-500/20 to-pink-500/10",
  },
];