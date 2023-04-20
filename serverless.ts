import type { AWS } from '@serverless/typescript';
import graphql from '@functions/graphql';
import { generateVcard } from '@functions/vcard';

const serverlessConfiguration: AWS = {
  service: 'contacts-list-sls',
  frameworkVersion: '3',
  plugins: [
    // 'serverless-esbuild',
    'serverless-webpack',
    'serverless-offline',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  functions: {
    graphql,
    generateVcard
  },
  package: { individually: true },
  custom: {
    webpack: {
      webpackConfig: 'webpack.config.js',
      includeModules: {
        forceInclude: ['mysql2', 'sequelize-typescript','sequelize'],
      },
    },
    'serverless-offline': {
      httpPort: 3001
    }
  },
};

module.exports = serverlessConfiguration;
