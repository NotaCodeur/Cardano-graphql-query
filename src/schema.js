"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("@graphql-tools/schema");
const axios_1 = __importDefault(require("axios"));
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
        contract: (_, { contractAddress }) => {
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
            return axios_1.default.post(endpoint, { query, variables }).then(response => {
                return response.data.data.utxos;
            }).catch(error => {
                throw new Error(error);
            });
        },
    },
};
const schema = (0, schema_1.makeExecutableSchema)({
    typeDefs,
    resolvers,
});
exports.default = schema;
