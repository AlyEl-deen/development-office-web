# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListMyOrderRequests*](#listmyorderrequests)
- [**Mutations**](#mutations)
  - [*CreateOrderRequest*](#createorderrequest)
  - [*UpdateProjectStatus*](#updateprojectstatus)
  - [*DeleteProject*](#deleteproject)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListMyOrderRequests
You can execute the `ListMyOrderRequests` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyOrderRequests(options?: ExecuteQueryOptions): QueryPromise<ListMyOrderRequestsData, undefined>;

interface ListMyOrderRequestsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyOrderRequestsData, undefined>;
}
export const listMyOrderRequestsRef: ListMyOrderRequestsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyOrderRequests(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyOrderRequestsData, undefined>;

interface ListMyOrderRequestsRef {
  ...
  (dc: DataConnect): QueryRef<ListMyOrderRequestsData, undefined>;
}
export const listMyOrderRequestsRef: ListMyOrderRequestsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyOrderRequestsRef:
```typescript
const name = listMyOrderRequestsRef.operationName;
console.log(name);
```

### Variables
The `ListMyOrderRequests` query has no variables.
### Return Type
Recall that executing the `ListMyOrderRequests` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyOrderRequestsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMyOrderRequestsData {
  orderRequests: ({
    id: UUIDString;
    clientName: string;
    projectDescription: string;
    status: string;
    budgetEstimate?: number | null;
    deadline?: DateString | null;
  } & OrderRequest_Key)[];
}
```
### Using `ListMyOrderRequests`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyOrderRequests } from '@dataconnect/generated';


// Call the `listMyOrderRequests()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyOrderRequests();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyOrderRequests(dataConnect);

console.log(data.orderRequests);

// Or, you can use the `Promise` API.
listMyOrderRequests().then((response) => {
  const data = response.data;
  console.log(data.orderRequests);
});
```

### Using `ListMyOrderRequests`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyOrderRequestsRef } from '@dataconnect/generated';


// Call the `listMyOrderRequestsRef()` function to get a reference to the query.
const ref = listMyOrderRequestsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyOrderRequestsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.orderRequests);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.orderRequests);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateOrderRequest
You can execute the `CreateOrderRequest` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createOrderRequest(vars: CreateOrderRequestVariables): MutationPromise<CreateOrderRequestData, CreateOrderRequestVariables>;

interface CreateOrderRequestRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrderRequestVariables): MutationRef<CreateOrderRequestData, CreateOrderRequestVariables>;
}
export const createOrderRequestRef: CreateOrderRequestRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createOrderRequest(dc: DataConnect, vars: CreateOrderRequestVariables): MutationPromise<CreateOrderRequestData, CreateOrderRequestVariables>;

interface CreateOrderRequestRef {
  ...
  (dc: DataConnect, vars: CreateOrderRequestVariables): MutationRef<CreateOrderRequestData, CreateOrderRequestVariables>;
}
export const createOrderRequestRef: CreateOrderRequestRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createOrderRequestRef:
```typescript
const name = createOrderRequestRef.operationName;
console.log(name);
```

### Variables
The `CreateOrderRequest` mutation requires an argument of type `CreateOrderRequestVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateOrderRequestVariables {
  clientName: string;
  email: string;
  projectDescription: string;
  status: string;
  budgetEstimate: number;
  deadline: DateString;
}
```
### Return Type
Recall that executing the `CreateOrderRequest` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateOrderRequestData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateOrderRequestData {
  orderRequest_insert: OrderRequest_Key;
}
```
### Using `CreateOrderRequest`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createOrderRequest, CreateOrderRequestVariables } from '@dataconnect/generated';

// The `CreateOrderRequest` mutation requires an argument of type `CreateOrderRequestVariables`:
const createOrderRequestVars: CreateOrderRequestVariables = {
  clientName: ..., 
  email: ..., 
  projectDescription: ..., 
  status: ..., 
  budgetEstimate: ..., 
  deadline: ..., 
};

// Call the `createOrderRequest()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createOrderRequest(createOrderRequestVars);
// Variables can be defined inline as well.
const { data } = await createOrderRequest({ clientName: ..., email: ..., projectDescription: ..., status: ..., budgetEstimate: ..., deadline: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createOrderRequest(dataConnect, createOrderRequestVars);

console.log(data.orderRequest_insert);

// Or, you can use the `Promise` API.
createOrderRequest(createOrderRequestVars).then((response) => {
  const data = response.data;
  console.log(data.orderRequest_insert);
});
```

### Using `CreateOrderRequest`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createOrderRequestRef, CreateOrderRequestVariables } from '@dataconnect/generated';

// The `CreateOrderRequest` mutation requires an argument of type `CreateOrderRequestVariables`:
const createOrderRequestVars: CreateOrderRequestVariables = {
  clientName: ..., 
  email: ..., 
  projectDescription: ..., 
  status: ..., 
  budgetEstimate: ..., 
  deadline: ..., 
};

// Call the `createOrderRequestRef()` function to get a reference to the mutation.
const ref = createOrderRequestRef(createOrderRequestVars);
// Variables can be defined inline as well.
const ref = createOrderRequestRef({ clientName: ..., email: ..., projectDescription: ..., status: ..., budgetEstimate: ..., deadline: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createOrderRequestRef(dataConnect, createOrderRequestVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.orderRequest_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.orderRequest_insert);
});
```

## UpdateProjectStatus
You can execute the `UpdateProjectStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateProjectStatus(vars: UpdateProjectStatusVariables): MutationPromise<UpdateProjectStatusData, UpdateProjectStatusVariables>;

interface UpdateProjectStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectStatusVariables): MutationRef<UpdateProjectStatusData, UpdateProjectStatusVariables>;
}
export const updateProjectStatusRef: UpdateProjectStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProjectStatus(dc: DataConnect, vars: UpdateProjectStatusVariables): MutationPromise<UpdateProjectStatusData, UpdateProjectStatusVariables>;

interface UpdateProjectStatusRef {
  ...
  (dc: DataConnect, vars: UpdateProjectStatusVariables): MutationRef<UpdateProjectStatusData, UpdateProjectStatusVariables>;
}
export const updateProjectStatusRef: UpdateProjectStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProjectStatusRef:
```typescript
const name = updateProjectStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateProjectStatus` mutation requires an argument of type `UpdateProjectStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProjectStatusVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `UpdateProjectStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProjectStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProjectStatusData {
  orderRequest_update?: OrderRequest_Key | null;
}
```
### Using `UpdateProjectStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProjectStatus, UpdateProjectStatusVariables } from '@dataconnect/generated';

// The `UpdateProjectStatus` mutation requires an argument of type `UpdateProjectStatusVariables`:
const updateProjectStatusVars: UpdateProjectStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateProjectStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProjectStatus(updateProjectStatusVars);
// Variables can be defined inline as well.
const { data } = await updateProjectStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProjectStatus(dataConnect, updateProjectStatusVars);

console.log(data.orderRequest_update);

// Or, you can use the `Promise` API.
updateProjectStatus(updateProjectStatusVars).then((response) => {
  const data = response.data;
  console.log(data.orderRequest_update);
});
```

### Using `UpdateProjectStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProjectStatusRef, UpdateProjectStatusVariables } from '@dataconnect/generated';

// The `UpdateProjectStatus` mutation requires an argument of type `UpdateProjectStatusVariables`:
const updateProjectStatusVars: UpdateProjectStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateProjectStatusRef()` function to get a reference to the mutation.
const ref = updateProjectStatusRef(updateProjectStatusVars);
// Variables can be defined inline as well.
const ref = updateProjectStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProjectStatusRef(dataConnect, updateProjectStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.orderRequest_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.orderRequest_update);
});
```

## DeleteProject
You can execute the `DeleteProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteProject(vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;

interface DeleteProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
}
export const deleteProjectRef: DeleteProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteProject(dc: DataConnect, vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;

interface DeleteProjectRef {
  ...
  (dc: DataConnect, vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
}
export const deleteProjectRef: DeleteProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteProjectRef:
```typescript
const name = deleteProjectRef.operationName;
console.log(name);
```

### Variables
The `DeleteProject` mutation requires an argument of type `DeleteProjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteProjectVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteProjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteProjectData {
  orderRequest_delete?: OrderRequest_Key | null;
}
```
### Using `DeleteProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteProject, DeleteProjectVariables } from '@dataconnect/generated';

// The `DeleteProject` mutation requires an argument of type `DeleteProjectVariables`:
const deleteProjectVars: DeleteProjectVariables = {
  id: ..., 
};

// Call the `deleteProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteProject(deleteProjectVars);
// Variables can be defined inline as well.
const { data } = await deleteProject({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteProject(dataConnect, deleteProjectVars);

console.log(data.orderRequest_delete);

// Or, you can use the `Promise` API.
deleteProject(deleteProjectVars).then((response) => {
  const data = response.data;
  console.log(data.orderRequest_delete);
});
```

### Using `DeleteProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteProjectRef, DeleteProjectVariables } from '@dataconnect/generated';

// The `DeleteProject` mutation requires an argument of type `DeleteProjectVariables`:
const deleteProjectVars: DeleteProjectVariables = {
  id: ..., 
};

// Call the `deleteProjectRef()` function to get a reference to the mutation.
const ref = deleteProjectRef(deleteProjectVars);
// Variables can be defined inline as well.
const ref = deleteProjectRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteProjectRef(dataConnect, deleteProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.orderRequest_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.orderRequest_delete);
});
```

