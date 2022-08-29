
# // terrafrom state 파일용 lock 테이블
# resource "aws_dynamodb_table" "terraform_state_lock" {
#   name           = "TerraformStateLock"
#   read_capacity  = 5
#   write_capacity = 5
#   hash_key       = "LockID"

#   attribute {
#     name = "LockID"
#     type = "S"
#   }
# }

# // 로그 저장용 버킷
# resource "aws_s3_bucket" "logs" {
#   bucket = "dstny.terraform.logs"
#   acl    = "log-delivery-write"
# }

# // Terraform state 저장용 S3 버킷
# resource "aws_s3_bucket" "terraform-state" {
#   bucket = "dstny.terraform.state"
#   acl    = "private"
#   versioning {
#     enabled = true
#   }
#   tags = {
#     Name = "terraform state"
#   }
#   logging {
#     target_bucket = aws_s3_bucket.logs.id
#     target_prefix = "log/"
#   }
#   lifecycle {
#     prevent_destroy = true
#   }
# }

# terraform {
#   required_version = ">= 0.9.5"
#   backend "s3" {
#     bucket         = "dstny.terraform.state"
#     key            = "test/terraform.tfstate"
#     region         = "ap-northeast-2"
#     encrypt        = true
#     dynamodb_table = "TerraformStateLock"
#     acl            = "bucket-owner-full-control"
#   }
# }
