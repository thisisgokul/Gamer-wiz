import Footer from "@/components/shared/Footer";
import React from "react";

const AboutPage = () => {
  return (
    <>
      <div className="bg-darkBlack py-12 px-4 sm:px-6 lg:px-8 h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-yellowGlight text-center mb-8">
            About GamerWiz
          </h1>
          <div className="text-lg leading-relaxed text-zinc-50">
            <p className="mb-6">
              Welcome to GamerWiz, your ultimate destination for buying your
              favorite games! Our platform is dedicated to providing gamers with
              a seamless experience for purchasing the latest and greatest
              titles across various genres.
            </p>
            <p className="mb-6">
              At GamerWiz, we are passionate about gaming and committed to
              creating a vibrant community where gamers can connect, explore new
              releases, and share their gaming experiences. With a diverse
              selection of games and a user-friendly interface, we strive to
              make the buying process as enjoyable as playing the games
              themselves.
            </p>
            <p>
              Join us on our mission to revolutionize the way gamers shop for
              games. Whether you're a casual player or a dedicated enthusiast,
              GamerWiz has everything you need to fuel your gaming adventures.
              Start browsing now and level up your gaming experience!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
