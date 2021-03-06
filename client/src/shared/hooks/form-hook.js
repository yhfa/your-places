import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsVaild = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) continue;

        if (inputId === action.inputId) {
          formIsVaild = formIsVaild && action.isVaild;
        } else {
          formIsVaild = formIsVaild && state.inputs[inputId].isVaild;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isVaild: action.isVaild },
        },
        isVaild: formIsVaild,
      };

    case "SET_DATA":
      return {
        inputs: action.inputs,
        isVaild: action.formIsVaild,
      };

    default:
      return state;
  }
};

export const useForm = (initialInputs, initialVaildity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isVaild: initialVaildity,
  });

  const inputHandler = useCallback(
    (id, value, isVaild) => {
      dispatch({ type: "INPUT_CHANGE", inputId: id, value, isVaild });
    },
    [dispatch]
  );

  const setFormData = useCallback((inputData, formVaildity) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsVaild: formVaildity,
    });
  }, []);

  return [formState, inputHandler, setFormData];
};
