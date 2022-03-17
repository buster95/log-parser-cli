import * as fs from 'fs';
import { validateInputPath, validateOutputPath } from './validate-paths';

describe('Validate file extension', () => {
  describe('Validate input path', () => {
    const fsSpyExistsSync = jest.spyOn(fs, 'existsSync');

    afterAll(() => {
      fsSpyExistsSync.mockRestore();
    });

    it("should return a validation message if the input path doesn't end with a valid extension", () => {
      const validationMessage = validateInputPath('file.bin');
      expect(validationMessage).toMatch(
        'The input file must end with one of the following extensions [',
      );
    });

    it("should return a validation message if the input path doesn't exist", () => {
      fsSpyExistsSync.mockReturnValue(false);
      const validationMessage = validateInputPath('antares.log');
      expect(validationMessage).toMatch(
        `The specified input path doesn't exist`,
      );
    });

    it('should return undefined if the input path exists and it contains a valid extension', () => {
      fsSpyExistsSync.mockReturnValue(true);
      const validationMessage = validateInputPath('input-log-example.log');
      expect(validationMessage).toBeUndefined();
    });
  });

  describe('Validate output path', () => {
    it("should return a validation message if the output path doesn't end with a valid extension", () => {
      const validationMessage = validateOutputPath('output.test');
      expect(validationMessage).toMatch(
        'The output file must end with one of the following extensions [',
      );
    });

    it('should return undefined if the output path exists and is contains a valid extension', () => {
      const validationMessage = validateOutputPath('input-log-example.json');
      expect(validationMessage).toBeUndefined();
    });
  });
});
