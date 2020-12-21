# Consumption Analyzer
An app to track your power- and water-consumptions.

## ConsumptionAnalyzeService

### Angular ClientApp 
- UI for CRUD operations and visualization for ConsumptionMeasurements

### Dotnet Core App

**ConsumptionMeasurementsController**
- Provides an API with CRUD operations for ConsumptionMeasurements

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

Add the API Permissions to the freshly date AD Application:
https://portal.azure.com >> App registrations >> {your azure devops serviceconnection app}
![Alt text](docu/AppPermissionsServicePrincipal.PNG?raw=true "AppPermissionsServicePrincipal")

```
ConsumptionAnalyzeService/ci/infra/arm/deploy-arm.ps1
// Create a certificate in a linux environment:
core-ci/certificates/create-certificate.sh

```
Upload the DER-encoded certificate (.cer) to Azure AD (Reference: https://docs.microsoft.com/en-us/aspnet/core/security/key-vault-configuration?view=aspnetcore-5.0):
- Select the app in Azure AD.
- Navigate to Certificates & secrets.
- Select Upload certificate to upload the certificate, which contains the public key. A .cer, .pem, or .crt certificate is acceptable.