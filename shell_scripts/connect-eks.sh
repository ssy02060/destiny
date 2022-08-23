region=ap-northeast-2
cluster_name=destiny-eks-MfKErTal

aws eks --region $region update-kubeconfig --name $cluster_name