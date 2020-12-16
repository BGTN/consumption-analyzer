param (
	[String]$env,
	[switch]$isLocal
)

function WriteVarToHost($key, $value, $isSecret) {
	if($isSecret) {
		Write-Host $key = ***
	} else {
		Write-Host $key = $value
	}
	Write-Host "##vso[task.setvariable variable=$key]$value"
	[Environment]::SetEnvironmentVariable($key, $value)
}


$location = 'northeurope'
WriteVarToHost 'LOCATION' $location
$locationShort = 'neu'

$STORAGE_RESOURCEGROUP_NAME = "consumption_analyzer_storage_" + $env + "_" + $location + "_rg"
WriteVarToHost 'STORAGE_RESOURCEGROUP_NAME' $STORAGE_RESOURCEGROUP_NAME

$STORAGE_NAME = "analyzerst$env$locationShort"
WriteVarToHost 'STORAGE_NAME' $STORAGE_NAME

$STORAGE_CONNECTION_STRING_KV_VAR_NAME = "StorageConnectionString"
WriteVarToHost 'STORAGE_CONNECTION_STRING_KV_VAR_NAME' $STORAGE_CONNECTION_STRING_KV_VAR_NAME

$KEYVAULT_NAME = "analyzer-kv-$env-$locationShort"
WriteVarToHost 'KEYVAULT_NAME' $KEYVAULT_NAME

if($isLocal){
	WriteVarToHost 'SERVICE_PRINCIPAL_OBJECT_ID' $env:LOCAL_USER_OBJECT_ID
} else {
$Context = Get-AzContext
$AzureDevOpsServicePrincipal = Get-AzADServicePrincipal -ApplicationId $Context.Account.Id
$SERVICE_PRINCIPAL_OBJECT_ID = $AzureDevOpsServicePrincipal.Id
WriteVarToHost 'SERVICE_PRINCIPAL_OBJECT_ID' $SERVICE_PRINCIPAL_OBJECT_ID $true
}

$AD_APPLICATION_NAME = "BGTN_consumption-analyzer_app_" + $env
WriteVarToHost 'AD_APPLICATION_NAME' $AD_APPLICATION_NAME

$AD_APPLICATION_IDENTIFIER_URIS = "http://bgtn-consumption-analyzer"
WriteVarToHost 'AD_APPLICATION_IDENTIFIER_URIS' $AD_APPLICATION_IDENTIFIER_URIS

$adApplication = Get-AzADApplication -IdentifierUri "$env:AD_APPLICATION_IDENTIFIER_URIS" -ErrorAction Continue
if(!$adApplication) {
	Write-Warning "Please execute the script deploy-ad-apps.ps1 before deploying ARM template!"
} else {
	$AD_APPLICATION_OBJECT_ID = $adApplication.ObjectId
	WriteVarToHost 'AD_APPLICATION_OBJECT_ID' $AD_APPLICATION_OBJECT_ID
}