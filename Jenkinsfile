def frontend_services = ['gateway']
def backend_services = ['review', 'my-type', 'movie']
def data_extractions = ['movie_data']
def recommendations = ['recommendation']

def COLOR_MAP = [
    'SUCCESS': 'good', 
    'FAILURE': 'danger',
]

def build_services(services) {
    sh "echo build services with docker"
    services.each { service ->
        sh '''
        docker build \
        -t $DOCKER_REPO/${service}:$BUILD_NUMBER  \
        --file ./${service}/Dockerfile.prod ./${service}

        '''
    }
}


def push_services(services) {
    sh "echo push services with docker to ecr"
    services.each { service ->
        sh '''
        docker push $DOCKER_REPO/${service}:$BUILD_NUMBER
        '''
    }
}

def clean_up(services) {
    sh "echo clean up services with docker to ecr"
    services.each { service ->
        sh "docker rmi $DOCKER_REPO/${service}:$BUILD_NUMBER"
    }
}
def Greet(name) {
    echo "Hello $DOCKER_REPO"
}

properties([pipelineTriggers([githubPush()])])
pipeline {
  agent any  
  environment {
    //put your environment variables
    doError = '0'
    REGISTRY_ID = "844148244640"
    DOCKER_REPO = "${REGISTRY_ID}.dkr.ecr.ap-northeast-2.amazonaws.com/"
    AWS_DEFAULT_REGION = "ap-northeast-2"
  }
  options {
    buildDiscarder(logRotator(numToKeepStr: '20')) 
  }
  stages {
    stage ('Build and Test') {
      steps {
        build_services(frontend_services)
        build_services(backend_services)
      }
    }  
    stage ('Artefact') {
      steps {
        withAWS(credentials:'destiny-ecr-credentials') {
          sh '''
          aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin ${DOCKER_REPO}
          '''
          push_services(frontend_services)
          push_services(backend_services)
        }  
      }
    }   
    stage('Cleanup') {
      steps{
        clean_up(frontend_services)
        clean_up(backend_services)
      }
    }
  }
}





    // CHART_DIR="$JENKINS_HOME/workspace/helm-integration/helm"
    // HELM_RELEASE_NAME = "api-service"
    // ENV= """${sh(
  	// 	returnStdout: true,
  	// 	script: 'declare -n ENV=${GIT_BRANCH}_env ; echo "$ENV"'
    // ).trim()}"""
    
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
        
    // slack notification configuration 
    //   stage('Error') {
    //     // when doError is equal to 1, return an error
    //     when {
    //         expression { doError == '1' }
    //     }
    //     steps {
    //         echo "Failure :("
    //         error "Test failed on purpose, doError == str(1)"
    //     }
    // }
    // stage('Success') {
    //   // when doError is equal to 0, just print a simple message
    //   when {
    //       expression { doError == '0' }
    //   }
    //   steps {
    //       echo "Success :)"
    //   }
    // }

    // Post-build actions
  // post {
  //     always {
  //         slackSend channel: '#jenkins-notification',
  //             color: COLOR_MAP[currentBuild.currentResult],
  //             message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} More info at: $RUN_DISPLAY_URL"
  //     }
  // }
