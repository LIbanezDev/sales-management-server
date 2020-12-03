import { GqlModuleOptions } from '@nestjs/graphql';

export const apolloConfig: GqlModuleOptions = {
  autoSchemaFile: true,
  installSubscriptionHandlers: true,
  playground: {
    settings: { 'editor.fontSize': 22 },
  },
};
