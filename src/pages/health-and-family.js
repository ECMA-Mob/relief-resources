import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Description from "../components/description"
import { graphql } from "gatsby";

const HealthAndFamilyPage = ({
  data: {
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
      <SEO title="Health and Family" />
      <Description />
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

export const healthFamilyQuery = graphql`
  query HealthFamilyQuery {
    site {
      siteMetadata {
        city
        state
      }
    }
    allAirtable(filter: { data: { Approved: { eq: "Yes" }, PageCategory: { eq: "Health and Family" } } } ) {
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

export default HealthAndFamilyPage;
