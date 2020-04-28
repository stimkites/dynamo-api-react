/**
 * In this file we are describing basic necessary parameters of our Dynamo database
 *
 * List of DB tables
 */

let DB = [
  {
    TableName : "Tokens",
    KeySchema: [
        { AttributeName: "id", KeyType: "HASH" },  //Partition key
    ],
    AttributeDefinitions: [
        {
            AttributeName: "id",
            AttributeType: "S"
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 128,
        WriteCapacityUnits: 128
    }
  },
  {
    TableName : "Users",
    KeySchema: [
        { AttributeName: "id", KeyType: "HASH" },
    ],
    AttributeDefinitions: [
        {
            AttributeName: "id",
            AttributeType: "S"
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 128,
        WriteCapacityUnits: 128
    }
  },
  {
    TableName : "Clients",
    KeySchema: [
      { AttributeName: "id", KeyType: "HASH" },
    ],
    AttributeDefinitions: [
      {
        AttributeName: "id",
        AttributeType: "S"
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 128,
      WriteCapacityUnits: 128
    }
  },
  {
    TableName : "Operations",
    KeySchema: [
      { AttributeName: "id", KeyType: "HASH" },
    ],
    AttributeDefinitions: [
      {
        AttributeName: "id",
        AttributeType: "S"
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 128,
      WriteCapacityUnits: 128
    }
  }
];

module.exports = DB;