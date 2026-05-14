import { motion } from "framer-motion";
import { contactData } from "../../data/contact.data";
import ContactCard from "../../components/ContactPage/ContactCard";
import { BadgeCheck, ShieldCheck, Zap } from "lucide-react";

const Contact = () => {
  return (
  <section
  className="
    relative
    overflow-hidden
    min-h-screen
    bg-transparent
    px-4
    sm:px-6
    lg:px-10
    py-24
  "
>
  {/* MAIN CONTAINER */}
  <div
    className="
      relative
      overflow-hidden
      rounded-[3rem]

      border border-white/10
      bg-white/[0.02]

      backdrop-blur-2xl

      mt-12
      p-6
      md:p-10
      lg:p-14

      shadow-[0_30px_120px_rgba(0,0,0,0.45)]
    "
  >
    {/* TOP LIGHT */}
    <div
      className="
        absolute
        top-0
        left-1/2
        -translate-x-1/2

        w-[600px]
        h-[300px]

        bg-orange-500/10
        blur-[120px]
        rounded-full
      "
    />

    {/* GRID */}
    <div
      className="
        relative z-10
        max-w-7xl
        mx-auto

        grid
        grid-cols-1
        xl:grid-cols-2

        gap-16
        items-start
      "
    >
      {/* LEFT SIDE */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* BADGE */}
        <div
          className="
            inline-flex
            items-center
            gap-3

            px-5
            py-3

            rounded-full

            border border-white/10
            bg-white/[0.04]

            backdrop-blur-xl

            mb-8
          "
        >
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />

          <span
            className="
              text-[11px]
              uppercase
              tracking-[0.35em]
              font-bold
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
              text-white/40
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
            lg:text-7xl

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
              from-orange-400
              via-red-500
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
            leading-relaxed

            text-white/55
          "
        >
          Zamonaviy va premium darajadagi web loyihalar
          yaratish uchun men bilan bog‘laning.
          Sizning g‘oyangizni professional darajada
          real mahsulotga aylantiraman.
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
      </motion.div>

      {/* RIGHT SIDE */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        {/* FORM BOX */}
        <div
          className="
            relative

            rounded-[2.5rem]

            border border-white/10
            bg-white/[0.04]

            p-7
            md:p-10

            backdrop-blur-2xl

            overflow-hidden

            shadow-[0_20px_80px_rgba(0,0,0,0.35)]
          "
        >
          {/* INNER LIGHT */}
          <div
            className="
              absolute
              top-0
              right-0

              w-56
              h-56

              bg-orange-500/10
              blur-[100px]
              rounded-full
            "
          />

          <div className="relative z-10">
            <h2
              className="
                text-white
                text-4xl
                font-black
                mb-3
              "
            >
              Xabar qoldiring
            </h2>

            <p
              className="
                text-white/50
                mb-10
              "
            >
              Quyidagi forma orqali murojaat qoldiring.
            </p>

            <form className="space-y-5">
              {/* ROW */}
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Ism va familiya"
                  className="
                    h-16
                    rounded-2xl

                    border border-white/10
                    bg-white/[0.03]

                    px-6

                    text-white
                    placeholder:text-white/30

                    outline-none

                    backdrop-blur-xl

                    transition-all duration-300

                    focus:border-orange-500/50
                    focus:bg-white/[0.06]
                    focus:scale-[1.01]
                    focus:shadow-[0_0_35px_rgba(249,115,22,0.15)]
                  "
                />

                <input
                  type="text"
                  placeholder="+998-XXX-XX-XX"
                  className="
                    h-16
                    rounded-2xl

                    border border-white/10
                    bg-white/[0.03]

                    px-6

                    text-white
                    placeholder:text-white/30

                    outline-none

                    backdrop-blur-xl

                    transition-all duration-300

                    focus:border-orange-500/50
                    focus:bg-white/[0.06]
                    focus:scale-[1.01]
                    focus:shadow-[0_0_35px_rgba(249,115,22,0.15)]
                  "
                />
              </div>

              <input
                type="email"
                placeholder="Elektron pochta"
                className="
                  w-full
                  h-16

                  rounded-2xl

                  border border-white/10
                  bg-white/[0.03]

                  px-6

                  text-white
                  placeholder:text-white/30

                  outline-none

                  backdrop-blur-xl

                  transition-all duration-300

                  focus:border-orange-500/50
                  focus:bg-white/[0.06]
                  focus:scale-[1.01]
                  focus:shadow-[0_0_35px_rgba(249,115,22,0.15)]
                "
              />

              <textarea
                rows={6}
                placeholder="Xabaringizni shu yerga yozing..."
                className="
                  w-full

                  rounded-[2rem]

                  border border-white/10
                  bg-white/[0.03]

                  px-6 py-5

                  text-white
                  placeholder:text-white/30

                  outline-none
                  resize-none

                  backdrop-blur-xl

                  transition-all duration-300

                  focus:border-orange-500/50
                  focus:bg-white/[0.06]
                  focus:shadow-[0_0_35px_rgba(249,115,22,0.15)]
                "
              />

              {/* BUTTON */}
              <button
                type="submit"
                className="
                  relative
                  overflow-hidden

                  w-full

                  rounded-2xl

                  py-5

                  bg-gradient-to-r
                  from-red-500
                  via-orange-500
                  to-yellow-500

                  text-white
                  text-lg
                  font-black
                  uppercase
                  tracking-[0.18em]

                  shadow-[0_15px_50px_rgba(249,115,22,0.35)]

                  transition-all duration-500

                  hover:scale-[1.02]
                  hover:shadow-[0_20px_70px_rgba(249,115,22,0.45)]

                  active:scale-[0.99]
                "
              >
                <span className="relative z-10">
                  Xabarni yuborish
                </span>

                <div
                  className="
                    absolute
                    inset-0

                    -translate-x-full
                    hover:translate-x-full

                    bg-gradient-to-r
                    from-transparent
                    via-white/20
                    to-transparent

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