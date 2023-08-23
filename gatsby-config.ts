import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Phuykong Meng`,
    description: 'Phuykong Meng is a student at Temple University that has an interest in full-stack development (Python, Typescript, React) that concentrated on interactive UX/UI.',
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-image", "gatsby-plugin-postcss", "gatsby-plugin-sass","gatsby-plugin-sharp", "gatsby-transformer-sharp", {
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
