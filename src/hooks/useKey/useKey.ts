import { useCallback, useEffect } from "react";
import { IUseKeyProps } from "./useKeyTypes";

function useKey<CodeType extends "code" | "key" = "key">(
  args: IUseKeyProps<CodeType>
): void;
function useKey({
  key,
  action,
  codeType = "key",
  keyFunction = "down",
}: IUseKeyProps<"code" | "key">): void {
  const callActionIfKeyMatches = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === key) action();
    },
    [key, action]
  );

  useEffect(() => {
    document.addEventListener("keydown", callActionIfKeyMatches);
    return () =>
      document.removeEventListener("keydown", callActionIfKeyMatches);
  }, [callActionIfKeyMatches]);
}

export default useKey;
