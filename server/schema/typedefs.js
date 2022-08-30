const {gql} = require("apollo-server");


const typeDefs = gql`
    #ROOT 
    type Query {
        items:[Item!]!
        item(id: ID!):Item!
        requirements:[Requirement!]!
    }
    
    #ITEM 
    type Item {
        id: ID!
        name: String!
        price: Int!
        category: Category!
        subItems: [Item]
        requirements:[Requirement!]
    }
    enum Category {
        cat1
        cat2
        cat3
    }

    #REQUIREMENTS
    type Requirement{
        id: ID!
        name: String!
        quantity: Int!
        qualityGrade: Quality!
    }
    enum Quality {
        GOOD
        AVG
        BAD
    }  

    #MUTATIONS
    type Mutation{
        createItem(input: CreateItemInput!): Item
        updateItemname(input: CreateUpdateItemname!): Item
        deleteItem(id:ID!):Item
    }

    input CreateItemInput {
        name: String!
        price: Int!
        category: Category!
    }

    input CreateUpdateItemname {
        id: ID!
        newName: String! 
    }
    
`;

module.exports = { typeDefs };