import { useState } from "react";

function useToggleState(
  initialVal = false
): [boolean, React.Dispatch<React.SetStateAction<boolean>>, () => void] {
  // call useState, "reserve piece of state"
  const [state, setState] = useState<boolean>(initialVal);
  const toggle = () => {
    setState(!state);
  };
  // return piece of state AND a function to toggle it
  return [state, setState, toggle];
}
export default useToggleState;
