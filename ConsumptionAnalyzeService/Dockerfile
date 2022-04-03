#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0-bullseye-slim AS base
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_12.x | bash \
    && apt-get install nodejs -yq
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0-bullseye-slim AS build
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_12.x | bash \
    && apt-get install nodejs -yq
WORKDIR /src
COPY ["ConsumptionAnalyzeService/ConsumptionAnalyzeService.csproj", "ConsumptionAnalyzeService/"]
RUN dotnet restore "ConsumptionAnalyzeService/ConsumptionAnalyzeService.csproj"
COPY . .
WORKDIR "/src/ConsumptionAnalyzeService"
RUN dotnet build "ConsumptionAnalyzeService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ConsumptionAnalyzeService.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ConsumptionAnalyzeService.dll"]