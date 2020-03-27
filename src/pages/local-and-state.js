import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Description from "../components/description";
import NavBar from "../components/navbar";
import Featured from "../components/featured";
import { Link, graphql } from "gatsby";

const IndexPage = ({
  data: {
    site,
    allAirtable: { nodes: entities }
  }
}) => {
  const categories = [...new Set(entities.map(entity => entity.data.Category))];

  const slugsByCategory = entities.reduce((categories, entity) => {
    let category = entity.data.Category;
    if (!categories[category]) {
      categories[category] = entity.fields.slug;
    }
    return categories;
  }, {});

  const entitiesByCategory = entities.reduce((acc, entity) => {
    let category = entity.data.Category;
    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(entity);
    return acc;
  }, {});

  return (
    <Layout>
      <SEO title="Home" />
      <div className="mb-20">
        <Description city={site.siteMetadata.city} />
        <NavBar />
        <p className="text-lg mb-8">
          Jump to Section in Page:{" "}
          {categories.map((category, idx) => (
            <React.Fragment key={slugsByCategory[category]}>
              <a href={`#${slugsByCategory[category]}`} className="underline">
                {category}
              </a>
              {idx !== categories.length - 1 && " | "}
            </React.Fragment>
          ))}
        </p>
        <Link
          to="/submit"
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Suggest an addition &rarr;
        </Link>
      </div>

      <Featured />

      <div className="mb-10">
        {categories.map(category => (
          <React.Fragment key={slugsByCategory[category]}>
            <h2
              id={slugsByCategory[category]}
              className="text-xl font-bold mt-4"
            >
              {category}
            </h2>
            <ul className="list-disc pl-6 mt-4">
              {entitiesByCategory[category].map(entity => (
                <li key={entity.data.ResourceName}>
                  <a
                    className="underline"
                    href={entity.data.ResourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {entity.data.ResourceName}
                  </a>{" "}
                  {entity.data.ResourceDescription && (
                    <p className="mt-2 mb-2 italic">
                      {entity.data.ResourceDescription}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </React.Fragment>
        ))}
      </div>
    </Layout>
  );
};

export const localStateQuery = graphql`
  query LocalStateQuery {
    site {
      siteMetadata {
        city
        state
      }
    }
    allAirtable(filter: { data: { Approved: { eq: "Yes" }, PageCategory: { eq: "Local and State" } } } ) {
      nodes {
        data {
          Approved
          ResourceName
          Category
          PageCategory
          ResourceDescription
          ResourceUrl
        }
        fields {
          slug
        }
      }
    }
  }
`;

export default IndexPage;
