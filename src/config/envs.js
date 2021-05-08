import {CMS_DEV, CMS_PROD} from '@env';
const devEnvVariables = {
  GRAPHCMS_ENDPOINT: CMS_DEV,
};
const prodEnvVariables = {
  GRAPHCMS_ENDPOINT: CMS_PROD,
};

// __DEV__ is build in boolean from React Native
// , if running in simulators/test devices it is set to "true"
export default __DEV__ ? devEnvVariables : prodEnvVariables;
