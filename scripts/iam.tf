# resource "aws_iam_group" "destiny" {
#   name = "destiny"
#   path = "/users/"
# }

# resource "aws_iam_group_policy_attachment" "policy_attach" {
#   group       = aws_iam_group.destiny.name
#   policy_arn  = ["arn:aws:iam::aws:policy/AmazonEC2FullAccess", 
#   "arn:aws:iam::aws:policy/IAMFullAccess",
#    "arn:aws:iam::aws:policy/AmazonS3FullAccess",
#    "arn:aws:iam::aws:policy/AdministratorAccess",
#    "arn:aws:iam::aws:policy/IAMUserChangePassword",
#    "arn:aws:iam::aws:policy/AmazonAPIGatewayAdministrator",
#    "arn:aws:iam::aws:policy/AmazonVPCFullAccess",
#    "arn:aws:iam::aws:policy/AWSLambda_FullAccess",
#    "arn:aws:iam::aws:policy/AmazonEKSServicePolicy",
#    ]
# }

# variable "users" {
#   description = "Create IAM Users"
#   type        = list
#   default     = ["kyh", "kyj", "kjm", "bys", "csr", "ssy" ]
# }

# resource "aws_iam_user" "destiny_user" {
#   count   = length(var.users)
#   name    = element(var.users, count.index) 
#   path    = "/dev/"
# tags = {
#   Name = "developers"
#   }
# }

# resource "aws_iam_access_key" "destiny_user" {
#   count   = length(var.users)
#   name    = element(var.users, count.index)
# }

# output "secret" {
#   value = aws_iam_access_key.lb.encrypted_secret
# }

# resource "aws_iam_user_group_membership" "grp_mem" {
#   count   = length(var.users)
#   user    = element(var.users, count.index)
#   groups = [
#     aws_iam_group.destiny.name 
#   ]
# }
