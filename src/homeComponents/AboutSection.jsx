import Image from "next/image";
import React from "react";

const AboutSection = () => {
  return (
    <div>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center relative">
          <div className="relative flex space-x-4 justify-center">
            <div className="relative">
              <Image
                src="/about-1.jpg"
                alt="Tailor 1"
                width={300}
                height={400}
                className="rounded-lg object-cover"
              />
              <div className="absolute -top-10 -left-10 bg-white rounded-full shadow-md w-32 h-32 flex flex-col items-center justify-center text-center border-dashed border-2 border-gray-300">
                <span className="text-3xl font-bold text-[#E3B793]">20</span>
                <span className="text-xs text-gray-500">
                  Years of Practicing
                </span>
              </div>
            </div>
            <Image
              src="/about-2.jpg"
              alt="Tailor 2"
              width={300}
              height={400}
              className="rounded-lg object-cover border-b-[6px] border-[#E3B793]"
            />
          </div>
          <div>
            <p className="uppercase text-sm tracking-widest text-[#E3B793] mb-2">
              Checkout Our Services
            </p>
            <h2 className="text-4xl font-bold text-gray-800 mb-4 leading-snug">
              Introducing the Quality <br />
              Taylers in Town
            </h2>
            <p className="text-gray-600 mb-6 max-w-xl">
              Lorem ipsum dolor sit amet, consectetur notted adipisicing elit
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
              lonm andhn.
            </p>
            <ul className="space-y-3 text-gray-800 font-medium mb-8">
              {[
                "Nsectetur cing elit.",
                "Suspe ndsse suscipit sagittis leo.",
                "Entum estibulum dignissim posuere.",
                "Donec eros libero, dignissim eget.",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-[#E3B793] text-xl">➤</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center space-x-4 mt-6">
              <div className="border-2 border-dashed border-[#E3B793] rounded-full p-1">
                <Image
                  src="/images/kevin.jpg"
                  alt="Kevin Martin"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
              <div>
                <p className="text-xl font-signature text-[#E3B793]">
                  Kevin Martin
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
