import { GqlModuleOptions } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

const getErrorsAsString = (data: string | string[]) => {
  if (Array.isArray(data)) {
    return data.join(', ');
  }
  return data;
};


export const apolloConfig: GqlModuleOptions = {
  autoSchemaFile: true,
  introspection: true,
  installSubscriptionHandlers: true,
  playground: {
    settings: { 'editor.fontSize': 22 },
  },
  formatError: (error: GraphQLError) => {
    const formatedError: { message: string; statusCode: number } = {
      message: getErrorsAsString(error.extensions?.exception?.response?.message || error.message),
      statusCode: error.extensions?.exception?.response?.statusCode || error.extensions?.exception?.status || 500,
    };
    return formatedError;
  },
};
