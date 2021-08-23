import { ApiStandardReturn } from './client';

export const getTestData = async (): Promise<
  ApiStandardReturn<Record<string, any>[]>
> => {
  return {
    result: true,
    data: [
      {
        str: 'string',
        num: 1,
        object: { 1: 1, 2: 2 },
        array: [1, 2, 3, 4, 5],
      },
    ],
  };
};
