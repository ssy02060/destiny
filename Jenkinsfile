frontend_services = ['gateway']
backend_services = ['review', 'my-type', 'movie']
data_extractions = ['movie_data']
recommendations = ['recommendation']

pipeline {
    agent any
    tools {
       terraform 'terraform'
    }
    stages {
        stage('Git checkout') {
           steps{
                git branch: 'main', credentialsId: 'Github', url: 'https://github.com/ssy02060/destiny'
            }
        }
        stage('build service'){
            steps{
                sh 'cd ./scripts'
            }
        }
        stage('terraform format check') {
            steps{
                sh 'terraform fmt'
            }
        }
        stage('terraform Init') {
            steps{
                sh 'terraform init'
            }
        }
        stage('terraform apply') {
            steps{
                sh 'terraform apply --auto-approve'
            }
        }
    }    
}
def login_aws_for_ecr(region, registry_id, service_name){
    aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin ${registry_id}.dkr.ecr.${region}.amazonaws.com/${service_name}
}
@NonCPS // has to be NonCPS or the build breaks on the call to .each
def build_fronends(service_list, ) {
    service_list.each { service ->
        docker build -t "Hello ${item}"
    }
}