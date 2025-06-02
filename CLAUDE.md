# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Big Transit is an AWS Serverless backend providing a consistent API abstraction over CI/CD tooling (AWS CodePipeline, Github Actions) to visualize Continuous Delivery pipeline progress. Built as a TypeScript monorepo using SST Ion for infrastructure-as-code.

## Architecture

- **Monorepo structure**: Infrastructure in `infra/`, domain logic in `packages/core/`, API handlers in `packages/functions/`
- **Single-table DynamoDB design**: All entities stored in one table with PK/SK pattern
- **Domain-driven design**: Separate data access layer (DAL) with interfaces, mappers, and domain services
- **SST Ion**: Infrastructure defined as code, supports live development mode
- **Serverless**: API Gateway v2 + Lambda functions

## Essential Commands

**Development**:
```bash
npm install          # Install dependencies  
sst dev             # Start SST Live development mode
```

**Testing**:
```bash
npm run build       # TypeScript compilation check
npm run unit        # Unit tests (packages/core) with coverage
npm run acceptance  # Acceptance tests (packages/functions)
```

**Security**:
```bash
node scripts/check-audit.js  # Check for high/critical npm vulnerabilities
```

## Key Patterns

**Domain Structure** (per domain like Team):
- `{domain}.dal.interface.ts` - Data access interface
- `{domain}.dal.ts` - DynamoDB implementation  
- `{domain}.mapper.ts` - DAL ↔ domain object mapping
- `{domain}.ts` - Business logic/domain service

**Testing Structure**:
- Unit tests in `packages/core/test/` - no infrastructure required
- Acceptance tests in `packages/functions/test/` - require deployed infrastructure
- Mocks in `packages/core/test/types/` for DAL and SST resources

**Infrastructure Linking**:
- Lambda functions linked to database via SST `link: [database]`
- Resources imported dynamically in `sst.config.ts`

## Development Notes

- Uses Node.js 20.9.9+
- Vitest for testing with coverage reporting
- TypeScript strict mode
- True Continuous Integration on main branch
- AWS credentials required for deployment/acceptance tests