import { useState, useEffect } from "react";
import { tinaField } from "tinacms/dist/react";

const Testimonials = ({ props, locale }) => {
  const testimonials = props.testimonials;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Check if the URL contains '/admin'
    //const isAdminPage = window.location.pathname.includes("admin");

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000); // Change testimonial every 4 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section
      id="testimonials"
      className="py-12  bg-no-repeat bg-right-bottom bg-fixed md:bg-alpaca"
    >
      <div className="container mx-auto px-4 text-center">
        <h2
          className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 capitalize"
          data-tina-field={tinaField(props, "testimonialstitle")}
        >
          {props.testimonialstitle[locale]}
        </h2>
        <div
          className="relative max-w-3xl mx-auto"
          data-tina-field={tinaField(testimonials[currentIndex], "name")}
        >
          <img
            src={testimonials[currentIndex].image}
            alt={testimonials[currentIndex].name}
            className="w-64 h-64 mx-auto rounded-full border-4 border-blue-500"
          />
          <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mt-4">
            &ldquo;{testimonials[currentIndex].quote[locale]}&rdquo;
          </blockquote>
          <div className="mt-4">
            <p
              className="text-lg font-semibold text-gray-900 dark:text-gray-100"
              data-tina-field={tinaField(testimonials[currentIndex], "name")}
            >
              {testimonials[currentIndex].name}
            </p>
            <p
              className="text-sm text-gray-500 dark:text-gray-400"
              data-tina-field={tinaField(
                testimonials[currentIndex],
                "location"
              )}
            >
              {testimonials[currentIndex].location}
            </p>
          </div>
        </div>
        <div className="flex justify-center space-x-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full transition-colors ${
                currentIndex === index
                  ? "bg-blue-500"
                  : "bg-gray-400 dark:bg-gray-600"
              }`}
              onClick={() => setCurrentIndex(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
