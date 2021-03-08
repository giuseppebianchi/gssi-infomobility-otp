package org.opentripplanner.index.model;

import java.util.*;

import org.opentripplanner.model.FeedScopedId;
import org.opentripplanner.model.Trip;
import org.opentripplanner.routing.edgetype.TripPattern;

import com.beust.jcommander.internal.Lists;

public class PatternShort {

    public String id;
    public String desc;
    public FeedScopedId routeId;
    public String routeName;
    public HashSet<String> trip_route;
    //public HashMap<FeedScopedId, Trip> trips_list;
    public ArrayList<Trip> trips_list;
    public String busStopStart;
    public FeedScopedId busStopStartId;
    public String busStopEnd;
    public FeedScopedId busStopEndId;

    public PatternShort (TripPattern pattern) {
        id = pattern.code;
        desc = pattern.name;
        routeId = pattern.route.getId();
        routeName = pattern.route.getShortName();
        busStopStart = pattern.stopPattern.stops[0].getName();
        busStopStartId = pattern.stopPattern.stops[0].getId();
        busStopEnd = pattern.stopPattern.stops[pattern.stopPattern.stops.length - 1].getName();
        busStopEndId = pattern.stopPattern.stops[pattern.stopPattern.stops.length - 1].getId();
        trip_route = new HashSet<String>();
        //trips_list = new HashMap<FeedScopedId, Trip>();
        trips_list = new ArrayList<Trip>();
        for (Trip trip : pattern.getTrips()){
            trip_route.add(trip.getTripShortName());
            //trips_list.add(trip);
            //trips_list.put(trip.getId(), trip);
        }
    }
    
    public static List<PatternShort> list (Collection<TripPattern> in) {
        List<PatternShort> out = Lists.newArrayList();
        for (TripPattern pattern : in) out.add(new PatternShort(pattern));
        return out;
    }    
    
}
