import { useReducer } from "react";
import { SET_USER_DATA } from "../types";
import PurchaseContext from "./PurchaseContext";
import PurchaseReducer from "./PurchaseReducer";

const PurchaseState = ({ children }) => {
    
    const initialState = {
        user: {}
    }

    const [ state, dispatch ] = useReducer(PurchaseReducer, initialState);

    const setUserData = data => {
        dispatch({
            type: SET_USER_DATA,
            payload: data
        })
    }

    return (
        <PurchaseContext.Provider
            value={{
                user: state.user,
                setUserData
            }}
        >
            {children}
        </PurchaseContext.Provider>
    )

}

export default PurchaseState;
