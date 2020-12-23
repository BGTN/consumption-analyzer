# Consumption Analyzer
An app to track your power- and water-consumptions.

## ConsumptionAnalyzeService

### Angular ClientApp 
- UI for CRUD operations and visualization for ConsumptionMeasurements
![Alt text](docu/AzurePortal/UIHome.PNG?raw=true "UIHome")
![Alt text](docu/AzurePortal/UIPower1.PNG?raw=true "UIPower1")
![Alt text](docu/AzurePortal/UIPower2.PNG?raw=true "UIPower2")

### Dotnet Core App

**ConsumptionMeasurementsController**
- Provides an API with CRUD operations for ConsumptionMeasurements

**TableDatabaseClient**
- Provides an CRUD implementation of the IDatabase Interface for Azure Table Storage


### /ci/infra
- Deploy Azure Resources via ARM template
  - KeyVault
  - Storage Account
  - KeyVault Secret with Storage Account Connection String
  - Permissions to KeyVault from Active Directory App

## core-ci
- Provides setting of environment variables for the whole solution

# Getting started
- Run via local powershell
```
# Login
Connect-AzAccount
# Deploy an Active Directory App via local script with a user, that has permissions to the Azure Active Directory
ConsumptionAnalyzeService/ci/infra/active-directory/deploy-ad-apps.ps1
```

- Create a secret for the freshly created AD app:
![Alt text](docu/AzurePortal/AzureADAddSecret.PNG?raw=true "AzureADAddSecret")

- In Azure Devops, create a ServiceConnection with name "PAYG" (or use an existing by change the name in ConsumptionAnalyzeService/ci/infra/arm/azure-pipelines.yml)

- Add the API Permissions to the AD Application, which is used by your ServiceConnection:
https://portal.azure.com >> App registrations >> {your azure devops serviceconnection app}
![Alt text](docu/AzurePortal/AppPermissionsServicePrincipal.PNG?raw=true "AppPermissionsServicePrincipal")

- Add and run a Azure DevOps Pipeline, referencing to ConsumptionAnalyzeService/ci/infra/arm/azure-pipelines.yml
![Alt text](docu/AzureDevOps/AzureDevOpsNewInfraYamlPipeline.PNG?raw=true "AzureDevOpsNewInfraYamlPipeline")

## Option A) Visual Studio
- Copy ConsumptionAnalyzeService/appsettings.json, name it appsettings.Development.json, adapt the variables

- Set docker-compose as startup project in Visual Studio and run

## Option B) Docker
```docker pull bgtn/my-home-consumption:latest```
- run with environment variables, which can be found in ConsumptionAnalyzeService/appsettings.json

## Optional alternatives
- Instead of creating a secret for the AD app, you can also use a certificate, but be aware that this might get harder to integrate it to docker safely**:
```
// Create a certificate in a linux environment:
core-ci/certificates/create-certificate.sh
```

Upload the DER-encoded certificate (.cer) to Azure AD (Reference: https://docs.microsoft.com/en-us/aspnet/core/security/key-vault-configuration?view=aspnetcore-5.0):
- Select the app in Azure AD.
- Navigate to Certificates & secrets.
- Select Upload certificate to upload the certificate, which contains the public key. A .cer, .pem, or .crt certificate is acceptable.
- Adapt AddAzureKeyVault(...) method in Program.cs

---

- How to deploy with local scripts
```
core-ci/variables/setGitignoredVariables.ps1; // adapt variable(s) first
core-ci/variables/setvariables.ps1 -env dev -isLocal;
...
```