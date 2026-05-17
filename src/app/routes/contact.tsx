import { motion } from "framer-motion";
import { contactData } from "../../data/contact.data";
import ContactCard from "../../components/ContactPage/ContactCard";
import {
  ShieldCheck,
  Zap,
  BadgeCheck,
  Send,
  User,
  Phone,
  Mail,
  PencilLine,
} from "lucide-react";

const Contact = () => {
  return (
    <section
      className="
        relative
        overflow-hidden

        min-h-screen

        px-4
        sm:px-6
        lg:px-10

        py-24
      "
    >

      {/* MAIN WRAPPER */}
      <div
        className="
         bg-transparent relative overflow-hidden rounded-[2.5rem] border border-white/5 mt-12 p-6 md:p-12 shadow-2xl
        "
      >
        {/* GRID */}
        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-[0.95fr_1.05fr]

            gap-14
            xl:gap-20
          "
        >
          {/* ================= LEFT SIDE ================= */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative z-10"
          >
            {/* BADGE */}
            <div
              className="
                inline-flex
                items-center
                gap-3

                rounded-full

                border border-white/10
                bg-white/[0.03]

                px-5
                py-3

                backdrop-blur-xl

                mb-8
              "
            >
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />

              <span
                className="
                  text-[11px]
                  font-black
                  uppercase
                  tracking-[0.3em]

                  text-orange-400
                "
              >
                Aloqa
              </span>

              <span
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.25em]

                  text-white/35
                "
              >
                Biz bilan bog‘laning
              </span>
            </div>

            {/* TITLE */}
            <h1
              className="
                text-5xl
                sm:text-6xl
                xl:text-7xl

                font-black
                leading-[0.9]

                text-white
              "
            >
              Loyihangizni
              <br />

              <span
                className="
                  text-transparent
                  bg-clip-text
                  bg-gradient-to-r
                  from-red-500
                  via-orange-400
                  to-yellow-400
                "
              >
                Birga Yaratamiz
              </span>
            </h1>

            {/* DESC */}
            <p
              className="
                mt-8

                max-w-2xl

                text-lg
                leading-[1.9]

                text-white/55
              "
            >
              Zamonaviy web platformalar, premium UI/UX va
              professional frontend yechimlar yaratish uchun
              men bilan bog‘laning. G‘oyangizni kuchli
              raqamli mahsulotga aylantirib beraman.
            </p>

            {/* CONTACT CARDS */}
            <div
              className="
                mt-12

                grid
                sm:grid-cols-2

                gap-5
              "
            >
              {contactData.map((contact) => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                />
              ))}
            </div>

            {/* ADDRESS BOX */}
            <div
              className="
                relative

                mt-6

                overflow-hidden

                rounded-[2rem]

                border border-white/10
                bg-white/[0.03]

                p-6

                backdrop-blur-2xl
              "
            >
              <div
                className="
                  absolute
                  top-0
                  right-0

                  w-40
                  h-40

                  bg-orange-500/10
                  blur-[80px]

                  rounded-full
                "
              />

              <div className="relative z-10 flex items-start gap-5">
                <div
                  className="
                    w-16
                    h-16

                    rounded-2xl

                    bg-orange-500/10
                    border border-orange-500/20

                    flex items-center justify-center

                    text-orange-400
                  "
                >
                  📍
                </div>

                <div>
                  <h3
                    className="
                      text-white
                      text-2xl
                      font-black
                      mb-2
                    "
                  >
                    Manzilimiz
                  </h3>

                  <p
                    className="
                      text-white/55
                      leading-8
                    "
                  >
                    Olot tumani,
                    <br />
                    Buxoro viloyati,
                    <br />
                    O‘zbekiston
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT SIDE ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* OUTER GLOW */}
            <div
              className="
                absolute
                -inset-[1px]

                rounded-[2.7rem]

                bg-gradient-to-r
                from-orange-500/10
                via-transparent
                to-orange-500/20

                blur-xl
                opacity-60
              "
            />

            {/* FORM CARD */}
            <div
              className="
               relative h-full p-8 rounded-[2.5rem] bg-gradient-to-b from-white/[0.08] to-transparent border border-white/10 backdrop-blur-2xl overflow-hidden flex flex-col items-center text-center transition-all duration-500 group-hover:border-white/20
              "
            >
       

              <div className="relative z-10 max-w-lg w-full">
                {/* HEADING */}
                <h2
                  className="
                    text-white

                    text-4xl
                    sm:text-5xl

                    font-black

                    mb-4
                  "
                >
                  Xabar qoldiring
                </h2>

                <p
                  className="
                    text-white/50
                    mb-10
                    leading-8
                  "
                >
                  Quyidagi forma orqali murojaatingizni
                  yuboring. Tez orada siz bilan bog‘lanamiz.
                </p>

                {/* FORM */}
                <form className="space-y-5">
                  {/* ROW */}
                  <div className="grid md:grid-cols-2 gap-5">
                    {/* NAME */}
                    <div className="relative">
                      <User
                        className="
                          absolute
                          left-5
                          top-1/2
                          -translate-y-1/2

                          text-white/30
                        "
                        size={20}
                      />

                      <input
                        type="text"
                        placeholder="Ism va familiya"
                        className="
                          w-full
                          h-16

                          rounded-2xl

                          border border-white/10
                          bg-white/[0.03]

                          pl-14
                          pr-5

                          text-white
                          placeholder:text-white/30

                          outline-none

                          transition-all duration-300

                          focus:border-orange-500/50
                          focus:bg-white/[0.05]
                          focus:shadow-[0_0_35px_rgba(249,115,22,0.15)]
                        "
                      />
                    </div>

                    {/* PHONE */}
                    <div className="relative">
                      <Phone
                        className="
                          absolute
                          left-5
                          top-1/2
                          -translate-y-1/2

                          text-white/30
                        "
                        size={20}
                      />

                      <input
                        type="text"
                        placeholder="+998 50 753 66 36"
                        className="
                          w-full
                          h-16

                          rounded-2xl

                          border border-white/10
                          bg-white/[0.03]

                          pl-14
                          pr-5

                          text-white
                          placeholder:text-white/30

                          outline-none

                          transition-all duration-300

                          focus:border-orange-500/50
                          focus:bg-white/[0.05]
                          focus:shadow-[0_0_35px_rgba(249,115,22,0.15)]
                        "
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="relative">
                    <Mail
                      className="
                        absolute
                        left-5
                        top-1/2
                        -translate-y-1/2

                        text-white/30
                      "
                      size={20}
                    />

                    <input
                      type="email"
                      placeholder="Elektron pochta"
                      className="
                        w-full
                        h-16

                        rounded-2xl

                        border border-white/10
                        bg-white/[0.03]

                        pl-14
                        pr-5

                        text-white
                        placeholder:text-white/30

                        outline-none

                        transition-all duration-300

                        focus:border-orange-500/50
                        focus:bg-white/[0.05]
                        focus:shadow-[0_0_35px_rgba(249,115,22,0.15)]
                      "
                    />
                  </div>

                  {/* TEXTAREA */}
                  <div className="relative">
                    <PencilLine
                      className="
                        absolute
                        left-5
                        top-6

                        text-white/30
                      "
                      size={20}
                    />

                    <textarea
                      rows={7}
                      placeholder="Xabaringizni shu yerga yozing..."
                      className="
                        w-full

                        rounded-[2rem]

                        border border-white/10
                        bg-white/[0.03]

                        pl-14
                        pr-5
                        py-5

                        text-white
                        placeholder:text-white/30

                        outline-none
                        resize-none

                        transition-all duration-300

                        focus:border-orange-500/50
                        focus:bg-white/[0.05]
                        focus:shadow-[0_0_35px_rgba(249,115,22,0.15)]
                      "
                    />
                  </div>

                  {/* BUTTON */}
                  <button
                    type="submit"
                    className="
                      group
                      relative
                      overflow-hidden

                      w-full

                      rounded-[1.7rem]

                      py-5

                      bg-gradient-to-r
                      from-red-500
                      via-orange-500
                      to-yellow-400

                      text-white
                      text-lg
                      font-black
                      uppercase
                      tracking-[0.15em]

                      transition-all duration-500

                      hover:scale-[1.01]
                      hover:shadow-[0_20px_80px_rgba(249,115,22,0.45)]

                      active:scale-[0.99]
                    "
                  >
                    <span
                      className="
                        relative
                        z-10

                        flex
                        items-center
                        justify-center
                        gap-3
                      "
                    >
                      Xabarni yuborish

                      <Send
                        size={20}
                        className="
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                          group-hover:-translate-y-1
                        "
                      />
                    </span>

                    <div
                      className="
                        absolute
                        inset-0

                        bg-gradient-to-r
                        from-transparent
                        via-white/20
                        to-transparent

                        -translate-x-full
                        group-hover:translate-x-full

                        transition-transform
                        duration-1000
                      "
                    />
                  </button>
                </form>

                {/* FEATURES */}
                <div
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-3
                    items-start

                    gap-6

                    mt-10
                    pt-8

                    border-t border-white/10
                  "
                >
                  {[
                    {
                      icon: <ShieldCheck size={20} />,
                      title: "Xavfsiz va ishonchli",
                      desc: "Ma’lumotlaringiz himoyalangan",
                    },
                    {
                      icon: <Zap size={20} />,
                      title: "Tez javob",
                      desc: "24 soat ichida javob beramiz",
                    },
                    {
                      icon: <BadgeCheck size={20} />,
                      title: "Sifat kafolati",
                      desc: "Premium darajadagi xizmat",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="
                        flex
                        items-start
                        gap-4
                      "
                    >
                      <div
                        className="
                          w-12
                          h-12

                          rounded-2xl

                          bg-orange-500/10
                          border border-orange-500/20

                          flex items-center justify-center

                          text-orange-400

                          shrink-0
                        "
                      >
                        {item.icon}
                      </div>

                      <div>
                        <h4
                          className="
                            text-white
                            font-bold
                            text-sm
                          "
                        >
                          {item.title}
                        </h4>

                        <p
                          className="
                            text-white/45
                            text-sm
                            mt-1
                            leading-6
                          "
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;