import React from "react";
import { Link, graphql, StaticQuery } from "gatsby";

const NavBar = data => {

  let PageCategoriesList = data.allAirtable.nodes;
  let PageCategories = [];
  let PageCategoriesSlugs = [];

  for (let i = 0; i < PageCategoriesList.length; i++) {
    if (PageCategories.indexOf(PageCategoriesList[i].data.PageCategory) === -1 && PageCategoriesList[i].data.PageCategory !== "Donate and Volunteer") {
      PageCategories.push(PageCategoriesList[i].data.PageCategory);
    }
  }

  for (let n = 0; n < PageCategories.length; n++) {
    let slug = PageCategories[n].split(' ').join('-').toLowerCase();
    PageCategoriesSlugs.push(slug);
  }
 
  return (
    <p className="text-lg mb-8">
      Filter by Category:{" "}
      {PageCategories.map((PageCategory) => (
        <span>
          <Link to={PageCategoriesSlugs[PageCategories.indexOf(PageCategory)]} className="underline">
          {PageCategory}
          </Link>
          {" | "} 
        </span>
      ))}
      <Link to="/" className="underline">
        Back to Homepage
      </Link>
    </p>
  );
}

export default () => (
  <StaticQuery
    query={
      graphql`
        query NavBarQuery {
          allAirtable(filter: { data: { Approved: { eq: "Yes" } } }) {
            nodes {
              data {
                PageCategory
              }
              fields {
                slug
              }
            }
          }
        }
      `
    }
    render={NavBar}
  />
)