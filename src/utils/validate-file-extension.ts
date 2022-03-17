import * as fs from 'fs';

export function validateInputPath(input: string): string | undefined {
  const allowedExtensions = ['.log', '.txt'];

  if (!endsWithAllowedFileExtension(allowedExtensions, input)) {
    return `The input file must end with one of the following extensions [ ${allowedExtensions.join(
      ' | ',
    )} ]`;
  }

  if (!fs.existsSync(input)) {
    return `The specified input path doesn't exist`;
  }
}

export function validateOutputPath(output: string): string | undefined {
  const allowedExtensions = ['.json', '.txt'];

  if (!endsWithAllowedFileExtension(allowedExtensions, output)) {
    return `The output file must end with one of the following extensions [ ${allowedExtensions.join(
      ' | ',
    )} ]`;
  }
}

function endsWithAllowedFileExtension(
  allowedExtensions: string[],
  fileName: string,
) {
  return allowedExtensions.some((allowedExtension) =>
    fileName.endsWith(allowedExtension),
  );
}
