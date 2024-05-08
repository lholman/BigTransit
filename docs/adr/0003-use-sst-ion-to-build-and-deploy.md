# 3. Use SST ION to build and deploy

Date: 2024-05-08

## Status

Accepted

## Context

There are many developer frameworks and patterns to build serverless applications. Most of those have limited or sub-par developer experiences and do not 
treat infrastructre configuration and deployment as a first class citizen.   

## Decision

Use https://sst.dev ION to build, debug and deploy the Big Transit application.

## Consequences

* SST provides Live Lambda development environment that connects directly to AWS. Letting you set breakpoints and test functions locally, hot reloading those Lambda functions in milliseconds.
* SST supports using Typescript to build your application and define and deploy you infrastructure (using an abstraction over Terraform and Pulumi).
* SST support the Monorepo structure well and simplifies linking AWS infrastructure resources together and binding to application code and runtime.
* There's a learning curve to SST and the recent version SST ION that uses Terraform and Pulumi for infrastructure is still new and not as feature rich as SST 2, that uses the now deprecated CDK abstration for infrastructure.
