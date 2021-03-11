# OpenTripPlanner - Infomobility L'Aquila
OpenTripPlanner (OTP) is an open source multi-modal trip planner. It depends on open data in open standard file formats (GTFS and OpenStreetMap), and includes a REST API for journey planning as well as a map-based Javascript client. 
http://opentripplanner.org

The main Java server code is in src/main/. OTP also includes a Javascript client based on the Leaflet mapping library in src/client/. The Maven build produces a JAR file at target/otp-VERSION.jar containing all necessary code and dependencies to run OpenTripPlanner.
Additional information and instructions are available in the main documentation, including a quick introduction.

# Pre Built JAR
- jar shaded file

# Building from Source
You can follow the same indication explained in the official documentation. \
http://docs.opentripplanner.org/en/latest/Getting-OTP/ \
You may also choose to build OTP from its source code. If you will be modifying OTP you will need to know how to rebuild it (though your IDE may take care of this build cycle for you).
> remember to use `-DskipTests in *maven* command`to avoid tests execution

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

If problems occur caused by unavailable maven packages, [here](http://a.org) you can find the required set of maven dependencies, ready to be copied in Home directory.

## Working on OTP in an IDE
*Suggested Approach*

- Clone the OTP GitHub repository manually (on the command line or using some other Git interface tool);
- Then import the resulting local OTP repository into your IDE as a *Maven* project. 

The IDE should then take care of fetching all the libraries OTP depends on, based on the Maven project description (POM file) in the base of the OTP repository. This step can take a long time because it involves downloading a lot of JAR files. *If problems occur because of packages' unavailabilty or bad references, check previous note in the section above as expedient*.

When running your local copy of the OTP source within an IDE, all command line switches and configuration options will be identical to the ones used when running the OTP JAR from the command line, but you will need to create a ```run configuration``` instance.
### Run Configuration
Both IntelliJ and Eclipse have ``run`` menus, from which you can select an option to edit the run configurations. You want to create a configuration for a Java Application, specifying the main class `org.opentripplanner.standalone.OTPMain`.  
Unlike on the command line, the arguments to the JVM and to the main class you are running are specified separately. 

In the field for the **VM options** you'll want to put your maximum memory parameter (`-Xmx2G`, or whatever limit you want to place on JVM memory usage). 
The rest of the parameters to OTP itself will go in a different field with a name like **program arguments**.

## Infomobility Configurations
Configurations that have been used for Infomobility system are stored as *project files* in ``.idea/runConfiguration``.

###Build Graph
![Filter View](https://github.com/giuseppebianchi/gssi-infomobility-otp/blob/dev-1.x/resources/disable_maven_when_running_different_configurations.png?raw=true)
- VM Options: `-Xmx4G`
- CLI arguments: `--build ./data`
#### Java Configuration inMemory
- VM Options: `-Xmx4G`
- CLI arguments: `--build ./data --inMemory`

#### Java Configuration
- VM Options: `-Xmx2G`
- CLI arguments: `--autoReload --server --basePath ./data --autoScan --graphs ./data`

### otp Maven
This builds executable file `otp-1.5.0-SNAPSHOT-shaded.jar` in `target` directory.
- Command Line: `clean package -DskipTests`
- Profiles: `-test`

If all goes well you should see a success message like the following:
```
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 42.164s
[INFO] Finished at: Tue Feb 18 19:35:48 CET 2014
[INFO] Final Memory: 88M/695M
[INFO] ------------------------------------------------------------------------
```
This build process should produce a JAR file called **otp-x.y.z-shaded.jar** in the **target/** directory which contains all the compiled OTP classes and their dependencies (the external libraries they use).

# Run OTP as JAR Application



# Deployment

