////////////Panels for collapsable content

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
        panel.className = "panelcollapsed"; // by setting this a classname, the panel no longer has the 'panel' class
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

//////////// Map
function draw_map() {

    let map = L.map('kaartcontainer').setView(new L.LatLng(51.96152, 5.65208), 10);
    let mylayer = L.nlmapsBgLayer('standaard').addTo(map);

    L.marker([51.96152, 5.65208]).addTo(map)
        .bindPopup('Zodra<br>Nude 60<br>6702DN Wageningen');

    // Startposition-button 
    var NewButton = L.Control.extend({
        options: {
            position: "bottomleft"
        },
        onAdd: function() {
            // create the control container with a particular class name
            var container = L.DomUtil.create("div", "button-startpositie disabled"),
                // ... initialize other DOM elements, add listeners, etc.
                a = container.appendChild(document.createElement("a"));
            a.innerHTML = "Kaart terug naar startpositie";
            return container;
        }
    });  
    map.addControl(new NewButton());
    var startButton = document.getElementsByClassName("button-startpositie")[0];
    map.addEventListener("drag zoomstart", function() {
        L.DomUtil.removeClass(startButton, "disabled");
        startButton.addEventListener("click", toStartPosition);
    });
    function toStartPosition() {
        map.setView([51.96152, 5.65208], 10);
        L.DomUtil.addClass(startButton, "disabled");
        startButton.removeEventListener("click", toStartPosition);
    }

    // Remove attribution
    map.attributionControl.remove();

}

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
