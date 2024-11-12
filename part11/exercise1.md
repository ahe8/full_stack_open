Our application is being worked on by a team of 6 people. The application is being developed in Java and has a relatively small codebase and does not have the need for any special requirements.

We are now in the process of planning and setting up our Continuous Integration (CI) environment. Some common steps in a CI setup include linting, testing, and building. We will list some of the common tools used in linting, testing and building.

Most IDEs like IntelliJ and Eclipse usually come with a built-in linter, other popular tools include Checkstyle and PMD.

JUnit and TestNG are the most popular automation testing frameworks used for unit testing.

Build tools that can be used to compile our Java code from bytecode into an executable JAR file used for production are Gradle and Apache Maven.

In addition to the most popular CI tools, Jenkins and GitHub Actions, other popular alternatives  include GitLab, CircleCI, Azure DevOps Server, and AWS CodePipeline.

At this stage of the development process, the choice to use a cloud-based environment like GitHub Actions is better suited than a self-hosted one like Jenkins. Cloud-based environments require less setup time and complexity since we don’t have to manually configure the tool and server. In the future, if we have special requirements in our CI environment that the cloud-based providers cannot provide, we can consider switching to a self-hosted solution like Jenkins.
