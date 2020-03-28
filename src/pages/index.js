import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Description from "../components/description";
import { Link } from "gatsby";

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <Description location="home" />
      <div className="mb-10 border shadow p-6">
        <p className="mb-6">
          <h2>If you're impacted in any way by COVID-19, please <Link to="/find-help" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          target="_blank"
          rel="noopener noreferrer">Find Help</Link></h2>
        </p>
        <p>
          <h2>If you're in a position to, please <Link to="/give-help" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          target="_blank"
          rel="noopener noreferrer">Give Help</Link></h2>
        </p>
      </div>
    </Layout>
  );
};    

export default IndexPage;