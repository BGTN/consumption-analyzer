param (
	[String]$env
)

function WriteVarToHost($key, $value) {
	Write-Host $key = $value
	Write-Host "##vso[task.setvariable variable=$key]$value"
	[Environment]::SetEnvironmentVariable($key, $value)
}


$location = 'northeurope'
WriteVarToHost 'LOCATION' $location
$locationShort = 'neu'

$STORAGE_RESOURCEGROUP_NAME = "consumption_analyzer_storage_" + $env + "_" + $location + "_rg"
WriteVarToHost 'STORAGE_RESOURCEGROUP_NAME' $STORAGE_RESOURCEGROUP_NAME

$STORAGE_NAME = "consmptanalyzerst$env$locationShort"
WriteVarToHost 'STORAGE_NAME' $STORAGE_NAME

$KEYVAULT_NAME = "consmptanalyzer-kev-$env-$locationShort"
WriteVarToHost 'KEYVAULT_NAME' $KEYVAULT_NAME

$Context = Get-AzContext
$AzureDevOpsServicePrincipal = Get-AzADServicePrincipal -ApplicationId $Context.Account.Id
$SERVICE_PRINCIPAL_OBJECT_ID = $AzureDevOpsServicePrincipal.Id
WriteVarToHost 'SERVICE_PRINCIPAL_OBJECT_ID' $SERVICE_PRINCIPAL_OBJECT_ID
