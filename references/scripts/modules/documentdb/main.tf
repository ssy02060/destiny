resource "aws_security_group" "this" {
  name        = "security_group-allow_all_documentdb-${var.db_name}"
  description = "Allow inbound traffic"

  vpc_id = var.vpc_id

  ingress {
    from_port   = var.db_port
    to_port     = var.db_port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "random_password" "master" {
  count   = length(var.master_password) == 0 ? 1 : 0
  length  = 15
  special = false
}

resource "aws_docdb_cluster" "this" {
  cluster_identifier              = var.db_name
  master_username                 = var.master_username
  master_password                 = length(var.master_password) == 0 ? random_password.master[0].result : var.master_password
  backup_retention_period         = var.retention_period
  preferred_backup_window         = var.preferred_backup_window
  final_snapshot_identifier       = lower(var.db_name)
  skip_final_snapshot             = var.skip_final_snapshot
  apply_immediately               = var.apply_immediately
  storage_encrypted               = var.storage_encrypted
  kms_key_id                      = var.kms_key_id
  snapshot_identifier             = var.snapshot_identifier
  vpc_security_group_ids          = [aws_security_group.this.id]
  db_subnet_group_name            = aws_docdb_subnet_group.this.name
  db_cluster_parameter_group_name = aws_docdb_cluster_parameter_group.this.name
  engine                          = var.engine
  engine_version                  = var.engine_version
  enabled_cloudwatch_logs_exports = var.enabled_cloudwatch_logs_exports
  tags                            = var.tags
}

resource "aws_docdb_cluster_instance" "this" {
  count              = var.cluster_size
  identifier         = "${var.db_name}-${count.index + 1}"
  cluster_identifier = join("", aws_docdb_cluster.this.*.id)
  apply_immediately  = var.apply_immediately
  instance_class     = var.instance_class
  tags               = var.tags
  engine             = var.engine
}

resource "aws_docdb_subnet_group" "this" {
  name        = "subnet-group-${var.db_name}"
  description = "Allowed subnets for DB cluster instances."
  subnet_ids  = var.subnet_list
  tags        = var.tags
}

# https://docs.aws.amazon.com/documentdb/latest/developerguide/db-cluster-parameter-group-create.html
resource "aws_docdb_cluster_parameter_group" "this" {
  name        = "parameter-group-${var.db_name}"
  description = "DB cluster parameter group."
  family      = var.cluster_family
  parameter {
    name  = "tls"
    value = var.tls_enabled ? "enabled" : "disabled"
  }
  tags = var.tags
}
