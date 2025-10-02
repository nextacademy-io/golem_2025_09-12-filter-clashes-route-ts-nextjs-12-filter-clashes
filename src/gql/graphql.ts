/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

/** The Clash */
export type Clash = {
  __typename?: 'Clash';
  /** The address of the clash */
  address: Scalars['String']['output'];
  /** The peer that created the clash */
  createdByPeer: Peer;
  /** The date of the clash */
  date: Scalars['DateTime']['output'];
  /** The description of the clash */
  description: Scalars['String']['output'];
  /** The id of the clash */
  id: Scalars['ID']['output'];
  /** The location of the clash */
  location: Scalars['String']['output'];
  /** The participants of the clash */
  participants: Array<Peer>;
  /** The picture url of the clash */
  pictureUrl: Scalars['String']['output'];
  /** The title of the clash */
  title: Scalars['String']['output'];
};

export type CreateClashInput = {
  /** The address of the clash */
  address: Scalars['String']['input'];
  /** The ID of the peer who created the clash */
  createdByPeerId: Scalars['ID']['input'];
  /** The date of the clash */
  date: Scalars['DateTime']['input'];
  /** The description of the clash */
  description: Scalars['String']['input'];
  /** The location of the clash */
  location: Scalars['String']['input'];
  /** The IDs of the participants of the clash */
  participantIds: Array<Scalars['ID']['input']>;
  /** The picture URL of the clash */
  pictureUrl: Scalars['String']['input'];
  /** The title of the clash */
  title: Scalars['String']['input'];
};

export type CreatePeerInput = {
  /** The city of the peer */
  city: Scalars['String']['input'];
  /** The country of the peer */
  country: Scalars['String']['input'];
  /** The gender of the peer */
  gender: Gender;
  /** The full name of the peer */
  name: Scalars['String']['input'];
  /** The picture URL of the peer */
  pictureUrl: Scalars['String']['input'];
};

/** The gender of the peer */
export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE'
}

export type Mutation = {
  __typename?: 'Mutation';
  createClash: Clash;
  createPeer: Peer;
  removeClash: Scalars['Boolean']['output'];
  removePeer: Scalars['Boolean']['output'];
  updateClash: Clash;
  updatePeer: Peer;
};


export type MutationCreateClashArgs = {
  createClashInput: CreateClashInput;
};


export type MutationCreatePeerArgs = {
  createPeerInput: CreatePeerInput;
};


export type MutationRemoveClashArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemovePeerArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateClashArgs = {
  updateClashInput: UpdateClashInput;
};


export type MutationUpdatePeerArgs = {
  updatePeerInput: UpdatePeerInput;
};

export type Peer = {
  __typename?: 'Peer';
  /** The city of the peer.  */
  city: Scalars['String']['output'];
  /** The clashes the peer participates in */
  clashes: Array<Clash>;
  /** The country of the peer.  */
  country: Scalars['String']['output'];
  /** The gender of the peer */
  gender: Gender;
  /** The id of the peer */
  id: Scalars['Int']['output'];
  /** The full name of the peer */
  name: Scalars['String']['output'];
  /** The picture url of the peer.  */
  pictureUrl: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  clash: Clash;
  clashes: Array<Clash>;
  peer: Peer;
  peers: Array<Peer>;
};


export type QueryClashArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPeerArgs = {
  id: Scalars['Int']['input'];
};

export type UpdateClashInput = {
  /** The address of the clash */
  address?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the peer who created the clash */
  createdByPeerId?: InputMaybe<Scalars['ID']['input']>;
  /** The date of the clash */
  date?: InputMaybe<Scalars['DateTime']['input']>;
  /** The description of the clash */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the clash to update */
  id: Scalars['ID']['input'];
  /** The location of the clash */
  location?: InputMaybe<Scalars['String']['input']>;
  /** The IDs of the participants of the clash */
  participantIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** The picture URL of the clash */
  pictureUrl?: InputMaybe<Scalars['String']['input']>;
  /** The title of the clash */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePeerInput = {
  /** The city of the peer */
  city?: InputMaybe<Scalars['String']['input']>;
  /** The country of the peer */
  country?: InputMaybe<Scalars['String']['input']>;
  /** The gender of the peer */
  gender?: InputMaybe<Gender>;
  /** The ID of the peer */
  id: Scalars['Int']['input'];
  /** The full name of the peer */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The picture URL of the peer */
  pictureUrl?: InputMaybe<Scalars['String']['input']>;
};

export type GetClashQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetClashQuery = { __typename?: 'Query', clash: { __typename?: 'Clash', id: string, title: string, description: string, pictureUrl: string, location: string, address: string, date: any, participants: Array<{ __typename?: 'Peer', id: number, pictureUrl: string, name: string }>, createdByPeer: { __typename?: 'Peer', id: number, name: string, pictureUrl: string } } };

export type GetClashesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetClashesQuery = { __typename?: 'Query', clashes: Array<{ __typename?: 'Clash', id: string, title: string, pictureUrl: string, participants: Array<{ __typename?: 'Peer', id: number, pictureUrl: string }> }> };

export type GetPeerQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetPeerQuery = { __typename?: 'Query', peer: { __typename?: 'Peer', id: number, name: string, pictureUrl: string, city: string, country: string, clashes: Array<{ __typename?: 'Clash', id: string, title: string, pictureUrl: string, date: any, location: string }> } };

export type GetPeersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPeersQuery = { __typename?: 'Query', peers: Array<{ __typename?: 'Peer', id: number, name: string, pictureUrl: string }> };


export const GetClashDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetClash"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clash"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"pictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"participants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdByPeer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pictureUrl"}}]}}]}}]}}]} as unknown as DocumentNode<GetClashQuery, GetClashQueryVariables>;
export const GetClashesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetClashes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clashes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"pictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"participants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pictureUrl"}}]}}]}}]}}]} as unknown as DocumentNode<GetClashesQuery, GetClashesQueryVariables>;
export const GetPeerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPeer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"peer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"clashes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"pictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}}]}}]}}]} as unknown as DocumentNode<GetPeerQuery, GetPeerQueryVariables>;
export const GetPeersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPeers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"peers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pictureUrl"}}]}}]}}]} as unknown as DocumentNode<GetPeersQuery, GetPeersQueryVariables>;