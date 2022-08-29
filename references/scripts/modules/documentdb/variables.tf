variable "db_port" {
  description = "Open port in sg for db communication."
  type        = number
  default     = 27017
}

variable "master_password" {
  description = "(Required unless a snapshot_identifier is provided) Password for the master DB user. Note that this may show up in logs, and it will be stored in the state file."
  type        = string
  default     = ""
}

variable "db_name" {
  description = "Name of the database."
  type        = string
  default     = "destiny"
}

variable "master_username" {
  type        = string
  default     = "root"
  description = "(Required unless a snapshot_identifier is provided) Username for the master DB user."
}

variable "retention_period" {
  type        = string
  default     = "7"
  description = "Number of days to retain backups for."
}

variable "preferred_backup_window" {
  type        = string
  default     = "07:00-09:00"
  description = "Daily time range during which the backups happen."
}

variable "skip_final_snapshot" {
  type        = string
  description = "Determines whether a final DB snapshot is created before the DB cluster is deleted."
  default     = "false"
}

variable "apply_immediately" {
  type        = string
  description = "Specifies whether any cluster modifications are applied immediately, or during the next maintenance window."
  default     = "true"
}

variable "storage_encrypted" {
  type        = string
  description = "Specifies whether the DB cluster is encrypted."
  default     = "false"
}

variable "kms_key_id" {
  type        = string
  description = "The ARN for the KMS encryption key. When specifying `kms_key_id`, `storage_encrypted` needs to be set to `true`."
  default     = ""
}

variable "snapshot_identifier" {
  type        = string
  default     = ""
  description = "Specifies whether or not to create this cluster from a snapshot. You can use either the name or ARN when specifying a DB cluster snapshot, or the ARN when specifying a DB snapshot."
}

variable "vpc_id" {
  description = "ID of the VPC to deploy database into."
  type        = string
  default     = "vpc-0fead1ec953ba166d"
}

variable "subnet_list" {
  description = "List of subnet IDs database instances should deploy into."
  type        = list(string)
  default     = ["subnet-0a82847ea47c0b0f6", "subnet-02dc4c3d1e0b6f5c4"]
}

variable "cluster_family" {
  type        = string
  default     = "docdb4.0"
  description = "The family of the DocumentDB cluster parameter group. For more details, see https://docs.aws.amazon.com/documentdb/latest/developerguide/db-cluster-parameter-group-create.html ."
}

variable "tags" {
  description = "Map containing tags to use for the instance."
  type        = map(string)
  default = {
    "Name" = "destiny-documentdb"
  }
}

variable "engine" {
  type        = string
  default     = "docdb"
  description = "The name of the database engine to be used for this DB cluster. Defaults to `docdb`. Valid values: `docdb`."
}

variable "engine_version" {
  type        = string
  default     = ""
  description = "The version number of the database engine to use."
}

variable "enabled_cloudwatch_logs_exports" {
  type        = list(string)
  description = "List of log types to export to cloudwatch. The following log types are supported: audit, error, general, slowquery."
  default     = []
}

variable "instance_class" {
  type        = string
  default     = "db.t3.medium"
  description = "The instance class to use. For more details, see https://docs.aws.amazon.com/documentdb/latest/developerguide/db-instance-classes.html#db-instance-class-specs ."
}

variable "cluster_size" {
  type        = string
  default     = "2"
  description = "Number of DB instances to create in the cluster"
}

variable "tls_enabled" {
  type        = bool
  default     = false
  description = "When true than cluster using TLS for communication."
}
