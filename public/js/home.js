////////////Panels voor collapsable content

function setUpPanels() {
    var panels = document.getElementsByClassName("panel");

    for (i = 0; i < panels.length; i++) {

        var div = document.createElement("div");
        div.className = "panelbutton-div";

        var a = document.createElement("a");
        a.className = "panelbutton";
        a.textContent = "Meer";

        div.appendChild(a);
        panels[i].appendChild(div);
    }

    var buttons = document.getElementsByClassName("panelbutton");

    while (panels.length > 0) {

        i = panels.length - 1;
        var panel = panels[i];
        panel.className = "panelcollapsed"; //hierdoor verdwijnt dit panel uit de variabele panels
        /*console.log(panels);*/

        var button = buttons[i];
        button.style.display = "inline-block";
        button.onclick = togglePanel;
    }

    function togglePanel() {

        var panel = this.parentNode.parentNode;
        var collapsed = panel.className == "panelcollapsed";

        if (panel.className == "panelcollapsed") {
            panel.className = "panel";
            this.textContent = "";
            this.className = "panelbutton icon ion-ios-arrow-up";
        } else {
            panel.className = "panelcollapsed";
            this.textContent = "Meer";
            this.className = "panelbutton";
        }

        animateTogglePanel(panel, collapsed);
    }

}

var PANEL_ANIMATION_DELAY = 15; /*ms*/
var PANEL_ANIMATION_STEPS = 10;

function animateTogglePanel(panel, expanding) {

    var panelcontent = panel.getElementsByClassName("panelcontent")[0];

    panelcontent.style.display = "block";
    var contentHeight = panelcontent.offsetHeight;

    if (expanding)
        panelcontent.style.height = "0px";

    var stepHeight = contentHeight / PANEL_ANIMATION_STEPS;
    var direction = (!expanding ? -1 : 1);

    setTimeout(function() {
        animateStep(panelcontent, 1, stepHeight, direction);
    }, PANEL_ANIMATION_DELAY);
}

function animateStep(panelcontent, iteration, stepHeight, direction) {

    if (iteration < PANEL_ANIMATION_STEPS) {
        panelcontent.style.height = Math.round(((direction > 0) ? iteration : PANEL_ANIMATION_STEPS - iteration) * stepHeight) + "px";
        iteration++;
        setTimeout(function() {
            animateStep(panelcontent, iteration, stepHeight, direction);
        }, PANEL_ANIMATION_DELAY);
    } else {
        panelcontent.parentNode.className = (direction < 0) ? "panelcollapsed" : "panel";
        panelcontent.style.display = panelcontent.style.height = "";
    }
}

//////////// Kaart Wageningen
function draw_map() {
    "use strict";

    // Projectie Amersfoort RD new (met proj4js-compressed.js en proj4leaflet.js)
    var RD = new L.Proj.CRS.TMS(
        "EPSG:28992",
        "+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs", [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999], {
            resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420]
        }
    );

    // Maak de kaart
    var map = new L.Map("kaartcontainer", {
        continuousWorld: true,
        crs: RD,
        layers: [new L.TileLayer("https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaart/EPSG:3857/{z}/{x}/{y}.png", {
            minZoom: 2,
            maxZoom: 13,
            continuousWorld: true
        })],
        center: new L.LatLng(51.9615616,5.6517542),
        zoom: 9
    });

    // Startpositie-button in kaart
    var NewButton = L.Control.extend({
        options: {
            position: "bottomleft"
        },
        onAdd: function() {
            // create the control container with a particular class name
            var container = L.DomUtil.create("div", "button-startpositie"),
                // ... initialize other DOM elements, add listeners, etc.
                a = container.appendChild(document.createElement("a"));

            /*a.setAttribute("href", "#");*/
            a.innerHTML = "Kaart terug naar startpositie";
            return container;
        }
    });

    //Startpositie-button in kaart    
    map.addControl(new NewButton());

    // Verwijder Leaflet attributie
    map.attributionControl.setPrefix("");

    //Functie om kaart en startpositie-button terug te zetten in startpositie
    function toStartPosition() {
        var startButton = document.getElementsByClassName("button-startpositie")[0];
        map.setView([51.9615616,5.6517542], 5);
        L.DomUtil.addClass(startButton, "disabled");
        startButton.removeEventListener("click", toStartPosition);
        map.addEventListener("drag zoomstart", function() {
            L.DomUtil.removeClass(startButton, "disabled");
            startButton.addEventListener("click", toStartPosition);
        });
    }

    toStartPosition();

    L.marker([51.9615616,5.6517542]).addTo(map)
    .bindPopup('Zodra<br>Nude 60<br>6702DN Wageningen')
    .on("click", zoom_to_office);

    function zoom_to_office() {
        map.setView([51.9615616,5.6517542], 10);
    }

} // Einde draw_map()

/////////// Register setUpPanels to be executed on load
if (window.addEventListener) {
    // the "proper" way
    window.addEventListener("load", startfuncs, false);
} else
if (window.attachEvent) {
    // the IE way
    window.attachEvent("onload", startfuncs);
}

function startfuncs() {
    setUpPanels();
    draw_map();
}

/*var addEvent = function(object, type, callback) {
    if (object === null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};

addEvent(window, "resize", FUNCTIE_HIER);*/