locals {
    login_server = azurerm_container_registry.container_registry.login_server
    username = azurerm_container_registry.container_registry.admin_username
    password = azurerm_container_registry.container_registry.admin_password
    # rabbit = "amqp://guest:guest@rabbit:5672"
    database = var.db_host
}

module "gateway-microservice" {
    source ="./modules/microservice"
    service_name = "gateway"
    service_type = "LoadBalancer"
    session_affinity = "ClientIP"
    login_server = local.login_server
    username = local.username
    password = local.password
    app_version = var.app_version
    env = {
        RABBIT: local.rabbit
    }
}

module "gateway-kor-microservice" {
    source ="./modules/microservice"
    service_name = "gateway-kor"
    service_type = "LoadBalancer"
    session_affinity = "ClientIP"
    login_server = local.login_server
    username = local.username
    password = local.password
    app_version = var.app_version
    env = {
        RABBIT: local.rabbit
    }
}

module "video-streaming-microservice" {
    source ="./modules/microservice"
    service_name = "video-streaming"
    login_server = local.login_server
    username = local.username
    password = local.password
    app_version = var.app_version
    env = {
        RABBIT: local.rabbit
    }
}

module "video-upload-microservice" {
    source ="./modules/microservice"
    service_name = "video-upload"
    login_server = local.login_server
    username = local.username
    password = local.password
    app_version = var.app_version
    env = {
        RABBIT: local.rabbit
    }
}
