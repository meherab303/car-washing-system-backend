/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { TErrorSources } from "../errorInterface/errorInterface";
import { TGenericReturnError } from "../errorInterface/TgenericReturnError";

const handleMongooseDuplicateError = (err: any): TGenericReturnError => {
  const statusCode = 400;

  const fieldMatch = err.message.match(/index: (\w+)_\d+ dup key/);
  const field = fieldMatch ? fieldMatch[1] : "unknown_field";

  // Extract the duplicate value from the error message
  const valueMatch = err.message.match(/dup key: \{.*?: "([^"]+)" \}/);
  const value = valueMatch ? valueMatch[1] : "unknown_value";

  // const errorReason = err?.message.match(/dup key: \{ name: "([^"]+)" \}/)?.[1];
  // const errorFieldName = err?.message.match(/index: (\w+)_\d+ dup key:/)?.[1];
  const errorSource: TErrorSources = [
    {
      path: `${field}`,
      message: `${value} is already exist`,
    },
  ];
  return {
    statusCode,
    message: "Duplicate Error",
    errorSource,
  };
};
export default handleMongooseDuplicateError;
