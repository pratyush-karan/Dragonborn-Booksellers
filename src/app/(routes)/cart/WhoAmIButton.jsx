"use client";

import { useState } from "react";

export default function WhoAmIButton({ whoAmIAction }) {
  const [name, setName] = useState();

  return (
    <div>
      <button
        onClick={async () => {
          setName(await whoAmIAction());
        }}
      >
        Who Am I?
      </button>
      {name && <div>You are {name}</div>}
    </div>
  );
}
