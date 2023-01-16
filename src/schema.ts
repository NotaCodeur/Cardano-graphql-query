import { 
    makeExecutableSchema,
  } from '@graphql-tools/schema';
import axios from 'axios';

  
  const typeDefs = `
    type Query {
      contract(contractAddress: String!): [Utxos]
    }
    type Utxos {
      tokens: [Token]
    }
    type Token {
      quantity: Int
      asset: Asset
    }
    type Asset {
      policyId: String
      assetName: String
    }
  `;
  
  const resolvers = {
    Query: {
      contract: (_: void, { contractAddress }: { contractAddress: string }) => {
        // your implementation
        
        const endpoint = 'https://graphql-api.mainnet.dandelion.link/';
        const query = `
        query ContractQuery($contractAddress: String!) {
          utxos(
            where: { address: { _eq: $contractAddress } }
          ) {
            tokens{
              quantity
              asset {
                policyId
                assetName
              }
            }
          }
        }
        `;
        const variables = { contractAddress };
        return axios.post(endpoint, { query, variables }).then(response => {
            return response.data.data.utxos;
        }).catch(error => {
            throw new Error(error);
        });
      },
    },
  };
  
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  
  export default schema;
  