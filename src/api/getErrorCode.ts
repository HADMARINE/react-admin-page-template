import client, { ApiStandardReturn } from '@api/client';

export const getErrorCode = async (props: {
  locale: string;
  errorCode: string;
}): Promise<ApiStandardReturn<string>> => {
  const data = await client.get(`/v1/error/${props.locale}/${props.errorCode}`);
  if (!data.result) {
    return { result: false, data: '' };
  }
  return { result: true, data: data.data };
};
