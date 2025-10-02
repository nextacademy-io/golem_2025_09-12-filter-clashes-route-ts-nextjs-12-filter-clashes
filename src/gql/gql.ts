/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetClash($id: ID!) {\n    clash(id: $id) {\n      id\n      title\n      description\n      pictureUrl\n      location\n      address\n      date\n      participants {\n        id\n        pictureUrl\n        name\n      }\n      createdByPeer {\n        id\n        name\n        pictureUrl\n      }\n    }\n  }\n": typeof types.GetClashDocument,
    "\n  query GetClashes {\n    clashes {\n      id\n      title\n      pictureUrl\n      participants {\n        id\n        pictureUrl\n      }\n    }\n  }\n": typeof types.GetClashesDocument,
    "\n  query GetPeer($id: Int!) {\n    peer(id: $id) {\n      id\n      name\n      pictureUrl\n      city\n      country\n      clashes {\n        id\n        title\n        pictureUrl\n        date\n        location\n      }\n    }\n  }\n": typeof types.GetPeerDocument,
    "\n  query GetPeers {\n    peers {\n      id\n      name\n      pictureUrl\n    }\n  }\n": typeof types.GetPeersDocument,
};
const documents: Documents = {
    "\n  query GetClash($id: ID!) {\n    clash(id: $id) {\n      id\n      title\n      description\n      pictureUrl\n      location\n      address\n      date\n      participants {\n        id\n        pictureUrl\n        name\n      }\n      createdByPeer {\n        id\n        name\n        pictureUrl\n      }\n    }\n  }\n": types.GetClashDocument,
    "\n  query GetClashes {\n    clashes {\n      id\n      title\n      pictureUrl\n      participants {\n        id\n        pictureUrl\n      }\n    }\n  }\n": types.GetClashesDocument,
    "\n  query GetPeer($id: Int!) {\n    peer(id: $id) {\n      id\n      name\n      pictureUrl\n      city\n      country\n      clashes {\n        id\n        title\n        pictureUrl\n        date\n        location\n      }\n    }\n  }\n": types.GetPeerDocument,
    "\n  query GetPeers {\n    peers {\n      id\n      name\n      pictureUrl\n    }\n  }\n": types.GetPeersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetClash($id: ID!) {\n    clash(id: $id) {\n      id\n      title\n      description\n      pictureUrl\n      location\n      address\n      date\n      participants {\n        id\n        pictureUrl\n        name\n      }\n      createdByPeer {\n        id\n        name\n        pictureUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetClash($id: ID!) {\n    clash(id: $id) {\n      id\n      title\n      description\n      pictureUrl\n      location\n      address\n      date\n      participants {\n        id\n        pictureUrl\n        name\n      }\n      createdByPeer {\n        id\n        name\n        pictureUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetClashes {\n    clashes {\n      id\n      title\n      pictureUrl\n      participants {\n        id\n        pictureUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetClashes {\n    clashes {\n      id\n      title\n      pictureUrl\n      participants {\n        id\n        pictureUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPeer($id: Int!) {\n    peer(id: $id) {\n      id\n      name\n      pictureUrl\n      city\n      country\n      clashes {\n        id\n        title\n        pictureUrl\n        date\n        location\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPeer($id: Int!) {\n    peer(id: $id) {\n      id\n      name\n      pictureUrl\n      city\n      country\n      clashes {\n        id\n        title\n        pictureUrl\n        date\n        location\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPeers {\n    peers {\n      id\n      name\n      pictureUrl\n    }\n  }\n"): (typeof documents)["\n  query GetPeers {\n    peers {\n      id\n      name\n      pictureUrl\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;