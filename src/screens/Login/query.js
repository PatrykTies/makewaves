import {useQuery} from 'react-query';
import {request, gql} from 'graphql-request';
import envs from '../../config/envs';

const useLoginContent = () => {
  return useQuery('titlePrimary', async () => {
    const data = await request(
      envs.GRAPHCMS_ENDPOINT,
      gql`
        query {
          titlePrimary(where: {id: "ckog38htsapqz0b16dpmp8p6f"}) {
            text
          }
        }
      `,
    );
    return data;
  });
};

export default useLoginContent;
