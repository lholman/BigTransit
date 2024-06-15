# Big Transit
Convention based Continuous Delivery pipeline visibility for everyone.

## The one or two liner
An AWS Serverless backend and API Gateway providing a consistent approach to visualise near real-time progress of each stage within product engineering teams Continuous Delivery pipelines. 

## Brief Summary
Big Transit provides an API abstraction over common CI/CD tooling, starting with implementations for AWS CodePipeline and Github Actions. It is intended to provide a consistent, versioned backend API for teams to build light weight frontends to visualise how effectively their Continuous Delivery Pipelines and day-to-day activities are helping them demonstrate true Continuous Integration and Continuous Delivery practices.  

## 💻 Requirements
### Architecture Decision Records
This project records its main architectural decisions as ADRs, please take a moment to read these within docs/adr as they explain the context, decision and consequences of the major decisions. 
Big Transit uses the awesomely simple [ADR Tools](https://github.com/npryce/adr-tools/blob/master/INSTALL.md) for writing and maintaining these ADR files. Install ADR Tools using brew

```
brew install adr-tools
adr list
```

### Node.js
Big Transit requires Node.js version 20.9.9 or higher. The goal is always to be running Node major version -1 at the oldest.
Install Node.js from the official website: https://nodejs.org/

If you have a different version of Node.js installed on your machine, you can use a version manager like NVM to switch between different versions.

https://nodejs.org/en/download/package-manager

```
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
$ nvm install 20
$ node -v
$ npm -v
```

### SST
Big Transit uses [sst](https://ion.sst.dev/) to define the application architecture and configure, debug and deploy the necessary AWS infrastructure. Follow the SST guide to [install the SST CLI](https://ion.sst.dev/docs/reference/cli)

### AWS
You will need a target AWS account for Big Transit to be deployed to. Follow the SST guide to [configure your AWS credentials](https://docs.sst.dev/advanced/iam-credentials#loading-from-a-file)

## 🚀 Getting started
Once the three requirements Node.js, SST and AWS are configured as above, simply.

```
npm install
sst dev
```

This will start Big Transit using SST Live. Live is a feature of SST that lets you test changes made to your functions in milliseconds. Your changes work without having to redeploy. And they can be invoked remotely. [Find out more about Live here](https://ion.sst.dev/docs/live/)

## 👩‍💻 Testing 
Big Transit uses Vitest for unit testing domain code implementation, i.e. the business logic within the `packages/core/src` folders for each domain. To run tests use the handy npm alias.

`npm run test`

Big Transit also uses Vitest for acceptance testing the API and Lambda function implementation, i.e. the code within the `packages/function/src` folders. To run these tests use.

`npm run acceptance`

To read more about Vitest see [Adding Vitest to your project](https://vitest.dev/guide/#adding-vitest-to-your-project)

## Continuous Integration
Big Transit practices true Continuous Integration. Development (at this stage of the project) is completed on the Main branch and commits are integrated very frequently. 
Each push to the `main` branch triggers the GitHow Workflow [.github/workflows/main.yml](.github/workflows/main.yml) Commit job. 

### The Commit job

* Checks out the code, configures the environment dependencies, including NPM
* Runs an NPM Audit that errors the Commit job if High or Critical NPM depedencies are found. See [scripts/check-audit.js](scripts/check-audit.js) for the simple logic for this. GitHub Workflow logs for the Commit job will detail the offending package if this happens. To run this check locally simply run `node scripts/check-audit.js`
* Installs the SST ION deployment Command Line Interface (CLI) and the AWS provider, see [/docs/adr/0003-use-sst-ion-to-build-and-deploy.md](/docs/adr/0003-use-sst-ion-to-build-and-deploy.md) for more detail on SST
* Runs the TypeScript compiler to catch any TS compilation errors `npm run build`
* Runs Unit tests `npm run unit`, these require NO deployed infrastructure to run
* On success of all the above steps, zips up the compiled artifacts and publishes them for subsequent jobs

### The Acceptance job
On success of the Commit job 
* Sets up the environment, including Node and SST
* Downloads the published artifacts from the previous successful Commit job
* Assumes an AWS role specifically configured to allow deployment from GitHub to an AWS Acceptance account
* Deploys to the Acceptance environment See [scripts/deploy-acceptance.js](scripts/deploy-acceptance) for the simple logic for this, that extracts the dynamic API URL as an environment variable
* Runs Acceptance tests `npm run acceptance`, these rely on deployed infrastructure
* If successful tears down the Acceptance environment, using SST
