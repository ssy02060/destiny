variable "region" {
  description = "AWS region"
  type        = string
  default     = "ap-northeast-2"
}

variable "db_host" {
  default = "mongodb://db:27017"
}

variable "app_name" {
  default = "destiny"
}

variable "aws_access_key_id" {

}
variable "aws_secret_access_key" {

}

variable "app_version" { # Can't be called version! That's a reserved word.
  default = "latest"
}
