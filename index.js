const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { ApolloGateway, IntrospectAndCompose } = require('@apollo/gateway');

async function startGateway() {
  console.log('Iniciando ApolloGateway...');
  const subgraphs = [
    { name: 'paciente', url: 'https://cn2x-iryo-paciente-api-49699051626.us-west2.run.app/graphql/' },
    { name: 'ulcera-venosa', url: 'https://cn2x-iryo-ulceravenosa-api-49699051626.us-west2.run.app/graphql/' },
  ];
  console.log('Subgrafos configurados:', subgraphs); 
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({ subgraphs }),
  });
//https://cn2x-iryo-ulceravenosa-api-49699051626.us-west2.run.app/ 
  console.log('Criando ApolloServer...');
  const server = new ApolloServer({ gateway });

  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: process.env.PORT || 4000 },
    });
    console.log(`🚀 Apollo Federation Gateway pronto em ${url}`);
    console.log('📊 Subgrafos configurados:', subgraphs);
  } catch (err) {
    console.error('Erro ao iniciar o Apollo Server:', err);
    throw err;
  }
}

startGateway().catch(error => {
  console.error('Erro ao iniciar o gateway:', error);
  process.exit(1);
});
