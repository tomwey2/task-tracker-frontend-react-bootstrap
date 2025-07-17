pipeline {
     agent any
     tools {
        maven 'Maven 3.3.9'
     }
     environment {
        GHCR_CREDENTIALS = credentials("tomwey2-ghcr")
        IMAGE_NAME = 'task-tracker-frontend'
        IMAGE_VERSION = '0.1.0'
     }
     stages {
        stage("initialize") {
            steps {
                sh "env"
            }
        }
        stage("Docker build") {
            steps {
                sh "docker build -t ghcr.io/tomwey2/$IMAGE_NAME:$IMAGE_VERSION -t ghcr.io/tomwey2/$IMAGE_NAME:latest ."
                sh "docker login --username $GHCR_CREDENTIALS_USR --password $GHCR_CREDENTIALS_PSW ghcr.io"
                sh "docker push ghcr.io/tomwey2/$IMAGE_NAME:$IMAGE_VERSION"
                sh "docker push ghcr.io/tomwey2/$IMAGE_NAME:latest"
            }
        }
    }
    post {
        always {
            sh "docker logout"
        }
    }
 }
