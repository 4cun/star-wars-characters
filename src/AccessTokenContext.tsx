import {Context, createContext} from "react";
import {AccessToken } from "./components/AuthContext.tsx";
export const AccessTokenContext: Context<AccessToken> = createContext<AccessToken>(null!)

