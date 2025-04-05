import { TinaMarkdown } from "tinacms/dist/rich-text";
import { HomepageLayout, Layout } from "../components/HomepageLayout";
import { tinaField, useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const content = data.page.body;
  //console.log(props.locale);

  return (
    <HomepageLayout props={data.page} locale={props.locale}>
      <div data-tina-field={tinaField(data.page, "body")}>
        <TinaMarkdown content={content} />
      </div>
    </HomepageLayout>
  );
}

export const getStaticProps = async ({ locale }) => {
  // Define the localized path for the content
  const relativePath = `home.mdx`;

  try {
    // Fetch localized content using the Tina client
    const { data, query, variables } = await client.queries.page({
      relativePath,
    });

    return {
      props: {
        data,
        query,
        variables,
        locale, // Pass the current locale to the page
      },
    };
  } catch (error) {
    console.error(`Error fetching content for locale "${locale}":`, error);

    // Fallback to default locale if localized content is missing
    const fallbackRelativePath = `home.mdx`;
    const { data, query, variables } = await client.queries.page({
      relativePath: fallbackRelativePath,
    });

    return {
      props: {
        data,
        query,
        variables,
        locale: "es", // Fallback locale
      },
    };
  }
};
