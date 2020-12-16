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
```
core-ci/variables/setGitignoredVariables.ps1;
core-ci/variables/setvariables.ps1 -env dev -isLocal;
ConsumptionAnalyzeService/ci/infra/active-directory/deploy-ad-apps.ps1;
```

Add API Permissions:
https://portal.azure.com >> App registrations >> {your azure devops serviceconnection app}
![Alt text](docu/AppPermissionsServicePrincipal.PNG?raw=true "AppPermissionsServicePrincipal")

```
ConsumptionAnalyzeService/ci/infra/arm/deploy-arm.ps1
```
