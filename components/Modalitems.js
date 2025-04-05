import MarkdownContent from "./MarkdownContent"

export default function ModalItems({ props: { events, tours }, locale, type }) {
  const items = type === "events" ? events : tours;

  return (
    <>
      {items.map(({ name, imgSrc, description, price, date, descriptiondetail }, index) => (
        <div
          data-te-modal-init
          className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
          id={`${type}${index}`}
          tabIndex="-1"
          aria-labelledby={name}
          aria-hidden="true"
          key={`modal${type}${index}`}
        >
          <div
            data-te-modal-dialog-ref
            className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
          >
            <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000,0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
              
              {/* Modal Header */}
              <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                <h5
                  className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200 capitalize"
                  id={`${type}ModalLabel${index}`}
                >
                  {name}
                </h5>
                <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  data-te-modal-dismiss
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="relative flex-auto p-4" data-te-modal-body-ref>
                <img
                  src={imgSrc}
                  alt={name}
                  className="modalImgFit"
                />

                <p className="mt-4 capitalize font-bold italic text-lg">{description[locale]}</p>

                <p className="mt-2 text-center text-lg">
                  {type === "tours" ? price : date}
                </p>

                <hr className="border-0 h-px bg-gray-200 my-6" />

                <MarkdownContent markdownText={descriptiondetail[locale]} />
              </div>

              {/* Modal Footer */}
              <div className="flex flex-shrink-0 flex-wrap items-end justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                <button
                  type="button"
                  className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                  data-te-modal-dismiss
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Cierra
                </button>
              </div>

            </div>
          </div>
        </div>
      ))}
    </>
  );
}
