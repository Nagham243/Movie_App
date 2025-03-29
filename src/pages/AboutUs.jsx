import React from "react";

export default function AboutUs() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen flex p-8">
      <div className="max-w-4xl p-10 bg-gray-800 bg-opacity-90 rounded-2xl shadow-2xl flex flex-col ">
        <h1 className="text-5xl font-extrabold my-5 ms-4 text-yellow-400 drop-shadow-lg">
          About Movie App
        </h1>
        <p className="text-lg leading-relaxed mb-6 ms-5 me-5  text-gray-300">
          Welcome to{" "}
          <span className="text-yellow-400 font-semibold">Movie App</span>, your
          ultimate destination for discovering, reviewing, and streaming the
          latest and greatest movies from around the world. Whether you're a fan
          of action-packed blockbusters, heartwarming dramas, or indie gems,
          we've got something for everyone.
        </p>
        <h2 className="text-3xl font-semibold my-5 ms-4 text-yellow-300">
          Our Mission
        </h2>
        <p className="mb-6 ms-5 me-5  text-gray-300 leading-relaxed">
          At Movie App, we aim to bring movie lovers together by providing
          insightful reviews, personalized recommendations, and an ever-growing
          collection of films. Our passion for cinema drives us to deliver an
          unparalleled movie-watching experience.
        </p>
        <h2 className="text-3xl font-semibold my-5 ms-4 text-yellow-300">
          Why Choose Us?
        </h2>
        <p className="list-disc list-inside mb-6 ms-5 me-5  text-gray-300 space-y-2 text-lg ">
          <li className="">
            Curated movie collections with expert recommendations
          </li>
          <li className="">
            In-depth reviews and ratings from fellow cinephiles
          </li>
          <li className="">Personalized watchlists to track your favorites</li>
          <li className="">Latest news and updates from the world of cinema</li>
        </p>
      </div>
    </div>
  );
}
