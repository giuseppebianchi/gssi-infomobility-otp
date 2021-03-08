package org.opentripplanner.index.model;

import java.util.Collection;
import java.util.List;

import org.opentripplanner.model.FeedScopedId;
import org.opentripplanner.model.Trip;
import org.opentripplanner.routing.edgetype.TripPattern;

import com.beust.jcommander.internal.Lists;

public class PatternDetail extends PatternShort {

    /* Maybe these should just be lists of IDs only, since there are stops and trips subendpoints. */
    public FeedScopedId routeId;
    public String routeName;
    public Collection<StopShort> stops = Lists.newArrayList();
    public Collection<TripShort> trips = Lists.newArrayList();
    
    // Include all known headsigns
    
    public PatternDetail(TripPattern pattern) {
        super (pattern);
        routeId = pattern.route.getId();
        routeName = pattern.route.getShortName();
        stops = StopShort.list(pattern.getStops());
        trips = TripShort.list(pattern.getTrips());
    }
    public PatternDetail(TripPattern pattern, List<TripShort> list) {
        super (pattern);
        routeName = pattern.route.getShortName();
        routeId = pattern.route.getId();
        stops = StopShort.list(pattern.getStops());
        //trips = TripShort.list(pattern.getTrips());
        trips = list;
    }

    
}
