export type AWS_REGION = 'ap-southeast-1';

export type AwsSSMConfig = {
  ssm_region: AWS_REGION;
};

export default (): AwsSSMConfig => ({
  ssm_region: (process.env.AWS_REGION as AWS_REGION) || 'ap-southeast-1',
});
