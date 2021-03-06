// This Jenkins build requires a configmap called jenkin-config with the following in it:
//
// password_qtxn=<cfms-postman-operator userid password>
// password_nonqtxn=<cfms-postman-non-operator userid password>
// client_secret=<keycloak client secret>
// zap_with_url=<zap command including dev url for analysis> 
// namespace=<openshift project namespace>
// url=<url of api>/api/v1/
// authurl=<Keycloak domain>
// clientid=<keycload Client ID>
// realm=<keycloak realm>

def WAIT_TIMEOUT = 10
def TAG_NAMES = ['dev', 'test', 'production']
def BUILDS = ['queue-management-api', 'queue-management-npm-build', 'queue-management-frontend']
def DEP_ENV_NAMES = ['dev', 'test', 'prod']
def label = "mypod-${UUID.randomUUID().toString()}"
def API_IMAGE_HASH = ""
def FRONTEND_IMAGE_HASH = ""

String getNameSpace() {
    def NAMESPACE = sh (
        script: 'oc describe configmap jenkin-config | awk  -F  "=" \'/^namespace/{print $2}\'',
        returnStdout: true
    ).trim()
    return NAMESPACE
}

// Get an image's hash tag
String getImageTagHash(String imageName, String tag = "") {

  if(!tag?.trim()) {
    tag = "latest"
  }

  def istag = openshift.raw("get istag ${imageName}:${tag} -o template --template='{{.image.dockerImageReference}}'")
  return istag.out.tokenize('@')[1].trim()
}

