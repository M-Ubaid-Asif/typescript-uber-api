pipeline {
  agent {
    node {
      label 'uberapi'
    }

  }
  stages {
    stage('run') {
      steps {
        git(url: 'https://github.com/M-Ubaid-Asif/typescript-uber-api', branch: 'development', changelog: true)
      }
    }

  }
}