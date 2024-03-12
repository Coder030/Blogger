"use client";

import React, { useState } from "react";

function Page() {
  const [text, setText] = useState("");
  return (
    <div>
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button
        onClick={async () => {
          console.log(text);
          const res = await fetch(
            "https://blog-backend-qgng.onrender.com/api/me",
            {
              method: "GET",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
            }
          );
          const d = await res.json();
          console.log(d);
        }}
      >
        Hey there!
      </button>
    </div>
  );
}

export default Page;