podTemplate(
    label: label, 
    name: 'jenkins-python3nodejs', 
    serviceAccount: 'jenkins', 
    cloud: 'openshift', 
    containers: [
        containerTemplate(
            name: 'jnlp',
            image: '172.50.0.2:5000/openshift/jenkins-slave-python3nodejs',
            resourceRequestCpu: '1000m',
            resourceLimitCpu: '2000m',
            resourceRequestMemory: '2Gi',
            resourceLimitMemory: '4Gi',
            workingDir: '/tmp',
            command: '',
            args: '${computer.jnlpmac} ${computer.name}'
        )
    ]
){
node(label) {
    stage('Checkout Source') {
        echo "checking out source"
        checkout scm
    }
        
    stage('SonarQube Analysis') {
        echo ">>> Performing static analysis <<<"
        SONARQUBE_PWD = sh (
            script: 'oc set env dc/sonarqube --list | awk  -F  "=" \'/SONARQUBE_ADMINPW/{print $2}\'',
            returnStdout: true
        ).trim()

        SONARQUBE_URL = sh (
            script: 'oc get routes -o wide --no-headers | awk \'/sonarqube/{ print match($0,/edge/) ?  "https://"$2 : "http://"$2 }\'',
            returnStdout: true
        ).trim()

        echo "PWD: ${SONARQUBE_PWD}"
        echo "URL: ${SONARQUBE_URL}"

        dir('sonar-runner') {
            sh (
                returnStdout: true, 
                script: "./gradlew sonarqube -Dsonar.host.url=${SONARQUBE_URL} --stacktrace --info"
            )
        }
    }

    stage("Build API..") {
        script: {
            openshift.withCluster() {
                openshift.withProject() {

                    // Find all of the build configurations associated to the application using labels ...
                    def bc = openshift.selector("bc", "${BUILDS[0]}")
                    echo "Started builds: ${bc.names()}"
                    bc.startBuild("--wait").logs("-f")
                }
                echo "API Build complete ..."
            }
        }
    }

    stage("Deploy API to Dev") {
        script: {
            openshift.withCluster() {
                openshift.withProject() {
                    echo "Tagging ${BUILDS[0]} for deployment to ${TAG_NAMES[0]} ..."

                    // Don't tag with BUILD_ID so the pruner can do it's job; it won't delete tagged images.
                    // Tag the images for deployment based on the image's hash
                    API_IMAGE_HASH = getImageTagHash("${BUILDS[0]}")
                    echo "API_IMAGE_HASH: ${API_IMAGE_HASH}"
                    openshift.tag("${BUILDS[0]}@${API_IMAGE_HASH}", "${BUILDS[0]}:${TAG_NAMES[0]}")
                }

                def NAME_SPACE = getNameSpace()
                openshift.withProject("${NAME_SPACE}-${DEP_ENV_NAMES[0]}") {
                    def dc = openshift.selector('dc', "${BUILDS[0]}")
                    // Wait for the deployment to complete.
                    // This will wait until the desired replicas are all available
                    dc.rollout().status()
                }
                echo "API Deployment Complete."
            }
        }
    }

    stage("Build Front End..") {
        script: {
            openshift.withCluster() {
                openshift.withProject() {

                    // Find all of the build configurations associated to the application using labels ...
                    bc = openshift.selector("bc", "${BUILDS[1]}")
                    echo "Started builds: ${bc.names()}"
                    bc.startBuild("--wait").logs("-f")

                    bc = openshift.selector("bc", "${BUILDS[2]}")
                    echo "Started builds: ${bc.names()}"
                    bc.startBuild("--wait").logs("-f")
                }
                echo "Front End complete ..."
            }
        }
    }

    stage("Deploy Frontend to Dev") {
        script: {
            openshift.withCluster() {
                openshift.withProject() {
                    echo "Tagging ${BUILDS[2]} for deployment to ${TAG_NAMES[0]} ..."

                    // Don't tag with BUILD_ID so the pruner can do it's job; it won't delete tagged images.
                    // Tag the images for deployment based on the image's hash
                    FRONTEND_IMAGE_HASH = getImageTagHash("${BUILDS[2]}")
                    echo "FRONTEND_IMAGE_HASH: ${FRONTEND_IMAGE_HASH}"
                    openshift.tag("${BUILDS[2]}@${FRONTEND_IMAGE_HASH}", "${BUILDS[2]}:${TAG_NAMES[0]}")
                }

                def NAME_SPACE = getNameSpace()
                openshift.withProject("${NAME_SPACE}-${DEP_ENV_NAMES[0]}") {
                    dc = openshift.selector('dc', "${BUILDS[2]}")
                    // Wait for the deployment to complete.
                    // This will wait until the desired replicas are all available
                    dc.rollout().status()
                }
                echo "Front End Deployment Complete."
            }
        }
    }

    stage('Newman Tests') {
        dir('api/postman') {
            sh "ls -alh"

            sh (
                returnStdout: true,
                script: "npm init -y"
            )

            sh (
                returnStdout: true,
                script: "npm install newman"
            )

            USERID = sh (
                script: 'oc describe configmap jenkin-config | awk  -F  "=" \'/^userid_qtxn/{print $2}\'',
                returnStdout: true
            ).trim()

            PASSWORD = sh (
                script: 'oc describe configmap jenkin-config | awk  -F  "=" \'/^password_qtxn/{print $2}\'',
                returnStdout: true
            ).trim()

            USERID_NONQTXN = sh (
                script: 'oc describe configmap jenkin-config | awk  -F  "=" \'/^userid_nonqtxn/{print $2}\'',
                returnStdout: true
            ).trim()

            PASSWORD_NONQTXN = sh (
                script: 'oc describe configmap jenkin-config | awk  -F  "=" \'/^password_nonqtxn/{print $2}\'',
                returnStdout: true
            ).trim()

            CLIENT_SECRET = sh (
                script: 'oc describe configmap jenkin-config | awk  -F  "=" \'/^client_secret/{print $2}\'',
                returnStdout: true
            ).trim()

            REALM = sh (
                script: 'oc describe configmap jenkin-config | awk  -F  "=" \'/^realm/{print $2}\'',
                returnStdout: true
            ).trim()

            API_URL = sh (
                script: 'oc describe configmap jenkin-config | awk  -F  "=" \'/^url/{print $2}\'',
                returnStdout: true
            ).trim()

            AUTH_URL = sh (
                script: 'oc describe configmap jenkin-config | awk  -F  "=" \'/auth_url/{print $2}\'',
                returnStdout: true
            ).trim()

            CLIENTID = sh (
                script: 'oc describe configmap jenkin-config | awk  -F  "=" \'/^clientid/{print $2}\'',
                returnStdout: true
            ).trim()

            NODE_OPTIONS='--max_old_space_size=2048'

            sh (
                returnStdout: true,
                script: "./node_modules/newman/bin/newman.js run postman_tests.json -e postman_env.json --global-var 'userid=${USERID}' --global-var 'password=${PASSWORD}' --global-var 'userid_nonqtxn=${USERID_NONQTXN}' --global-var 'password_nonqtxn=${PASSWORD_NONQTXN}' --global-var 'client_secret=${CLIENT_SECRET}' --global-var 'url=${API_URL}' --global-var 'auth_url=${AUTH_URL}' --global-var 'clientid=${CLIENTID}' --global-var 'realm=${REALM}'"
            )
        }
    }
}
}
def owaspPodLabel = "owasp-zap-${UUID.randomUUID().toString()}"
podTemplate(
    label: owaspPodLabel, 
    name: owaspPodLabel, 
    serviceAccount: 'jenkins', 
    cloud: 'openshift', 
    containers: [ containerTemplate(
        name: 'jnlp',
        image: '172.50.0.2:5000/openshift/jenkins-slave-zap',
        resourceRequestCpu: '500m',
        resourceLimitCpu: '1000m',
        resourceRequestMemory: '3Gi',
        resourceLimitMemory: '4Gi',
        workingDir: '/home/jenkins',
        command: '',
        args: '${computer.jnlpmac} ${computer.name}'
    )]
) {
    node(owaspPodLabel) {
        stage('ZAP Security Scan') {
            sleep 60
            ZAP_WITH_URL = sh (
                script: 'oc describe configmap jenkin-config | awk  -F  "=" \'/^zap_with_url/{print $2}\'',
                returnStdout: true
            ).trim()            
            def retVal = sh (
                returnStatus: true, 
                script: "${ZAP_WITH_URL}"
            )
            publishHTML([
                allowMissing: false, 
                alwaysLinkToLastBuild: false, 
                keepAll: true, 
                reportDir: '/zap/wrk', 
                reportFiles: 'baseline.html', 
                reportName: 'ZAP Baseline Scan', 
                reportTitles: 'ZAP Baseline Scan'
            ])
            echo "Return value is: ${retVal}"

            script {
                if (retVal != 0) {
                    echo "MARKING BUILD AS UNSTABLE"
                    currentBuild.result = 'UNSTABLE'
                }
            }
        }
    }
} 

