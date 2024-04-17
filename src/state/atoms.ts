import { atom } from "jotai";

export const selectedNodeIdAtom = atom("");
export const selectedNodeKeyAtom = atom("");
export const selectedComponentPicAtom = atom("");
export const isViewModeOpenAtom = atom(false);
export const isPublishAndViewAtom = atom(false);
export const selectionDataAtom = atom(null);

export const currentUserNameAtom = atom("");
export const currentCompanyAtom = atom("");
export const currentUserIdAtom = atom("");
export const currentUserRoleAtom = atom("");
export const currentDocumentationsAtom = atom(null);
export const tokenAtom = atom("");

//collections
export const collectionsAtom = atom([]);
export const currentUserCollectionsAtom = atom([]);
export const selectedCollectionAtom = atom(null);
export const selectedCollectionInSettingsAtom = atom(null);

//triggers
export const collectionDocsTriggerAtom = atom(0);
export const showEditUserFormAtom = atom(false);
export const userToEditAtom = atom(null);
export const sectionToDeleteIndexAtom = atom(-1);
export const sectionToDeleteAtom = atom(null);
export const isCollectionSwitchingAtom = atom(false);

//popup handlers
export const showDeleteSectionPopupAtom = atom(false);
export const showCrashLogoutPopupAtom = atom(false);

//add user (settings)
export const addUserMessageAtom = atom("");
export const isAddUserErrorAtom = atom(false);
