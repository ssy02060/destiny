variable "app_version" {}
variable "service_name" {}

variable "dns_name" {
  default = ""
}

variable "repository_url" {}


variable "service_type" {
  default = "ClusterIP"
}

variable "session_affinity" {
  default = ""
}

variable "env" {
  default = {}
  type    = map(string)
}

locals {
  image_tag = "${var.repository_url}/${var.service_name}:${var.app_version}"
}

resource "null_resource" "docker_build" {

  triggers = {
    always_run = timestamp()
  }

  provisioner "local-exec" {
    command = "docker build -t ${local.image_tag} --file ../${var.service_name}/Dockerfile.prod ../${var.service_name}"
  }
}

resource "null_resource" "null_for_ecr_get_login_password" {
  depends_on = [null_resource.docker_build]

  triggers = {
    always_run = timestamp()
  }
  provisioner "local-exec" {
    command = <<EOF
      aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin ${var.repository_url}
    EOF
  }

}

# resource "null_resource" "docker_push" {

#   depends_on = [null_resource.null_for_ecr_get_login_password]

#   triggers = {
#     always_run = timestamp()
#   }

#   provisioner "local-exec" {
#     command = "docker push ${local.image_tag}"
#   }
# }

# locals {
#   dockercreds = {
#     auths = {
#       "${var.repository_url}" = {
#         auth = base64encode("${var.username}:${var.password}")
#       }
#     }
#   }
# }

# resource "kubernetes_secret" "docker_credentials" {
#   metadata {
#     name = "${var.service_name}-docker-credentials"
#   }

#   data = {
#     ".dockerconfigjson" = jsonencode(local.dockercreds)
#   }

#   type = "kubernetes.io/dockerconfigjson"
# }

# resource "kubernetes_deployment" "service_deployment" {

#   depends_on = [null_resource.docker_push]

#   metadata {
#     name = var.service_name

#     labels = {
#       pod = var.service_name
#     }
#   }

#   spec {
#     replicas = 2

#     selector {
#       match_labels = {
#         pod = var.service_name
#       }
#     }

#     template {
#       metadata {
#         labels = {
#           pod = var.service_name
#         }
#       }

#       spec {
#         container {
#           image = local.image_tag
#           name  = var.service_name

#           env {
#             name  = "PORT"
#             value = "80"
#           }

#           dynamic "env" {
#             for_each = var.env
#             content {
#               name  = env.key
#               value = env.value
#             }
#           }
#         }

#         image_pull_secrets {
#           name = kubernetes_secret.docker_credentials.metadata[0].name
#         }
#       }
#     }
#   }
# }

# resource "kubernetes_service" "service" {
#   metadata {
#     name = var.dns_name != "" ? var.dns_name : var.service_name
#   }

#   spec {
#     selector = {
#       pod = kubernetes_deployment.service_deployment.metadata[0].labels.pod
#     }

#     session_affinity = var.session_affinity

#     port {
#       port        = 80
#       target_port = 80
#     }

#     type = var.service_type
#   }
# }
