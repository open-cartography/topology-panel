# Open Cartography

Bridging the Worlds of Opentelemetry and Cartography

Open Cartography is a cutting-edge visualization tool that seamlessly blends the rich traditions of cartography with the modern advancements of opentelemetry. Our aim is to design and create dynamic, temporal graph networks that provide users with an unparalleled perspective on their data-driven systems.

Historically, cartography has always been about more than just map-making; it's the art and science of understanding and communicating spatial information. For centuries, cartographers have been helping humanity navigate, explore, and understand the world around them. Their work has often been an essential catalyst for breakthroughs in various fields, fostering a sense of adventure, curiosity, and discovery.

Opentelemetry, on the other hand, represents the pinnacle of modern data monitoring and observability. By collecting, analyzing, and correlating metrics, traces, and logs, it empowers users to gain valuable insights into the inner workings of their systems. This unprecedented visibility allows for more informed decision-making, improved performance, and enhanced reliability.

Open Cartography embodies the best of both worlds, blending the historical and emotional resonance of cartography with the technical prowess of opentelemetry. Our product enables users to derive high-level pathways and visually form a behavioral design model of their systems, creating a "human perceivable base map" that is both intuitive and informative. This fusion of art and science allows users to better understand the complex relationships within their systems, paving the way for optimized performance and innovation.

Experience the power of Open Cartography and embark on a new journey of discovery and understanding. Uncover the hidden connections within your system, explore the intricacies of your data, and navigate your way to success with the unparalleled visualization capabilities of Open Cartography.


# Grafana panel plugin template

This template is a starting point for building a panel plugin for Grafana.

## What are Grafana panel plugins?

Panel plugins allow you to add new types of visualizations to your dashboard, such as maps, clocks, pie charts, lists, and more.

Use panel plugins when you want to do things like visualize data returned by data source queries, navigate between dashboards, or control external systems (such as smart home devices).

## Getting started

### Frontend

1. Install dependencies

   ```bash
   yarn install
   ```

2. Build plugin in development mode and run in watch mode

   ```bash
   yarn dev
   ```

3. Build plugin in production mode

   ```bash
   yarn build
   ```

4. Run the tests (using Jest)

   ```bash
   # Runs the tests and watches for changes, requires git init first
   yarn test
   
   # Exists after running all the tests
   yarn test:ci
   ```

5. Spin up a Grafana instance and run the plugin inside it (using Docker)

   ```bash
   yarn server
   ```

6. Run the E2E tests (using Cypress)

   ```bash
   # Spin up a Grafana instance first that we tests against 
   yarn server
   
   # Start the tests
   yarn e2e
   ```

7. Run the linter

   ```bash
   yarn lint
   
   # or

   yarn lint:fix
   ```


# Distributing your plugin

When distributing a Grafana plugin either within the community or privately the plugin must be signed so the Grafana application can verify its authenticity. This can be done with the `@grafana/sign-plugin` package.

_Note: It's not necessary to sign a plugin during development. The docker development environment that is scaffolded with `@grafana/create-plugin` caters for running the plugin without a signature._

## Initial steps

Before signing a plugin please read the Grafana [plugin publishing and signing criteria](https://grafana.com/docs/grafana/latest/developers/plugins/publishing-and-signing-criteria/) documentation carefully.

`@grafana/create-plugin` has added the necessary commands and workflows to make signing and distributing a plugin via the grafana plugins catalog as straightforward as possible.

Before signing a plugin for the first time please consult the Grafana [plugin signature levels](https://grafana.com/docs/grafana/latest/developers/plugins/sign-a-plugin/#plugin-signature-levels) documentation to understand the differences between the types of signature level.

1. Create a [Grafana Cloud account](https://grafana.com/signup).
2. Make sure that the first part of the plugin ID matches the slug of your Grafana Cloud account.
   - _You can find the plugin ID in the plugin.json file inside your plugin directory. For example, if your account slug is `acmecorp`, you need to prefix the plugin ID with `acmecorp-`._
3. Create a Grafana Cloud API key with the `PluginPublisher` role.
4. Keep a record of this API key as it will be required for signing a plugin

## Signing a plugin

### Using Github actions release workflow

If the plugin is using the github actions supplied with `@grafana/create-plugin` signing a plugin is included out of the box. The [release workflow](./.github/workflows/release.yml) can prepare everything to make submitting your plugin to Grafana as easy as possible. Before being able to sign the plugin however a secret needs adding to the Github repository.

1. Please navigate to "settings > secrets > actions" within your repo to create secrets.
2. Click "New repository secret"
3. Name the secret "GRAFANA_API_KEY"
4. Paste your Grafana Cloud API key in the Secret field
5. Click "Add secret"

#### Push a version tag

To trigger the workflow we need to push a version tag to github. This can be achieved with the following steps:

1. Run `npm version <major|minor|patch>`
2. Run `git push origin main --follow-tags`


## Learn more

Below you can find source code for existing app plugins and other related documentation.

- [Basic panel plugin example](https://github.com/grafana/grafana-plugin-examples/tree/master/examples/panel-basic#readme)
- [Plugin.json documentation](https://grafana.com/docs/grafana/latest/developers/plugins/metadata/)
- [How to sign a plugin?](https://grafana.com/docs/grafana/latest/developers/plugins/sign-a-plugin/)
