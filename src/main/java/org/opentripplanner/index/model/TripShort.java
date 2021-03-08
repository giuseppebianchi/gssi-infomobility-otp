package org.opentripplanner.index.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.opentripplanner.model.FeedScopedId;
import org.opentripplanner.model.Trip;

import com.beust.jcommander.internal.Lists;

public class TripShort {

    public FeedScopedId id;
    public String tripHeadsign;
    public FeedScopedId serviceId;
    public String shapeId;
    public Integer direction;
    public TripTimeShort departureStop;
    public TripTimeShort arrivalStop;
    public String tripShortName;
    public String patternId;

    // INCLUDE start and end time, pattern and route in detail version
    
    public TripShort (Trip trip) {
        id = trip.getId();
        tripHeadsign = trip.getTripHeadsign();
        serviceId = trip.getServiceId();
        FeedScopedId shape = trip.getShapeId();
        shapeId = shape == null ? null : shape.getId();
        String directionId = trip.getDirectionId();
        direction = directionId == null ? null : Integer.parseInt(directionId);
        tripShortName = trip.getTripShortName();
    }
    public TripShort (Trip trip, TripTimeShort stop) {
        id = trip.getId();
        tripHeadsign = trip.getTripHeadsign();
        serviceId = trip.getServiceId();
        FeedScopedId shape = trip.getShapeId();
        shapeId = shape == null ? null : shape.getId();
        String directionId = trip.getDirectionId();
        direction = directionId == null ? null : Integer.parseInt(directionId);
        tripShortName = trip.getTripShortName();
        departureStop = stop;
    }

    public TripShort (Trip trip, TripTimeShort departure, TripTimeShort arrival) {
        id = trip.getId();
        tripHeadsign = trip.getTripHeadsign();
        serviceId = trip.getServiceId();
        FeedScopedId shape = trip.getShapeId();
        shapeId = shape == null ? null : shape.getId();
        String directionId = trip.getDirectionId();
        direction = directionId == null ? null : Integer.parseInt(directionId);
        tripShortName = trip.getTripShortName();
        departureStop = departure;
        arrivalStop = arrival;
    }
    public TripShort (Trip trip, TripTimeShort departure, TripTimeShort arrival, String patternCode) {
        id = trip.getId();
        tripHeadsign = trip.getTripHeadsign();
        serviceId = trip.getServiceId();
        FeedScopedId shape = trip.getShapeId();
        shapeId = shape == null ? null : shape.getId();
        String directionId = trip.getDirectionId();
        direction = directionId == null ? null : Integer.parseInt(directionId);
        tripShortName = trip.getTripShortName();
        departureStop = departure;
        arrivalStop = arrival;
        patternId = patternCode;
    }

    public static List<TripShort> list (Collection<Trip> in) {
        List<TripShort> out = Lists.newArrayList();
        for (Trip trip : in) out.add(new TripShort(trip));
        return out;
    }
    public static List<TripShort> list (Collection<Trip> in, List<TripTimeShort> departureStop_times) {
        List<TripShort> out = Lists.newArrayList();
        int index = 0;
        for (Trip trip : in) {
            out.add(new TripShort(trip, departureStop_times.get(index)));
            index++;
        }
        return out;
    }

}
