// tslint:disable: ordered-imports
import next from 'next';
import Koa, { Request } from 'koa';
import Router from 'koa-router';
import graphqlHttp, { OptionsData } from 'koa-graphql';
import cors from 'koa-cors';
import convert from 'koa-convert';
import { print } from 'graphql/language';
import koaPlayground from 'graphql-playground-middleware-koa';
import { GraphQLError } from 'graphql';

import schema from './schema';
import * as loaders from './graphql/loader';
import { getUser, getDataloaders } from './helper';
import connectToDatabase from './database';

const port = parseInt(process.env.PORT || '3000', 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, quiet: true });
const handle = app.getRequestHandler();

const graphqlSettingsPerReq = async (req: Request): Promise<OptionsData> => {
  const dataloaders = await getDataloaders(loaders);
  const { user } = await getUser(dataloaders, req.header.authorization);
  console.log(
    '====== process.env.NODE_ENV !== ',
    process.env.NODE_ENV !== 'production'
  );

  return {
    graphiql: process.env.NODE_ENV !== 'production',
    schema,
    pretty: true,
    context: {
      user,
      req,
      dataloaders
    },
    // @ts-ignore
    extensions: ({ document, variables, operationName, result }): void => {
      // @ts-ignore
      console.log(print(document));
      console.log(variables);
      console.log(operationName, result);
    },
    formatError: (error: GraphQLError): any => {
      console.log(error.message);
      console.log(error.locations);
      console.log(error.stack);

      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack
      };
    }
  };
};

const graphqlServer = convert(graphqlHttp(graphqlSettingsPerReq));

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  router.get('/', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  // router.get('/post/:slug', async ctx => {
  //   console.log('========== /post', ctx.params, ctx.query);
  //   // await handle(ctx.req, ctx.res, { query: { slug: ctx.params.slug } });
  //   await app.render(ctx.req, ctx.res, '/post', { slug: ctx.params.slug });
  //   ctx.respond = false;
  // });

  // router.get('/admin', async ctx => {
  //   await handle(ctx.req, ctx.res);
  //   ctx.respond = false;
  // });

  router.get('/signin', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  router.all('/graphql', graphqlServer);

  if (process.env.NODE_ENV !== 'production') {
    router.all(
      '/playground',
      koaPlayground({
        endpoint: '/graphql'
      })
    );
  }

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  server.use(cors());

  server.use(router.routes()).use(router.allowedMethods());

  server.listen(port, async () => {
    try {
      const info = await connectToDatabase();
      // @ts-ignore
      console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    } catch (error) {
      console.error('Unable to connect to database');
      process.exit(1);
    }
    console.log(`> Ready on http://localhost:${port}`);
  });
});
