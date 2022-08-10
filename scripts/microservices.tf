locals {
  registry_id    = aws_ecr_repository.repository.registry_id
  repository_url = aws_ecr_repository.repository.repository_url
  # rabbit = "amqp://guest:guest@rabbit:5672"
  database = var.db_host
}

module "gateway-microservice" {
  source           = "./modules/microservice"
  service_name     = "gateway"
  service_type     = "LoadBalancer"
  session_affinity = "ClientIP"
  repository_url   = local.repository_url
  app_version      = var.app_version
  env = {
    DBHOST : local.database
  }
}

# module "gateway-kor-microservice" {
#   source           = "./modules/microservice"
#   service_name     = "gateway-kor"
#   service_type     = "LoadBalancer"
#   session_affinity = "ClientIP"

#   app_version = var.app_version
#   env = {
#     DBHOST : local.database
#   }
# }

module "review-microservice" {
  source         = "./modules/microservice"
  service_name   = "review"
  repository_url = local.repository_url
  app_version    = var.app_version
  env = {
    DBHOST : local.database
  }
}

module "my-type-microservice" {
  source         = "./modules/microservice"
  service_name   = "my-type"
  repository_url = local.repository_url
  app_version    = var.app_version
  env = {
    DBHOST : local.database
  }
}
