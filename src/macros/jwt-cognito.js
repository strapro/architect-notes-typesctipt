/* eslint-disable @typescript-eslint/no-var-requires */
const parse = require('@architect/parser');
const fs = require('fs');
const path = require('path');

module.exports = function (arc, cfn) {
  if (!arc.jwt) {
    return cfn;
  }

  const apiName = getApiName(cfn);
  const config = getConfig(arc);
  const httpApi = cfn.Resources[apiName];

  httpApi.Properties.Auth = {
    Authorizers: {
      OAuth2Authorizer: {
        AuthorizationScopes: config.scopes,
        JwtConfiguration: {
          issuer: config.issuer,
          audience: config.audience,
        },
        IdentitySource: config.identitySource,
      },
    },
  };

  if (config.default) {
    httpApi.Properties.Auth.DefaultAuthorizer = 'OAuth2Authorizer';
  } else {
    for (const resource of findRoutes(cfn)) {
      const pathToCode = cfn.Resources[resource].Properties.CodeUri;
      const config = getRouteConfig(pathToCode);

      if (config !== false) {
        cfn.Resources[resource].Properties.Events[
          `${resource.replace('Lambda', '')}Event`
        ].Properties.Auth = {
          Authorizer: 'OAuth2Authorizer',
          AuthorizationScopes: config.scopes,
        };
      }
    }
  }

  return cfn;
};

function findRoutes(cfn) {
  function isFunction(resource) {
    return resource.Type === 'AWS::Serverless::Function';
  }

  function hasHttpEvent(resource, name) {
    return (
      resource.Properties &&
      resource.Properties.Events &&
      Object.keys(resource.Properties.Events).length > 0 &&
      Object.keys(resource.Properties.Events).includes(`${name}Event`) &&
      resource.Properties.Events[`${name}Event`].Type === 'HttpApi'
    );
  }

  return Object.keys(cfn.Resources)
    .filter((resource) => isFunction(cfn.Resources[resource]))
    .filter((resource) =>
      hasHttpEvent(cfn.Resources[resource], resource.replace('Lambda', ''))
    );
}

function getApiName(cfn) {
  return Object.keys(cfn.Resources).find(
    (resource) => cfn.Resources[resource].Type === 'AWS::Serverless::HttpApi'
  );
}

function splitStrings([key, value]) {
  if (key === 'audience' || key === 'scopes') {
    return [key, value.split(',')];
  }

  return [key, value];
}

function getConfig(arc) {
  const defaultConfig = {
    issuer: '',
    audience: [],
    scopes: [],
    identitySource: '$request.header.Authorization',
    default: false,
  };

  return {
    ...defaultConfig,
    ...Object.fromEntries(arc.jwt.map((setting) => splitStrings(setting))),
  };
}

function getRouteConfig(pathToCode) {
  const defaultConfig = {
    scopes: [],
  };
  const arcFile = path.join(pathToCode, 'config.arc');
  const exists = fs.existsSync(arcFile);

  if (exists) {
    const raw = fs.readFileSync(arcFile).toString().trim();
    const config = parse(raw);

    if (config.jwt) {
      return {
        ...defaultConfig,
        ...Object.fromEntries(
          config.jwt.map((setting) => splitStrings(setting))
        ),
      };
    }
  }
  return false;
}
