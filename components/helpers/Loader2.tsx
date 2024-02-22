import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loader2 = () => {
  return (
    <>
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#000000"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </>
  );
};

export default Loader2;
