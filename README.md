# Big Transit
Convention based Continuous Delivery pipeline visibility for everyone.

## The one or two liner
An AWS Serverless backend and API Gateway providing a consistent approach to visualise near real-time progress of each stage within product engineering teams Continuous Delivery pipelines. 

## Brief Summary
Big Transit provides an API abstraction over common CI/CD tooling, starting with implementations for AWS CodePipeline and Github Actions. It is intended to provide a consistent, versioned backend API for teams to build light weight frontends to visualise how effectively their Continuous Delivery Pipelines and day-to-day activities are helping them demonstrate true Continuous Integration and Continuous Delivery practices.  

## 💻 Requirements
### Node.js
Big Transit requires Node.js version 20.9.9 or higher. The goal is always to be running Node major version -1 at the oldest.
Install Node.js from the official website: https://nodejs.org/

If you have a different version of Node.js installed on your machine, you can use a version manager like NVM to switch between different versions.

$ nvm install 20.9.0
$ nvm use 20.9.0
$ node -v

### SST
Big Transit uses [sst](https://ion.sst.dev/) to define the application architecture and configure, debug and deploy the necessary AWS infrastructure. Follow the SST guide to [install the SST CLI](https://ion.sst.dev/docs/reference/cli)

### AWS
You will need a target AWS account for Big Transit to be deployed to. Follow the SST guide to [configure your AWS credentials](https://docs.sst.dev/advanced/iam-credentials#loading-from-a-file)

## Developing
Once the three requirements Node.js, SST and AWS are configured as above, simply.

1. Run `npm install`
1. Run `sst dev`

This will start Big Transit using SST Live. Live is a feature of SST that lets you test changes made to your functions in milliseconds. Your changes work without having to redeploy. And they can be invoked remotely. [Find out more about Live here](https://ion.sst.dev/docs/live/)

## Deploying
SST is also used for deploying. 

Run `sst deploy`