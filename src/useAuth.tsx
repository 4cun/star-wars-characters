import {useContext} from "react";
import {AccessTokenContext} from "./AccessTokenContext.tsx";

export const useAuth = () => useContext(AccessTokenContext);