export default function returnErrorMessages(errorObj: { errors: {} }): string[] {
  return Array.from(Object.values(errorObj.errors));
}

