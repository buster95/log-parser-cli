export function endsWithAllowedFileExtension(
  allowedExtensions: string[],
  fileName: string,
) {
  return allowedExtensions.some((allowedExtension) =>
    fileName.endsWith(allowedExtension),
  );
}
