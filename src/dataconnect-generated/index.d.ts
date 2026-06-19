import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface ChatMessage_Key {
  id: UUIDString;
  __typename?: 'ChatMessage_Key';
}

export interface ChatSession_Key {
  id: UUIDString;
  __typename?: 'ChatSession_Key';
}

export interface CreateOrderRequestData {
  orderRequest_insert: OrderRequest_Key;
}

export interface CreateOrderRequestVariables {
  clientName: string;
  email: string;
  projectDescription: string;
  status: string;
  budgetEstimate: number;
  deadline: DateString;
}

export interface DeleteProjectData {
  orderRequest_delete?: OrderRequest_Key | null;
}

export interface DeleteProjectVariables {
  id: UUIDString;
}

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

export interface OrderRequest_Key {
  id: UUIDString;
  __typename?: 'OrderRequest_Key';
}

export interface Project_Key {
  id: UUIDString;
  __typename?: 'Project_Key';
}

export interface UpdateProjectStatusData {
  orderRequest_update?: OrderRequest_Key | null;
}

export interface UpdateProjectStatusVariables {
  id: UUIDString;
  status: string;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateOrderRequestRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrderRequestVariables): MutationRef<CreateOrderRequestData, CreateOrderRequestVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateOrderRequestVariables): MutationRef<CreateOrderRequestData, CreateOrderRequestVariables>;
  operationName: string;
}
export const createOrderRequestRef: CreateOrderRequestRef;

export function createOrderRequest(vars: CreateOrderRequestVariables): MutationPromise<CreateOrderRequestData, CreateOrderRequestVariables>;
export function createOrderRequest(dc: DataConnect, vars: CreateOrderRequestVariables): MutationPromise<CreateOrderRequestData, CreateOrderRequestVariables>;

interface UpdateProjectStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectStatusVariables): MutationRef<UpdateProjectStatusData, UpdateProjectStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProjectStatusVariables): MutationRef<UpdateProjectStatusData, UpdateProjectStatusVariables>;
  operationName: string;
}
export const updateProjectStatusRef: UpdateProjectStatusRef;

export function updateProjectStatus(vars: UpdateProjectStatusVariables): MutationPromise<UpdateProjectStatusData, UpdateProjectStatusVariables>;
export function updateProjectStatus(dc: DataConnect, vars: UpdateProjectStatusVariables): MutationPromise<UpdateProjectStatusData, UpdateProjectStatusVariables>;

interface ListMyOrderRequestsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyOrderRequestsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyOrderRequestsData, undefined>;
  operationName: string;
}
export const listMyOrderRequestsRef: ListMyOrderRequestsRef;

export function listMyOrderRequests(options?: ExecuteQueryOptions): QueryPromise<ListMyOrderRequestsData, undefined>;
export function listMyOrderRequests(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyOrderRequestsData, undefined>;

interface DeleteProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
  operationName: string;
}
export const deleteProjectRef: DeleteProjectRef;

export function deleteProject(vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;
export function deleteProject(dc: DataConnect, vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;

