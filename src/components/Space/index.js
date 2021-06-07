import React from "react";
import { SpaceContainer } from "./SpaceElements";
import Results from "../Results";
import Board from "../Board";


const SpaceComponent = () => {
  return (
    <>
      <SpaceContainer>
        <Results/>
        <Board/>
      </SpaceContainer>
    </>
  );
};

export default SpaceComponent;
