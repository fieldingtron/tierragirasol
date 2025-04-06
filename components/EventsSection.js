import Image from "next/image";
import { tinaField } from "tinacms/dist/react";

export default function EventsSection({ props, locale }) {
  return (
    <section
      id="events"
      className="py-16 bg-fixed bg-no-repeat bg-right-bottom md:bg-martin-pescador capitalize"
    >
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold"
            data-aos="slide-up"
            data-tina-field={tinaField(props, "eventstitle1")}
          >
            {props.eventstitle1[locale]}
          </h2>
          <p
            className="capitalize text-lg mt-4"
            data-aos="slide-up"
            data-aos-delay="50"
            data-tina-field={tinaField(props, "eventstitle2")}
          >
            {props.eventstitle2[locale]}
          </p>
        </div>

        {/* Events Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         
        {props.events
  ? props.events.map(function (event, i) {
      return (
        <a
          key={event.name}
          href={`#event${i}`}
          className="open-popup-link"
          data-te-toggle="modal"
          data-te-target={`#event${i}`}
          data-tina-field={tinaField(event, "name")}
        >
          <div
            className="group relative bg-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-2xl dark:bg-gray-900 flex flex-col h-full md:min-h-[500px] xl:min-h-[300px]"
            data-aos="fade-in"
            data-aos-delay="100"
          >
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden">
              <Image
                src={event.image}
                alt={event.description[locale]}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-green-500 capitalize">
                {event.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {new Date(event.date).toLocaleDateString(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="capitalize flex-grow">
                {event.description[locale]}
              </p>

              {/* More Info Section */}
              <div className="mt-auto">
                <p className="mt-2">
                  {locale === "es"
                    ? "Haz clic para más detalles"
                    : "Click for more details"}
                </p>
              </div>
            </div>
          </div>
        </a>
      );
    })
  : null}


        </div>
      </div>
    </section>
  );
}
