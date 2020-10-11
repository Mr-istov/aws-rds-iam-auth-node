# AWS RDS auth using IAM

1. Create an example RDS with IAM auth enabled
2. Connect to the RDS and create a user

```sh
CREATE USER test_iam_user;
GRANT rds_iam to test_iam_user;
```

3. Create the IAM policy required for iam db access

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["rds-db:connect"],
      "Resource": ["arn:aws:rds-db:us-east-1:340114170214:dbuser:db-J3BWOZXMNUSF5VGGGPRJKAGWHE
/test_iam_user"]
    }
  ]
}
```
