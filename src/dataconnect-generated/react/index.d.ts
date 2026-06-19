import { CreateOrderRequestData, CreateOrderRequestVariables, UpdateProjectStatusData, UpdateProjectStatusVariables, ListMyOrderRequestsData, DeleteProjectData, DeleteProjectVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateOrderRequest(options?: useDataConnectMutationOptions<CreateOrderRequestData, FirebaseError, CreateOrderRequestVariables>): UseDataConnectMutationResult<CreateOrderRequestData, CreateOrderRequestVariables>;
export function useCreateOrderRequest(dc: DataConnect, options?: useDataConnectMutationOptions<CreateOrderRequestData, FirebaseError, CreateOrderRequestVariables>): UseDataConnectMutationResult<CreateOrderRequestData, CreateOrderRequestVariables>;

export function useUpdateProjectStatus(options?: useDataConnectMutationOptions<UpdateProjectStatusData, FirebaseError, UpdateProjectStatusVariables>): UseDataConnectMutationResult<UpdateProjectStatusData, UpdateProjectStatusVariables>;
export function useUpdateProjectStatus(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProjectStatusData, FirebaseError, UpdateProjectStatusVariables>): UseDataConnectMutationResult<UpdateProjectStatusData, UpdateProjectStatusVariables>;

export function useListMyOrderRequests(options?: useDataConnectQueryOptions<ListMyOrderRequestsData>): UseDataConnectQueryResult<ListMyOrderRequestsData, undefined>;
export function useListMyOrderRequests(dc: DataConnect, options?: useDataConnectQueryOptions<ListMyOrderRequestsData>): UseDataConnectQueryResult<ListMyOrderRequestsData, undefined>;

export function useDeleteProject(options?: useDataConnectMutationOptions<DeleteProjectData, FirebaseError, DeleteProjectVariables>): UseDataConnectMutationResult<DeleteProjectData, DeleteProjectVariables>;
export function useDeleteProject(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteProjectData, FirebaseError, DeleteProjectVariables>): UseDataConnectMutationResult<DeleteProjectData, DeleteProjectVariables>;
