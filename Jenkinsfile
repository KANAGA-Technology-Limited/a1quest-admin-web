pipeline {
    agent any
    tools {
        nodejs '20.5.1'
    }
    
    stages {
        stage('Git') {
            steps {
                git branch: 'main', url: 'https://github.com/KANAGA-Technology-Limited/a1quest-admin-web'
            }
        }
    
    
        stage('Test npm') {
            steps {
                sh 'npm version'
            }
        }
        
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('build application') {
            steps {
                script {
                env.CI = "false"
                sh 'npm run build'
                }
            }
        }
        
        stage('start application') {
            steps {
                sh 'npm start'
            }
        }
    }
}

