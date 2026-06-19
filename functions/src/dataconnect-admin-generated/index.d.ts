import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

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

/** Generated Node Admin SDK operation action function for the 'CreateOrderRequest' Mutation. Allow users to execute without passing in DataConnect. */
export function createOrderRequest(dc: DataConnect, vars: CreateOrderRequestVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateOrderRequestData>>;
/** Generated Node Admin SDK operation action function for the 'CreateOrderRequest' Mutation. Allow users to pass in custom DataConnect instances. */
export function createOrderRequest(vars: CreateOrderRequestVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateOrderRequestData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateProjectStatus' Mutation. Allow users to execute without passing in DataConnect. */
export function updateProjectStatus(dc: DataConnect, vars: UpdateProjectStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateProjectStatusData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateProjectStatus' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateProjectStatus(vars: UpdateProjectStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateProjectStatusData>>;

/** Generated Node Admin SDK operation action function for the 'ListMyOrderRequests' Query. Allow users to execute without passing in DataConnect. */
export function listMyOrderRequests(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListMyOrderRequestsData>>;
/** Generated Node Admin SDK operation action function for the 'ListMyOrderRequests' Query. Allow users to pass in custom DataConnect instances. */
export function listMyOrderRequests(options?: OperationOptions): Promise<ExecuteOperationResponse<ListMyOrderRequestsData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteProject' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteProject(dc: DataConnect, vars: DeleteProjectVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteProjectData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteProject' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteProject(vars: DeleteProjectVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteProjectData>>;

