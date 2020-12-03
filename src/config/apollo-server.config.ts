import { GqlModuleOptions } from '@nestjs/graphql';

export const apolloConfig: GqlModuleOptions = {
  autoSchemaFile: true,
  installSubscriptionHandlers: true,
  introspection: true,
  playground: {
    settings: { 'editor.fontSize': 22 },
  },
};
