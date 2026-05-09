import TechnologyStack from "./TechnologyStack";

const Intro = () => {
  return (
    <div className="py-10 bg-transparent relative">
      <div className="container mx-auto px-6">
        <h1 className="text-center font-bold text-4xl">
          Frontend olamiga professional qadam qo'ying
        </h1>
        <p className="text-center mt-4 text-lg text-gray-600">
          Qayerdan boshlashni bilmayapsizmi? &nbsp;
          <span className="font-bold text-red-500">
            Hech qanday tashvishlanmang!
          </span>
          <br />
          Bizning&nbsp; Frontend Darslari&nbsp; kursimiz sizni bosqichma-bosqich
          o'rgatadi va sizni zamonaviy web dasturchi sifatida tayyorlaydi.
        </p>
        <TechnologyStack />
      </div>
    </div>
  );
};

export default Intro;
