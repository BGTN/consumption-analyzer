# AD Application (no ARM template integration exists atm)
$adApplication = Get-AzADApplication -IdentifierUri "$env:AD_APPLICATION_IDENTIFIER_URIS" -ErrorAction Continue
if(!$adApplication) {
  Write-Host "Creating new AD application $env:AD_APPLICATION_NAME"
  New-AzADApplication -DisplayName "$env:AD_APPLICATION_NAME" -IdentifierUris "$env:AD_APPLICATION_IDENTIFIER_URIS"
} else {
  Write-Host "Updating AD application $env:AD_APPLICATION_NAME"
  Update-AzADApplication -ObjectId $adApplication.ObjectId -DisplayName "$env:AD_APPLICATION_NAME" -IdentifierUris "$env:AD_APPLICATION_IDENTIFIER_URIS"
}