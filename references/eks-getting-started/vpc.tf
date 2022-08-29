#
# VPC Resources
#  * VPC
#  * Subnets
#  * Internet Gateway
#  * Route Table
#

resource "aws_vpc" "destiny" {
  cidr_block = "10.0.0.0/16"

  tags = tomap({
    "Name"                                      = "terraform-eks-destiny-node",
    "kubernetes.io/cluster/${var.cluster-name}" = "shared",
  })
}

resource "aws_subnet" "destiny" {
  count = 2

  availability_zone       = data.aws_availability_zones.available.names[count.index]
  cidr_block              = "10.0.${count.index}.0/24"
  map_public_ip_on_launch = true
  vpc_id                  = aws_vpc.destiny.id

  tags = tomap({
    "Name"                                      = "terraform-eks-destiny-node",
    "kubernetes.io/cluster/${var.cluster-name}" = "shared",
  })
}

resource "aws_internet_gateway" "destiny" {
  vpc_id = aws_vpc.destiny.id

  tags = {
    Name = "terraform-eks-destiny"
  }
}

resource "aws_route_table" "destiny" {
  vpc_id = aws_vpc.destiny.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.destiny.id
  }
}

resource "aws_route_table_association" "destiny" {
  count = 2

  subnet_id      = aws_subnet.destiny.*.id[count.index]
  route_table_id = aws_route_table.destiny.id
}
