import aws_ssm from './config/aws_ssm';
import server from './config/server';

export default () => ({
  server: server(),
  awsSSM: aws_ssm(),
});
