/* This program is free software: you can redistribute it and/or
   modify it under the terms of the GNU Lesser General Public License
   as published by the Free Software Foundation, either version 3 of
   the License, or (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

otp.namespace("otp.widgets.transit");

otp.widgets.transit.TripViewerWidget =
    otp.Class(otp.widgets.transit.RouteBasedWidget, {

    module : null,

    agency_id : null,

    activeLeg : null,
    timeIndex : null,

    routeLookup : [], // for retrieving route obj from numerical index in <select> element

    lastSize : null,
    realtimeTracking : false,
    showWidgetButton: null,
    //SIDEBAR WIDGET
    sidebar: false,
    //variantIndexLookup : null,
    resizable       : false,

    initialize : function(id, module) {

        otp.widgets.transit.RouteBasedWidget.prototype.initialize.call(this, id, module, {
            title : _tr('Trip Viewer'),
            cssClass : 'otp-tripViewer',
            closeable : true,
            openInitially : false,
            persistOnClose : true,
        });

        this.module = module;

        var this_ = this;

        this.stopList = $('<div class="otp-tripViewer-stopList notDraggable" />').appendTo(this.mainDiv);

        this.scheduleLink = $('<div class="otp-tripViewer-scheduleLink notDraggable" />').appendTo(this.mainDiv);

        console.log("added sched link");
        this.mainDiv.resizable({
            minWidth: 200,
            alsoResize: this.stopList,
        });

        //SIDEBAR
        if(this.sidebar){
            this.showWidgetButton = $("#show-routes-button");
            this.addRoutePathButton()
            //live button is handled in variantSelected function
            // because it needs variant's id to find realtime data
        }
    },
    close : function() {
        //check if sidebar is enabled
        if(this.sidebar){
            //check if this.path exists to remove polyline from map
            //
        }

        if(typeof this.onClose === 'function') this.onClose();
        this.isOpen = false;
        this.hide();
    },
    addRoutePathButton : function() {
        const this_ = this;

        this.mainDiv.addClass("sidebar-tripwidget notDraggable")

        //CLOSE ROUTE WIDGET BUTTON
        $('<span id="close-tripViewerWidget-button" class="notDraggable" style=""><a href="#"><i class="fas fa-times"></i></a></span>').appendTo(this.mainDiv).click((e) => {
            this_.mainDiv.removeClass("isOpen")
            if(this_.showWidgetButton){
                this_.showWidgetButton.removeClass("active")
            }else {
                $("#show-routes-button").removeClass("active")
            }
            this_.close()
        })

        //SHOW ROUTE PATH (PATTERN SHAPELINE)
        $('<span id="show-route-path-button" class="notDraggable" style=""><a href="#"><i class="fas fa-road"></i></a></span>')
            .appendTo(this.mainDiv)
            .click(function(evt) {
                evt.preventDefault();
                evt.stopImmediatePropagation();
                //if isMobile show map, closing the widget
                if(isMobile) this_.close()
            });
    },
    addRouteLiveButton : function() {
        const this_ = this;
        //check realtime
        //check realtime
        //get trips from pattern

        const params = {
            trips: this_.activeVariant.trips.map(i => i.id)
        };
        this_.module.webapp.indexApi.getRfidFromTripShiftByPattern(params, this_, function(result){
            if(result.found){
                //check realtime
                const rfids = result.data.map(rfid => rfid.rfid_code);

                this_.module.webapp.indexApi.getRealTimeDriverid(rfids, this_, function(live){
                    if(live && live.length){
                        //create span element by using vanilla JS, to prevent bad strings due to JSON parse
                        let span = document.createElement("span");
                        span.className = "notDraggable live-button";
                        //we need to fetch only data returned by getRealTimeDriverid,
                        // not all "rfids" provided by rfidroute because there might be offline vehicles or with driverId not updated
                        span.dataset.unitids = JSON.stringify(live.map(i => i.unitID));
                        span.dataset.tripname = this_.activeVariant.trip_route.join(", ");
                        span.id="show-route-live-button";
                        span.innerHTML = '<a href="#"><i class="fas fa-bus"></i></a>'
                        $(span).appendTo(this_.mainDiv)
                        .click(function(evt) {
                            //this click should trigger live-button event
                            //debugger;
                            //if you are on mobile close the widget to show map
                            //do this in the real time function, checking live-button's parent widget with otp-widget class
                            //if(isMobile) $("#close-tripViewerWidget-button").trigger("click")
                            //if(isMobile) this_.close()
                        });
                    }

                })

            }
        })


    },


    clear : function() {
        this.stopList.empty();
    },

    variantSelected : function(variantData) {
        //console.log("var sel");
        //console.log(variantData);
        var this_ = this;
        this.stopList.empty();
        var selectedStopIndex = 0;

        //check if sidebar is active
        if(this.sidebar){
            //check realtime
            this.addRouteLiveButton()
            //check if is visible
            if(!this_.mainDiv.hasClass("isOpen")){
                this_.mainDiv.addClass("isOpen")
            }
            if(!this_.showWidgetButton.hasClass("active")){
                this_.showWidgetButton.addClass("active")
            }
        }


        for(var i=0; i<this.activeVariant.stops.length; i++) {
            var stop = this.activeVariant.stops[i];

            var row = $('<div class="otp-tripViewer-stopRow" />').appendTo(this.stopList);

            var stopIcon = $('<div class="otp-tripViewer-stopRow-img" style="float:left;" />').appendTo(row);

            var stopText = $('<div class="otp-tripViewer-stopRow-box" style="" />').appendTo(row);

            // use the appropriate line/stop graphic
            var lineImg;
            if(i == 0) {
                //lineImg = $('<img src="images/widget-trip-stop-first.png" />');
                lineImg = $('<i class="far fa-circle" style="margin-top: -2px;"></i>')
            }
            else if(i == this.activeVariant.stops.length - 1) {
                //lineImg = $('<img src="images/widget-trip-stop-last.png" />');
                lineImg = $('<i class="far fa-dot-circle"></i>')
                stopText.css({"border-left": "none"})
            }
            else {
                //lineImg = $('<img src="images/widget-trip-stop-middle.png" />');
                lineImg = $('<i class="far fa-circle"></i>')
            }

            // append the arrow for the board/alight stop, if applicable
            if(this.activeLeg && i == this.activeLeg.from.stopIndex) {
                row.css({"border-top-left-radius" : "5px", "border-top-right-radius": "5px"});
                $('<img src="images/mode/arrow.png" style="margin-right: 4px; margin-top: -10px;" />').appendTo(stopIcon);
            }
            else if(this.activeLeg && i == this.activeLeg.to.stopIndex) {
                row.css({"border-bottom-left-radius" : "5px", "border-bottom-right-radius": "5px"});
                $('<img src="images/mode/arrow-left.png" style="margin-right: 4px; margin-top: -10px;" />').appendTo(stopIcon);
            }
            else {
                lineImg.css({ marginLeft : 12 });
            }

            lineImg.appendTo(stopIcon);

            // set up the stop name and id/links content

            var stopRowName = $('<div class="otp-tripViewer-stopRow-name"><b>'+(i+1)+'.</b> '+stop.name+'</div>')
            stopRowName.appendTo(stopText);
            var idLine = $('<div class="otp-tripViewer-stopRow-idLine" />').appendTo(stopText);
            var idHtml = '<span><i>';
            if(stop.url) idHtml += '<a href="'+stop.url+'" target="_blank">';
            idHtml += stop.id; //.agencyId+' #'+stop.id.id;
            if(stop.url) idHtml += '</a>';
            idHtml += '</i></span>'
            $(idHtml).appendTo(idLine);

            //TRANSLATORS: Recenter map on this stop (Shown at each stop in
            //Trip viewer
            $('<span><a href="#"><i class="fas fa-crosshairs" title="' + _tr('Recenter') + '"></i></a></span>').appendTo(idLine)
            .data("stop", stop)
            .click(function(evt) {
                var stop = $(this).data("stop");
                this_.module.webapp.map.lmap.panTo(new L.LatLng(stop.lat, stop.lon));
            });
            //TRANSLATORS: Link to Stop viewer (Shown at each stop in Trip
            //viewer)
            $('<span><a href="#"><i class="fas fa-clock" title="' + _tr('Viewer') + '"></i></a></span>').appendTo(idLine)
            .data("stop", stop)
            .click(function(evt) {
                var stop = $(this).data("stop");
                if(!this_.module.stopViewerWidget) {
                    this_.module.stopViewerWidget = new otp.widgets.transit.StopViewerWidget("otp-"+this_.module.id+"-stopViewerWidget", this_.module);
                    this_.module.stopViewerWidget.mainDiv.offset({top: evt.clientY, left: evt.clientX});
                }
                this_.module.stopViewerWidget.show();
                //this_.module.stopViewerWidget.activeTime = leg.startTime;
                this_.module.stopViewerWidget.setStop(stop.id, stop.name);
                this_.module.stopViewerWidget.bringToFront();
            });

            // highlight the boarded stops
            if(this.activeLeg && i >= this.activeLeg.from.stopIndex && i <= this.activeLeg.to.stopIndex) {
                row.addClass("highlighted")
            }

            // set up hover functionality (open popup over stop)
            row.data("stop", stop).hover(function(evt) {
                var stop = $(this).data("stop");
                var latLng = new L.LatLng(stop.lat, stop.lon);
                if(!this_.module.webapp.map.lmap.getBounds().contains(latLng)) return;
                var popup = L.popup()
                    .setLatLng(latLng)
                    .setContent(stop.name)
                    .openOn(this_.module.webapp.map.lmap);
            }, function(evt) {
                this_.module.webapp.map.lmap.closePopup();
            });

        }

        // scroll to the boarded segment, if applicable
        if(this.activeLeg) {
            var scrollY = this.stopList[0].scrollHeight * this.activeLeg.from.stopIndex / (this.activeVariant.stops.length - 1);
            this.stopList.scrollTop(scrollY -50);

        }

        // update the route link
        var url = variantData.route.url;
        var html = "";
        if(url) html += 'Link to: <a href="' + url + '" target="_blank">Route Info</a>';

        // TriMet-specific code
        if(url.indexOf('http://trimet.org') === 0) {
            var day = "w";
            if(this.activeLeg) {
                var dow = moment(this.activeLeg.startTime).add("h", -3).day();
                if(dow === 0) day = "h";
                if(dow === 6) day = "s";
            }
            var rte = url.substring(29, 32);
            var direction = variantData.id.split(':')[2];
            html += ' | <a href="http://trimet.org/schedules/' + day + '/t1' + rte + '_' + direction + '.htm" target="_blank">Timetable</a>';
        }

        this.scheduleLink.html(html);

    },

});
