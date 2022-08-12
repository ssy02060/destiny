#
# Runs Terraform to provision a Kubernetes cluster and deploy microservices to it.
#

set -u # or set -o nounset
: "$VERSION"
: "$AWS_ACCESS_KEY_ID"
: "$AWS_SECRET_ACCESS_KEY"
: "$DBHOST"

cd ./scripts
# export KUBERNETES_SERVICE_HOST="" # Workaround for https://github.com/terraform-providers/terraform-provider-kubernetes/issues/679
terraform init -reconfigure
terraform apply -auto-approve \
    -var "app_version=$VERSION" \
    -var "aws_access_key_id=$AWS_ACCESS_KEY_ID" \
    -var "aws_secret_access_key=$AWS_SECRET_ACCESS_KEY" \
    -var "db_host=$DBHOST"
