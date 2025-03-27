import React from "react";
import { Link, useRouteError } from "react-router-dom";

function Error() {
  const errorInfo = useRouteError();
  console.log(errorInfo)
  return (
    <div>
      <h1>Error 404!</h1>
      <Link to="/">Back Home 🏠</Link>
    </div>
  );
}

export default Error;
