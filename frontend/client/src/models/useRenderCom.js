import { useState } from "react";
import { createModel } from "hox";

function useRenderCom() {
  const [isRenderCom, setIsRenderCom] = useState(false);
  return {
    isRenderCom,
    setIsRenderCom
  };
}

export default createModel(useRenderCom);
