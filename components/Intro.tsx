import { Link } from "react-router";

const Intro = () => {
  return (
    <div className="intro-section py-10 bg-transparent">
      <div className="container">
        <h1 className="text-center font-bold text-4xl">
          Frontend olamiga professional qadam qo'ying
        </h1>
        <p className="text-center mt-4 text-lg text-gray-600">
          <span className="font-bold text-blue-600">
            Qayerdan boshlashni bilmayapsizmi?
          </span>
          &nbsp;
          <span className="font-bold text-red-500">
            Hech qanday tashvishlanmang!
          </span>
          <br />
          Bizning&nbsp;
          <span className="font-bold-italic text-green-500">
            Frontend Darslari&nbsp;
          </span>
          kursimiz sizni bosqichma-bosqich o'rgatadi va sizni zamonaviy web
          dasturchi sifatida tayyorlaydi.
        </p>

      </div>
    </div>
  );
};

export default Intro;
