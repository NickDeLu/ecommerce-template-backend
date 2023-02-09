terraform {
    required_providers {
        aws = {
            source = "hashicorp/aws"
            version = "~> 4.0"
        }
    }
}

variable "ACCESS_KEY_ID" {}
variable "ACCESS_KEY" {}

provider "aws" {
    region = "us-east-1"
    access_key = "${var.ACCESS_KEY_ID}"
    secret_key = "${var.ACCESS_KEY}"
}

resource "aws_security_group" "ecom-sg" {
    name = "ecommerce-security-group"
    description = "allow ssh and http traffic to server"
    ingress {
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port = 80
        to_port = 80
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress{
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

resource "aws_instance" "ecom-api" {
    ami = "ami-04ad2567c9e3d7893"
    instance_type = "t2.micro"
    availability_zone = "us-east-1a"
    security_groups = ["${aws_security_group.ecom-sg.name}"]
    key_name = "test-aws"
    user_data = <<-EOF
                #! /bin/bash
                sudo yum update -y
                sudo yum install git httpd curl -y
                cd /var/repo
                curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash -
                sudo yum install nodejs -y
                sudo systemctl start httpd
                sudo systemctl enable httpd
                git clone https://github.com/NickDeLu/backend-template /var/repo && cd /var/repo && sudo npm i && sudo npm run build && mv /var/repo/dist /var/www/html/
                EOF
    tags = {
        name = "ecommerce-api"
    }
}