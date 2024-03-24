import { h } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import { IconMessage2Check, IconSettings, IconLogout } from "@tabler/icons-react";

const UserMenu = ({
    isLoginPageOpen,
    setIsLoginPageOpen,
    setIsSettingsPageOpen,
    setIsIndexOpen,
    setIsContenFromServerOpen,
    setIsMainContentOpen,
    setFeedbackPage,
    isIndexOpen,
    isDocJustOpened,
    setIsDocJustOpened,
    userRank,
}: {
    isLoginPageOpen: boolean;
    setIsLoginPageOpen: (value: boolean) => void;
    setIsSettingsPageOpen: (value: boolean) => void;
    setIsIndexOpen: (value: boolean) => void;
    setIsContenFromServerOpen: (value: boolean) => void;
    setIsMainContentOpen: (value: boolean) => void;
    setFeedbackPage: (value: boolean) => void;
    isIndexOpen: boolean;
    isDocJustOpened: boolean;
    setIsDocJustOpened: (value: boolean) => void;
    userRank: string;
}) => {
    const loggedInUser = useContext(BuilderContext)?.loggedInUser || "";
    return (
        <div className={"user-menu"}>

            <div className="user-item">
                <div className="user-tag">{loggedInUser.slice(0, 1)}</div>
                <p>{loggedInUser}</p>
            </div>

            <hr />

            <div className="user-item"
                onClick={() => {
                    setIsLoginPageOpen(false);
                    setIsIndexOpen(false);
                    setIsMainContentOpen(false);
                    setIsContenFromServerOpen(false);
                    setFeedbackPage(true);
                }}
            >
                <IconMessage2Check />
                <p>Feedback</p>
            </div>

            <div className="user-item"
                onClick={() => {
                    setIsLoginPageOpen(false);
                    setIsIndexOpen(false);
                    setIsMainContentOpen(false);
                    setIsContenFromServerOpen(false);
                    setIsSettingsPageOpen(true);
                }}
            >
                <IconSettings />
                <p>Settings</p>
            </div>

            <hr />

            <div className="user-item"
                onClick={() => {
                    setIsIndexOpen(false);
                    setIsMainContentOpen(false);
                    setIsContenFromServerOpen(false);
                    setIsLoginPageOpen(true);
                }}
            >
                <IconLogout />
                <p>Log-out</p>
            </div>

        </div>
    )
}



export default UserMenu;