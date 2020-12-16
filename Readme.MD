# Consumption Analyzer
An app to track your power- and water-consumptions.

## ConsumptionAnalyzeService

### Angular ClientApp
- UI for CRUD operations and visualization for PowerConsumptions

### Dotnet Core App

**PowerConsumptionsController**
- Provides an API with CRUD operations for PowerConsumptions

**TableDatabaseClient**
- Provides an CRUD implementation of the IDatabase Interface for Azure Table Storage


### /ci
- Deploy Azure Resources via ARM template
  - KeyVault
  - Storage Account
  - KeyVault Secret with Storage Account Connection String

## core-ci
- Provides setting of environment variables for the whole solution

# Local
C:\Users\kaibg\source\repos\consumption-analyzer\core-ci\variables\setGitignoredVariables.ps1;
C:\Users\kaibg\source\repos\consumption-analyzer\core-ci\variables\setvariables.ps1 -env dev -isLocal;
C:\Users\kaibg\source\repos\consumption-analyzer\ConsumptionAnalyzeService\ci\infra\storage-account\deploy-storage.ps1