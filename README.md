# OpenTripPlanner - Infomobility L'Aquila
OpenTripPlanner (OTP) is an open source multi-modal trip planner. It depends on open data in open standard file formats (GTFS and OpenStreetMap), and includes a REST API for journey planning as well as a map-based Javascript client. \
[OpenTripPlanner](http://opentripplanner.org) - 
[OTP Documentation](http://docs.opentripplanner.org/en/dev-1.x/)

The main Java **server code** is in `src/main/`. OTP also includes a Javascript **client** based on the Leaflet mapping library in `src/client/`. The Maven **build** produces a JAR file at `target/otp-VERSION.jar` containing all necessary code and dependencies to run OpenTripPlanner.
Additional information and instructions are available in the main documentation, including a quick introduction.

### Requirements
As a Java program, OTP must be run within a Java virtual machine (JVM), which is provided as part of the Java runtime (JRE) or Java development kit (JDK). Run `java -version to check that you have version 1.8 or newer of the JVM installed. If you do not you will need to install a recent OpenJDK or Oracle Java package for your operating system.

# Pre Built JAR
- jar shaded file
Learn how to use it in "Run OTP as application" section below.

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
[here](http://) you can learn more about OTP's argouments.
### Data folder
Before run OpenTripPlanner we need to provide some transit information in `data` directory. If these resources are not available, please check next section "Required Mobility Data".
In this folder the Transit Graph will be created as well, which can be used and read by OTP without rebuilding the transport network at every run.
We need to provide:
- GTFS file, which contains the public transport agency data
- PBF file, the OpenStreetMap data to build a road network for walking, cycling, and driving.

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
```shell
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 42.164s
[INFO] Finished at: Tue Feb 18 19:35:48 CET 2014
[INFO] Final Memory: 88M/695M
[INFO] ------------------------------------------------------------------------
```
This build process should produce a JAR file called **otp-x.y.z-shaded.jar** in the **target/** directory which contains all the compiled OTP classes and their dependencies (the external libraries they use).

# Building from Source
You can follow the same indication explained in the official documentation. \
http://docs.opentripplanner.org/en/latest/Getting-OTP/ \
You may also choose to build OTP from its source code. If you will be modifying OTP you will need to know how to rebuild it (though your IDE may take care of this build cycle for you).
> remember to use `-DskipTests in *maven* command`to avoid tests execution

# Required Mobility Data
### GTFS for Transit Schedules and Stops
ransport agencies throughout the world provide GTFS schedules to the public. Transitland has a registry of feeds and TransitFeeds also provides an extensive catalog. The best option is often to simply fetch the data directly from a transit operator or agency.
The GTFS file's name must end in .zip for OTP to detect it. We often use the convention of ending GTFS file names with .gtfs.zip since technically a GTFS feed is just a ZIP file containing a specific set of files.
### OSM for Streets
You'll also need OpenStreetMap data to build a road network for walking, cycling, and driving.
Download OSM PBF data for the same geographic region as your GTFS feed, and place this PBF file in the same directory you created for the OSM data.

#### Trimmed Map
1. **OpenStreetMap Export** (Suggested) \
   https://www.openstreetmap.org/export#map=11/42.3418/13.4359  \
   Zomm on the map to get the desired bounded zone to export.
   

2. **Geofabrik + Osmosis** \
Geofabrik provides extracts for larger areas like countries or states, from which you can prepare your own smaller bounding-box extracts using Osmosis or osmconvert.
This [tool](https://boundingbox.klokantech.com/) is useful for determining the geographic coordinates of bounding boxes. The CSV option in that tool produces exactly the format expected by the `osmconvert -b` switch. The `--complete-ways` switch is important to handle roads that cross outside your bounding box.
   ```shell 
   $ wget http://download.geofabrik.de/north-america/us/oregon-latest.osm.pbf
   $ osmconvert oregon-latest.osm.pbf -b=-123.043,45.246,-122.276,45.652 --complete-ways -o=portland.pbf
   $ mv portland.pbf otp ```

If you have extracted a smaller PBF file from a larger region, be sure to put only your extract (not the original larger file) in the directory with your GTFS data. Otherwise OTP will try to load both the original file and the extract in a later step.
# Run OTP as JAR Application



# Deployment

