using Azure.Extensions.AspNetCore.Configuration.Secrets;
using Azure.Identity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace ConsumptionAnalyzeService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                })
                .ConfigureAppConfiguration((context, config) =>
                {
                    var builtConfig = config.Build();

                    using (var store = new X509Store(StoreLocation.CurrentUser))
                    {
                        store.Open(OpenFlags.ReadOnly);
                        var certs = store.Certificates
                            .Find(X509FindType.FindByThumbprint,
                                builtConfig["AzureADCertThumbprint"], false);

                        config.AddAzureKeyVault(new Uri($"https://{builtConfig["KeyVaultName"]}.vault.azure.net/"),
                                                new ClientCertificateCredential(builtConfig["AzureADDirectoryId"], builtConfig["AzureADApplicationId"], certs.OfType<X509Certificate2>().Single()),
                                                new KeyVaultSecretManager());

                        store.Close();
                    }
                })
            ;
    }
}
