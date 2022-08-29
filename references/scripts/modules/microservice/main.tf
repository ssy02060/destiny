variable "service_name" {}

variable "dns_name" {
  default = ""
}

variable "username" {
  default = "AWS"
}

variable "service_type" {
  default = "ClusterIP"
}

variable "session_affinity" {
  default = ""
}

resource "aws_ecr_repository" "repo" {
  name                 = var.service_name
  image_tag_mutability = "MUTABLE"
  image_scanning_configuration {
    scan_on_push = true
  }
}
resource "aws_ecr_repository_policy" "ecr_policy" {
  repository = aws_ecr_repository.repo.name

  policy = <<EOF
{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Sid": "adds full ecr access to the demo repository",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "ecr:GetDownloadUrlForLayer",
                "ecr:BatchGetImage",
                "ecr:BatchCheckLayerAvailability",
                "ecr:PutImage",
                "ecr:InitiateLayerUpload",
                "ecr:UploadLayerPart",
                "ecr:CompleteLayerUpload",
                "ecr:DescribeRepositories",
                "ecr:GetRepositoryPolicy",
                "ecr:ListImages",
                "ecr:DeleteRepository",
                "ecr:BatchDeleteImage",
                "ecr:SetRepositoryPolicy",
                "ecr:DeleteRepositoryPolicy"
            ]
        }
    ]
}
EOF
}

output "registry_id" {
  description = "The account ID of the registry holding the repository."
  value       = aws_ecr_repository.repo.registry_id
}

output "repository_url" {
  description = "The URL of the repository."
  value       = aws_ecr_repository.repo.repository_url
}
