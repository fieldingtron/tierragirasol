import { defineConfig, defineSchema } from "tinacms";
import { sanitizeFilename } from "../utils/sanitizeFilename";

// Define custom media store
const customMediaStore = {
  async persist(media) {
    const sanitizedFilename = sanitizeFilename(media.filename);
    // Update the filename and directory in the media object
    media.filename = sanitizedFilename;
    if (media.directory) {
      media.directory = media.directory.toLowerCase();
    }
    return media;
  },
};

const headingBlock = {
  name: "Heading",
  label: "Heading",
  ui: {
    defaultItem: {
      heading: "Lorem ipsum dolo",
    },
  },
  fields: [
    {
      type: "string",
      label: "Heading",
      name: "heading",
    },
  ],
};

const contentBlock = {
  name: "content",
  label: "Content",
  ui: {
    defaultItem: {
      textz:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    },
  },
  fields: [
    {
      type: "rich-text",
      label: "Text",
      name: "textz",
    },
  ],
};

const imageBlock = {
  name: "image",
  label: "Image",
  fields: [
    {
      type: "image",
      label: "Image",
      name: "imgSrc",
    },
  ],
};

const schema = defineSchema({
  collections: [
    {
      label: "Page Content",
      name: "page",
      path: "content/page",
      format: "mdx",
      fields: [
        // {
        //   label: "Hero Tagline 1",
        //   name: "herotagline1",
        //   type: "string",
        // },
        {
          label: "Hero Tagline 1",
          name: "herotagline1",
          type: "object",
          fields: [
            {
              type: "string",
              name: "en",
              label: "English",
            },
            {
              type: "string",
              name: "es",
              label: "Spanish",
            },
          ],
        },

        {
          label: "Hero Tagline 2",
          name: "herotagline2",
          type: "object",
          fields: [
            {
              type: "string",
              name: "en",
              label: "English",
            },
            {
              type: "string",
              name: "es",
              label: "Spanish",
            },
          ],
        },
        {
          label: "Hero Button Text",
          name: "herobuttontext",
          type: "object",
          fields: [
            {
              type: "string",
              name: "en",
              label: "English",
            },
            {
              type: "string",
              name: "es",
              label: "Spanish",
            },
          ],
        },

        {
          type: "image",
          label: "Background Hero Image",
          name: "landingImageSrc",
          required: true, // Makes this field required
        },

        {
          type: "object",
          fields: [
            {
              type: "string",
              name: "en",
              label: "English",
            },
            {
              type: "string",
              name: "es",
              label: "Spanish",
            },
          ],
          label: "Services Title 1",
          name: "servicestitle1",
        },
        {
          type: "object",
          fields: [
            {
              type: "string",
              name: "en",
              label: "English",
            },
            {
              type: "string",
              name: "es",
              label: "Spanish",
            },
          ],
          label: "Services Title 2",
          name: "servicestitle2",
        },

        {
          label: "Tours",
          name: "tours",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item.name };
            },
            defaultItem: {
              name: "Piedra Aguila",
              price: "25.000 CLP",
              description: "Sendero clasico de Futaleufu",
              details:
                "La Piedra de Águila en Futaleufú, Chile, es una impresionante formación rocosa que ofrece vistas panorámicas de los valles y montañas circundantes",
              imgSrc: "/uploads/alpaca.png",
            },
          },

          fields: [
            {
              label: "Name",
              name: "name",
              type: "string",
            },
            {
              label: "Price",
              name: "price",
              type: "string",
            },
            {
              label: "Description",
              name: "description",
              type: "object",
              fields: [
                {
                  type: "string",
                  name: "en",
                  label: "English",
                },
                {
                  type: "string",
                  name: "es",
                  label: "Spanish",
                },
              ],
            },
            {
              label: "Description Detail",
              name: "descriptiondetail",
              type: "object",
              fields: [
                {
                  type: "string",
                  name: "en",
                  label: "English",
                  ui: {
                    component: "textarea",
                  },
                },
                {
                  type: "string",
                  name: "es",
                  label: "Spanish",
                  ui: {
                    component: "textarea",
                  },
                },
              ],
            },
            {
              type: "image",
              label: "Hero image",
              name: "imgSrc",
              required: true, // Makes this field required
            },
          ],
        },

        {
          type: "object",
          fields: [
            {
              type: "string",
              name: "en",
              label: "English",
            },
            {
              type: "string",
              name: "es",
              label: "Spanish",
            },
          ],
          label: "Events Title 1",
          name: "eventstitle1",
        },
        {
          type: "object",
          fields: [
            {
              type: "string",
              name: "en",
              label: "English",
            },
            {
              type: "string",
              name: "es",
              label: "Spanish",
            },
          ],
          label: "Events Title 2",
          name: "eventstitle2",
        },

        {
          label: "Events",
          name: "events",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => {
              return {
                label: `${item.name} (${
                  item.date?.split("T")[0] || "No date"
                })`,
              };
            },
            defaultItem: {
              name: "Festival de Futaleufú",
              date: "2025-01-15",
              description: {
                en: "Annual cultural festival in Futaleufú.",
                es: "Festival cultural anual en Futaleufú.",
              },
              detailed_description: {
                en: "The Futaleufú Festival celebrates the rich cultural traditions of the region with music, dance, and local cuisine.",
                es: "El Festival de Futaleufú celebra las ricas tradiciones culturales de la región con música, danza y gastronomía local.",
              },
              image: "/uploads/festival.png",
            },
            // ⭐ Sort Events by date (soonest first)
            listProps: {
              sort: (a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateA - dateB;
              },
            },
          },

          fields: [
            {
              label: "Name",
              name: "name",
              type: "string",
            },
            {
              label: "Date",
              name: "date",
              type: "datetime",
              ui: {
                dateFormat: "YYYY-MM-DD", // Only show the date (optional)
                timeFormat: false,
              },
            },
            {
              label: "Description",
              name: "description",
              type: "object",
              fields: [
                {
                  type: "string",
                  name: "en",
                  label: "English",
                },
                {
                  type: "string",
                  name: "es",
                  label: "Spanish",
                },
              ],
            },
            {
              label: "Detailed Description",
              name: "detailed_description",
              type: "object",
              fields: [
                {
                  type: "string",
                  name: "en",
                  label: "English",
                  ui: {
                    component: "textarea",
                  },
                },
                {
                  type: "string",
                  name: "es",
                  label: "Spanish",
                  ui: {
                    component: "textarea",
                  },
                },
              ],
            },
            {
              type: "image",
              label: "Image",
              name: "image",
              required: true,
            },
          ],
        },
        {
          label: "Fotos",
          name: "fotos",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item.name };
            },
            defaultItem: {
              name: "Foto #",
              imgSrc: "/uploads/tina.jpeg",
            },
          },

          fields: [
            {
              label: "Name",
              name: "name",
              type: "string",
            },
            {
              type: "image",
              label: "Imagen",
              name: "imgSrc",
            },
          ],
        },
        {
          type: "object",
          fields: [
            {
              type: "string",
              name: "en",
              label: "English",
            },
            {
              type: "string",
              name: "es",
              label: "Spanish",
            },
          ],
          label: "Testimonials Title",
          name: "testimonialstitle",
        },

        {
          name: "testimonials",
          label: "Testimonials",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item.name };
            },
            defaultItem: {
              name: "Don Juan",
              location: "Futaleufu, Chile",
              quote: "Sendero clasico de Futaleufu. Muy bakan la question",
              image: "/uploads/alpaca.png",
            },
          },
          fields: [
            {
              name: "name",
              label: "Name",
              type: "string",
              required: true, // Makes this field required
            },

            {
              label: "Bilingual Quote",
              name: "quote",
              type: "object",
              fields: [
                {
                  type: "string",
                  name: "en",
                  label: "English",
                  ui: {
                    component: "textarea",
                  },
                },
                {
                  type: "string",
                  name: "es",
                  label: "Spanish",
                  ui: {
                    component: "textarea",
                  },
                },
              ],
            },

            {
              name: "location",
              label: "Location",
              type: "string",
              required: true, // Makes this field required
            },
            {
              name: "image",
              label: "Image",
              type: "image",
              required: true, // Makes this field required
            },
          ],
        },

        // {
        //   type: "string",
        //   label: "FAQ text",
        //   name: "FAQintro",
        //   ui: {
        //     component: "textarea",
        //   },
        // },
        // {
        //   type: "object",
        //   list: true,
        //   name: "camping",
        //   label: "Camping Section",
        //   templates: [imageBlock, contentBlock, headingBlock],
        // },
        {
          type: "object",
          fields: [
            {
              type: "string",
              name: "en",
              label: "English",
            },
            {
              type: "string",
              name: "es",
              label: "Spanish",
            },
          ],
          label: "FAQ Title",
          name: "faqtitle",
        },
        {
          label: "Preguntas Frecuentes",
          name: "faq",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item.question?.en || "New FAQ Item" }; // Fallback if `en` is not defined
            },
            defaultItem: {
              question: {
                en: "What is it?",
                es: "¿Qué es?",
              },
              response: {
                en: "This means...",
                es: "Esto significa...",
              },
            },
          },
          fields: [
            {
              label: "Question",
              name: "question",
              type: "object",
              fields: [
                {
                  label: "English",
                  name: "en",
                  type: "string",
                },
                {
                  label: "Spanish",
                  name: "es",
                  type: "string",
                },
              ],
            },
            {
              label: "Response",
              name: "response",
              type: "object",
              fields: [
                {
                  label: "English",
                  name: "en",
                  type: "string",
                  ui: {
                    component: "textarea",
                  },
                },
                {
                  label: "Spanish",
                  name: "es",
                  type: "string",
                  ui: {
                    component: "textarea",
                  },
                },
              ],
            },
          ],
        },

        // {
        //   name: "body",
        //   label: "Main Content",
        //   type: "rich-text",
        //   isBody: true,
        // },
      ],
      ui: {
        router: ({ document }) => {
          //TODO: change this around later
          if (document._sys.filename === "home") {
            return `/`;
          }
          return undefined;
        },
      },
    },
  ],
});

export const config = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH ||
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD,
  token: process.env.TINA_TOKEN,
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
      previewSrc: (fullSrc) => fullSrc,
    },
    loadCustomStore: async () => {
      return {
        async preProcessFile(file) {
          const sanitizedName = sanitizeFilename(file.name);
          return new File([file], sanitizedName, { type: file.type });
        },
        ...customMediaStore,
      };
    },
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_TOKEN,
      stopwordLanguages: ["eng", "spa"],
    },
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  schema,
});

export default config;
