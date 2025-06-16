import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Phuykong Meng`,
    description: 'Phuykong Meng is a student at Temple University that has an interest in full-stack development.',
    siteUrl: `https://www.mphuykong.dev`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-image", "gatsby-plugin-postcss",
  "gatsby-plugin-sass","gatsby-plugin-sharp", "gatsby-transformer-sharp",
  {
    resolve: `gatsby-plugin-csp`,
    options: {
      disableOnDev: true,
      reportOnly: false, // Changes header to Content-Security-Policy-Report-Only for csp testing purposes
      mergeScriptHashes: true, // you can disable scripts sha256 hashes
      mergeStyleHashes: true, // you can disable styles sha256 hashes
      mergeDefaultDirectives: true,
      directives: {
        "script-src": "'self' www.google-analytics.com",
        "style-src": "'self' 'unsafe-inline'",
        "img-src": "'self' data: www.google-analytics.com"
        // you can add your directives or override defaults
      }
    }
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/",
      defaults: {
        quality: 100,
      }
    },
    __key: "images"
  }]
};

export default config;
