const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { ApolloGateway, IntrospectAndCompose } = require('@apollo/gateway');

async function startGateway() {
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: 'paciente', url: 'https://cn2x-iryo-paciente-api-49699051626.us-west2.run.app/graphql/' },
      ],
    }),
  });

  const server = new ApolloServer({
    gateway,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
  });

  console.log(`🚀 Apollo Federation Gateway pronto em ${url}`);
  console.log('📊 Subgrafos configurados:');  
}

startGateway().catch(error => {
  console.error('Erro ao iniciar o gateway:', error);
  process.exit(1);
});
