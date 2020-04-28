#!/usr/bin/env bash
java -Djava.library.path=dynamo/db -jar dynamo/db/DynamoDBLocal.jar -sharedDb
