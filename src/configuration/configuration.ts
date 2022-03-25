import aws_ssm from './config/aws_ssm';
import frontend from './config/frontend';
import server from './config/server';

export default () => ({
  server: server(),
  awsSSM: aws_ssm(),
  frontend: frontend(),
});
