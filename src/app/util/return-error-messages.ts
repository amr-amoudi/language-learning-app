export default function returnErrorMessages(errorObj: { errors: Record<string, string[]> }): string[] {
  return Object.values(errorObj.errors).flat();
}


