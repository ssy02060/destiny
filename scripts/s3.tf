// Terraform state 저장용 S3 버킷
resource "aws_s3_bucket" "movie-posters" {
  bucket = "dstny.movie.poster"
  acl    = "private"
  versioning {
    enabled = true
  }
  tags = {
    Name = "movie posters"
  }
  logging {
    target_bucket = aws_s3_bucket.logs.id
    target_prefix = "log/"
  }
  lifecycle {
    prevent_destroy = true
  }
}