node {
    stage("Deploy API - test") {
        input "Deploy to test?"
        script: {
            openshift.withCluster() {
                openshift.withProject() {
                    echo "Tagging ${BUILDS[0]} for deployment to ${TAG_NAMES[1]} ..."

                    // Don't tag with BUILD_ID so the pruner can do it's job; it won't delete tagged images.
                    // Tag the images for deployment based on the image's hash
                    echo "API_IMAGE_HASH: ${API_IMAGE_HASH}"
                    openshift.tag("${BUILDS[0]}@${API_IMAGE_HASH}", "${BUILDS[0]}:${TAG_NAMES[1]}")
                }

                def NAME_SPACE = getNameSpace()
                openshift.withProject("${NAME_SPACE}-${DEP_ENV_NAMES[1]}") {
                    def dc = openshift.selector('dc', "${BUILDS[0]}")
                    // Wait for the deployment to complete.
                    // This will wait until the desired replicas are all available
                    dc.rollout().status()
                }
                echo "API Deployment Complete."
            }
        }
    }
    stage("Deploy Frontend - Test") {
        script: {
            openshift.withCluster() {
                openshift.withProject() {
                    echo "Tagging ${BUILDS[2]} for deployment to ${TAG_NAMES[1]} ..."

                    // Don't tag with BUILD_ID so the pruner can do it's job; it won't delete tagged images.
                    // Tag the images for deployment based on the image's hash
                    echo "FRONTEND_IMAGE_HASH: ${FRONTEND_IMAGE_HASH}"
                    openshift.tag("${BUILDS[2]}@${FRONTEND_IMAGE_HASH}", "${BUILDS[2]}:${TAG_NAMES[1]}")
                }

                def NAME_SPACE = getNameSpace()
                openshift.withProject("${NAME_SPACE}-${DEP_ENV_NAMES[1]}") {
                    dc = openshift.selector('dc', "${BUILDS[2]}")
                    // Wait for the deployment to complete.
                    // This will wait until the desired replicas are all available
                    dc.rollout().status()
                }
                echo "Front End Deployment Complete."
            }
        }
    } 
}
node {
    stage("Deploy API - Prod") {
        input "Deploy to Prod?"
        script: {
            openshift.withCluster() {
                openshift.withProject() {
                    echo "Tagging ${BUILDS[0]} for deployment to ${TAG_NAMES[2]} ..."

                    // Don't tag with BUILD_ID so the pruner can do it's job; it won't delete tagged images.
                    // Tag the images for deployment based on the image's hash
                    echo "API_IMAGE_HASH: ${API_IMAGE_HASH}"
                    openshift.tag("${BUILDS[0]}@${API_IMAGE_HASH}", "${BUILDS[0]}:${TAG_NAMES[2]}")
                }

                def NAME_SPACE = getNameSpace()
                openshift.withProject("${NAME_SPACE}-${DEP_ENV_NAMES[2]}") {
                    def dc = openshift.selector('dc', "${BUILDS[0]}")
                    // Wait for the deployment to complete.
                    // This will wait until the desired replicas are all available
                    dc.rollout().status()
                }
                echo "API Deployment Complete."
            }
        }
    }
    stage("Deploy Frontend - Prod") {
        script: {
            openshift.withCluster() {
                openshift.withProject() {
                    echo "Tagging ${BUILDS[2]} for deployment to ${TAG_NAMES[2]} ..."

                    // Don't tag with BUILD_ID so the pruner can do it's job; it won't delete tagged images.
                    // Tag the images for deployment based on the image's hash
                    echo "FRONTEND_IMAGE_HASH: ${FRONTEND_IMAGE_HASH}"
                    openshift.tag("${BUILDS[2]}@${FRONTEND_IMAGE_HASH}", "${BUILDS[2]}:${TAG_NAMES[2]}")
                }

                def NAME_SPACE = getNameSpace()
                openshift.withProject("${NAME_SPACE}-${DEP_ENV_NAMES[2]}") {
                    dc = openshift.selector('dc', "${BUILDS[2]}")
                    // Wait for the deployment to complete.
                    // This will wait until the desired replicas are all available
                    dc.rollout().status()
                }
                echo "Front End Deployment Complete."
            }
        }
    } 
}
