#!/bin/bash

sh install-aws-cli.sh
sh install-docker.sh
sh install-jenkins.sh
sh install-k8s.sh
sh install-terraform.sh

aws eks update-kubeconfig \
--region ap-northeast-2 \
--name destiny-eks-MfKErTal \
--role-arn arn:aws:iam::844148244640:role/destiny-eks-MfKErTal-cluster-20220810072700045100000001
kubectl create ns argocd