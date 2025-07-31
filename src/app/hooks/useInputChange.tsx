import React from 'react';

type UpdateInput = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;


export default function useInputChange(names: Record<string, string>, onlyUpdateOn?: (e: UpdateInput) => boolean): [Record<string, string>, (e: UpdateInput) => void] {
  const [inputState, setInputState] = React.useState<Record<string, string>>(names);

  function update(e: UpdateInput): void {
    // updating the state passed on the new input
    setInputState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleInputChange(e: UpdateInput): void {
    // throw an error if input's name was not found in the inputState state
    if (!(e.target.name in inputState)) {
      throw new Error(`${e.target.name} not found in ${JSON.stringify(names)} check your input's name property and the object you passed`);
    }

    if (onlyUpdateOn) {
      // if onlyUpdateOn function was passed
      const result = onlyUpdateOn(e);
      // take the result of it true or false are the expected returns

      if (result) {
        // if it was true update the input
        update(e)
      }
      // exist the function
      return
    }

    // update normally if the onlyUpdateOn was not passed 
    update(e);
  }

  // returns the inputs state and handler to update
  return [inputState, handleInputChange];
}
