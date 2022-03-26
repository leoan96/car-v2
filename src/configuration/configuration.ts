import aws_ssm from './config/aws_ssm';
import frontend from './config/frontend';
import server from './config/server';
import type_orm from './config/type_orm';

export default () => ({
  server: server(),
  awsSSM: aws_ssm(),
  frontend: frontend(),
  typeOrm: type_orm(),
});
