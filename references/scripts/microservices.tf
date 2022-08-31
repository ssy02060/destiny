
module "gateway-microservice" {
  source           = "./modules/microservice"
  service_name     = "gateway"
  service_type     = "LoadBalancer"
  session_affinity = "ClientIP"
}

module "account-microservice" {
  source       = "./modules/microservice"
  service_name = "account"
}


module "movie-microservice" {
  source       = "./modules/microservice"
  service_name = "movie"
}

module "review-microservice" {
  source       = "./modules/microservice"
  service_name = "review"
}

module "my-type-microservice" {
  source       = "./modules/microservice"
  service_name = "my-type"
}

module "movie-data-microservice" {
  source       = "./modules/microservice"
  service_name = "movie-data"
}
