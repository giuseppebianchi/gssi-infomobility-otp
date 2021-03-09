# OpenTripPlanner - Infomobility L'Aquila
OpenTripPlanner (OTP) is an open source multi-modal trip planner. It depends on open data in open standard file formats (GTFS and OpenStreetMap), and includes a REST API for journey planning as well as a map-based Javascript client. 
http://opentripplanner.org

The main Java server code is in src/main/. OTP also includes a Javascript client based on the Leaflet mapping library in src/client/. The Maven build produces a JAR file at target/otp-VERSION.jar containing all necessary code and dependencies to run OpenTripPlanner.
Additional information and instructions are available in the main documentation, including a quick introduction.

# Development
http://docs.opentripplanner.org/en/latest/Developers-Guide/

## Quick Setup
A Quick guide to setting up the OpenTripPlanner project. *Check next section below for a better approach.*

You need Git, Maven and Java(JDK) and an IDE installed on your computer, or JDK and Maven embedded in your IDE.

- Clone OpenTripPlanner from GitHub.
- Checkout the desired branch 
  ```
  git checkout dev-1.x
  ```
- Run ``maven package`` - this will download all dependencies, build the project and run tests.
- Open the project in your IDE.

If problems occur, [here](http://a.org) you can find the required set of maven dependencies, ready to be copied in Home directory.

## Working on OTP in an IDE
*Suggested Approach*

- Clone the OTP GitHub repository manually (on the command line or using some other Git interface tool);
- Then import the resulting local OTP repository into your IDE as a `Maven project. 

The IDE should then take care of fetching all the libraries OTP depends on, based on the Maven project description (POM file) in the base of the OTP repository. This step can take a long time because it involves downloading a lot of JAR files.

When running your local copy of the OTP source within an IDE, all command line switches and configuration options will be identical to the ones used when running the OTP JAR from the command line, but you will need to create a ```run configuration``` instance.
### Run Configuration
Both IntelliJ and Eclipse have ``run`` menus, from which you can select an option to edit the run configurations. You want to create a configuration for a Java Application, specifying the main class `org.opentripplanner.standalone.OTPMain`.  
Unlike on the command line, the arguments to the JVM and to the main class you are running are specified separately. In the field for the VM options you'll want to put your maximum memory parameter (`-Xmx2G`, or whatever limit you want to place on JVM memory usage). The rest of the parameters to OTP itself will go in a different field with a name like `program arguments`.


