# variable "repository_name" {
#   description = "The repository name to use for the ECR repository."
#   default     = "ecr-destiny"
# }

# resource "aws_ecr_repository" "repository" {
#   name                 = var.repository_name
#   image_tag_mutability = "MUTABLE"
#   image_scanning_configuration {
#     scan_on_push = true
#   }
# }




# output "registry_id" {
#   description = "The account ID of the registry holding the repository."
#   value       = aws_ecr_repository.repository.registry_id
# }

# output "repository_url" {
#   description = "The URL of the repository."
#   value       = aws_ecr_repository.repository.repository_url
# }
