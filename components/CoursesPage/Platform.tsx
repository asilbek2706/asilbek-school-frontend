interface Props {
  mobile?: boolean;
}

const Platform = ({ mobile = false }: Props) => {
  if (mobile) {
    return (
      <div className="relative -mt-12 pointer-events-none md:hidden h-20">
        <div
          className="
            mx-auto

            w-full
            h-28

            rounded-[2rem]
            absolute
            -z-10

            bg-white/[0.05]

            border border-white/10

            backdrop-blur-2xl
          "
          style={{
            transform: "perspective(800px) rotateX(68deg)",
            boxShadow:
              "0 25px 45px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.1)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative -mt-24 z-10 pointer-events-none">
      <div
        className="
          mx-auto

          w-full
          h-40 xl:h-44

          bg-white/[0.08]

          backdrop-blur-3xl

          rounded-[4rem]

          border-t border-white/20
        "
        style={{
          transform: "perspective(1500px) rotateX(70deg)",
          boxShadow:
            "0 30px 60px -15px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.3)",
        }}
      />
    </div>
  );
};

export default Platform;