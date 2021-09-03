import {useReducer} from "react";

const initialData = {
    value: '',
    isTouched: false
};

const inputReducer = (state, action) => {
    if (action.type === 'INPUT') {
        return {
            ...state,
            value: action.value
        };
    }

    if (action.type === 'BLUR') {
        return {
            ...state,
            isTouched: true
        };
    }

    if (action.type === 'RESET') {
        return initialData;
    }

    return initialData;
};

const useInput = (validate) => {
    const [inputState, dispatch] = useReducer(inputReducer, initialData);

    const valueIsValid = validate(inputState.value);
    const error = !valueIsValid && inputState.isTouched;

    const inputChangeHandler = (event) => {
        dispatch({type: 'INPUT', value: event.target.value});
    };

    const inputBlurHandler = () => {
        dispatch({type: 'BLUR'});
    };

    const reset = () => {
        dispatch({type: 'RESET'});
    };

    return {
        value: inputState.value,
        error,
        inputChangeHandler,
        inputBlurHandler,
        reset
    };
};

export default useInput;
