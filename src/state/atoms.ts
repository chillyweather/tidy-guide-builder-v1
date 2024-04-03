import { atom } from "jotai";

export const selectedNodeIdAtom = atom("");
export const selectedNodeKeyAtom = atom("");
export const selectedComponentPicAtom = atom("");
export const isViewModeOpenAtom = atom(false);

export const currentUserNameAtom = atom("");
export const currentCompanyAtom = atom("");
export const currentUserIdAtom = atom("");
export const currentUserRoleAtom = atom("");
export const currentDocumentationsAtom = atom(null);
export const selectedCollectionAtom = atom(null);
export const tokenAtom = atom("");

//results of network requests
export const collectionsAtom = atom([]);

//triggers
export const collectionDocsTriggerAtom = atom(0);
