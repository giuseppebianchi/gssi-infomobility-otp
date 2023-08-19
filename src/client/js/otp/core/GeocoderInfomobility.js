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


otp.namespace("otp.core");

otp.core.GeocoderInfomobility = otp.Class({

    url : null,
    addressParam : null,

    initialize : function(url, addressParam) {
        this.url = url;
        this.addressParam = addressParam;
    },

    geocode : function(address, setResultsCallback) {

        var params = {
            "format": "json",
            "addressdetails": 1,
            "limit": 10,
            "viewbox": "13.20900,42.46804,13.59901,42.21428",
            "bounded": 1,
            "accept-language": "it",
            "countrycodes": "it",
            "q": address,
        };
        //params[this.addressParam] = address;

        // Avoid out-of-order responses from the geocoding service. see #1419
        lastXhr = $.ajax(this.url, {
            data : params,
            type: "get",
            success: function(data, status, xhr) {
                if (xhr === lastXhr){
                    if((typeof data) == "string") data = JSON.parse(data);
                    var results = [];
                    data.forEach(function (item) {
                        //debugger;

                        //var resultObj = $(this);

                        var resultObj = {
                            description : item.display_name,
                            lat : item.lat,
                            lng : item.lon
                        };
                        //console.log(resultObj)
                        results.push(resultObj);
                    });

                    setResultsCallback.call(this, results);
                }
            },
            error: function (err) {
                console.log(err)

            }
        });
    }

});
