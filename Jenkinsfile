frontend_services = ['gateway']
backend_services = ['review', 'my-type', 'movie']
data_extractions = ['movie_data']
recommendations = ['recommendation']

def COLOR_MAP = [
    'SUCCESS': 'good', 
    'FAILURE': 'danger',
]
properties([pipelineTriggers([githubPush()])])
pipeline {
  agent any  
  environment {
    //put your environment variables
    doError = '0'
    REGISTRY_ID = "844148244640"
    DOCKER_REPO = "${REGISTRY_ID}.dkr.ecr.ap-northeast-2.amazonaws.com/gateway"
    AWS_DEFAULT_REGION = "ap-northeast-2"
    // CHART_DIR="$JENKINS_HOME/workspace/helm-integration/helm"
    // HELM_RELEASE_NAME = "api-service"
    // ENV= """${sh(
  	// 	returnStdout: true,
  	// 	script: 'declare -n ENV=${GIT_BRANCH}_env ; echo "$ENV"'
    // ).trim()}"""
  }
    options {
        buildDiscarder(logRotator(numToKeepStr: '20')) 
  }   
  stages {
    stage ('Build and Test') {
      steps {
        sh '''
        docker build \
        -t ${DOCKER_REPO}:${BUILD_NUMBER}  \
        --file ./gateway/Dockerfile.prod ./gateway 
        #put your Test cases
        echo 'Starting test cases'
        '''    
      }
    }  
    stage ('Artefact') {
      steps {
        sh '''
        $(aws ecr get-login --region ap-northeast-2 --no-include-email)
        docker push ${DOCKER_REPO}:${BUILD_NUMBER}
        '''
        }
    }   
    // stage ('Deploy') {
    //   steps {
    //     sh '''
    //     declare -n CLUSTER_NAME=${ENV}_cluster
    //     aws eks --region $AWS_DEFAULT_REGION  update-kubeconfig --name ${CLUSTER_NAME}
    //     kubectl config set-context --current --namespace=$ENV
    //     helm upgrade --install ${HELM_RELEASE_NAME} ${CHART_DIR}/${HELM_RELEASE_NAME}/ \
    //     --set image.repository=${DOCKER_REPO} \
    //     --set image.tag=${BUILD_NUMBER} \
    //     --set environment=-${ENV} \
    //     -f ${CHART_DIR}/${HELM_RELEASE_NAME}/values.yaml \
    //     --namespace ${ENV}
    //     '''
    //   }
    // }
    stage('Cleanup') {
      steps{
        sh "docker rmi ${DOCKER_REPO}:${BUILD_NUMBER}"
      }
  }
// slack notification configuration 
  stage('Error') {
    // when doError is equal to 1, return an error
    when {
        expression { doError == '1' }
    }
    steps {
        echo "Failure :("
        error "Test failed on purpose, doError == str(1)"
    }
}
  stage('Success') {
    // when doError is equal to 0, just print a simple message
    when {
        expression { doError == '0' }
    }
    steps {
        echo "Success :)"
    }
}
  }
    // Post-build actions
  post {
      always {
          slackSend channel: '#jenkins-notification',
              color: COLOR_MAP[currentBuild.currentResult],
              message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} More info at: $RUN_DISPLAY_URL"
      }
  }
}