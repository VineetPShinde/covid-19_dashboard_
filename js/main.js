am4core.ready(function () {
  // Themes begin
  am4core.useTheme(am4themes_dataviz);
  // Themes end

  var continents = {
    AF: 0,
    AN: 1,
    AS: 2,
    EU: 3,
    NA: 4,
    OC: 5,
    SA: 6,
  };

  // Create map instance
  var chart = am4core.create("chartdiv", am4maps.MapChart);
  chart.projection = new am4maps.projections.Miller();

  // Create map polygon series for world map
  var worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
  worldSeries.useGeodata = true;
  worldSeries.geodata = am4geodata_worldLow;
  worldSeries.exclude = ["AQ"];

  var worldPolygon = worldSeries.mapPolygons.template;
  worldPolygon.tooltipText = "{name}";
  worldPolygon.nonScalingStroke = true;
  worldPolygon.strokeOpacity = 0.5;
  worldPolygon.fill = am4core.color("#eee");
  worldPolygon.propertyFields.fill = "color";

  worldSeries.heatRules.push({
    property: "fill",
    target: worldSeries.mapPolygons.template,
    min: am4core.color("#ffffff"),
    max: am4core.color("#AAAA00"),
  });

  var hs = worldPolygon.states.create("hover");
  hs.properties.fill = chart.colors.getIndex(9);

  // Create country specific series (but hide it for now)
  var countrySeries = chart.series.push(new am4maps.MapPolygonSeries());
  countrySeries.useGeodata = true;
  countrySeries.hide();
  countrySeries.geodataSource.events.on("done", function (ev) {
    worldSeries.hide();
    countrySeries.show();
  });

  var countryPolygon = countrySeries.mapPolygons.template;
  countryPolygon.tooltipText = "{name}";
  countryPolygon.nonScalingStroke = true;
  countryPolygon.strokeOpacity = 0.5;
  countryPolygon.fill = am4core.color("#eee");

  var hs = countryPolygon.states.create("hover");
  hs.properties.fill = chart.colors.getIndex(9);

  // Set up click events
  worldPolygon.events.on("hit", function (ev) {
    ev.target.series.chart.zoomToMapObject(ev.target);
    var map = ev.target.dataItem.dataContext.map;
    if (map) {
      ev.target.isHover = false;
      countrySeries.geodataSource.url =
        "https://www.amcharts.com/lib/4/geodata/json/" + map + ".json";
      countrySeries.geodataSource.load();
    }
  });

  // Set up data for countries
  var data = [];
  for (var id in am4geodata_data_countries2) {
    if (am4geodata_data_countries2.hasOwnProperty(id)) {
      var country = am4geodata_data_countries2[id];
      if (country.maps.length) {
        data.push({
          id: id,
          color: chart.colors.getIndex(continents[country.continent_code]),
          map: country.maps[0],
        });
      }
    }
  }
  worldSeries.data = data;

  // Zoom control
  chart.zoomControl = new am4maps.ZoomControl();

  var homeButton = new am4core.Button();
  homeButton.events.on("hit", function () {
    worldSeries.show();
    countrySeries.hide();
    chart.goHome();
  });

  homeButton.icon = new am4core.Sprite();
  homeButton.padding(7, 5, 7, 5);
  homeButton.width = 30;
  homeButton.icon.path =
    "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
  homeButton.marginBottom = 10;
  homeButton.parent = chart.zoomControl;
  homeButton.insertBefore(chart.zoomControl.plusButton);

  //custom buttons

  var rect = chart.chartContainer.createChild(am4core.Rectangle);
  rect.width = 750;
  rect.height = 50;
  rect.fill = am4core.color("white");
  rect.align = "center";
  

  var slider = chart.chartContainer.createChild(am4core.Slider);
  slider.background.fill = am4core.color("black");
  slider.background.fillOpacity = 0.4;
  slider.valign = "top";
  slider.marginTop = 20;
  slider.width = 400;
  slider.align = "right";
  slider.marginRight = 50;
  // var sliderText = slider.createChild(am4core.Label);
  // sliderText.text = "Timeline :"
  // sliderText.margin = 20

  var AF = chart.chartContainer.createChild(am4core.Button);
  AF.label.text = "AF";
  AF.padding(7, 5, 7, 5);
  AF.width = 30;
  AF.align = "left";
  AF.marginLeft = 10;
  AF.background.fill = am4core.color("white");
  AF.background.fillOpacity = 0.4;
  AF.valign = "top";
  AF.marginTop = 70;

  var AS = chart.chartContainer.createChild(am4core.Button);
  AS.label.text = "AS";
  AS.padding(7, 5, 7, 5);
  AS.width = 30;
  AS.align = "left";
  AS.marginLeft = 45;
  AS.background.fill = am4core.color("white");
  AS.background.fillOpacity = 0.4;
  AS.valign = "top";
  AS.marginTop = 70;

  var EU = chart.chartContainer.createChild(am4core.Button);
  EU.label.text = "EU";
  EU.padding(7, 5, 7, 5);
  EU.width = 30;
  EU.align = "left";
  EU.marginLeft = 80;
  EU.background.fill = am4core.color("white");
  EU.background.fillOpacity = 0.4;
  EU.valign = "top";
  EU.marginTop = 70;

  var NA = chart.chartContainer.createChild(am4core.Button);
  NA.label.text = "NA";
  NA.padding(7, 5, 7, 5);
  NA.width = 30;
  NA.align = "left";
  NA.marginLeft = 115;
  NA.background.fill = am4core.color("white");
  NA.background.fillOpacity = 0.4;
  NA.valign = "top";
  NA.marginTop = 70;

  var OC = chart.chartContainer.createChild(am4core.Button);
  OC.label.text = "OC";
  OC.padding(7, 5, 7, 5);
  OC.width = 30;
  OC.align = "left";
  OC.marginLeft = 150;
  OC.background.fill = am4core.color("white");
  OC.background.fillOpacity = 0.4;
  OC.valign = "top";
  OC.marginTop = 70;

  var SA = chart.chartContainer.createChild(am4core.Button);
  SA.label.text = "SA";
  SA.padding(7, 5, 7, 5);
  SA.width = 30;
  SA.align = "left";
  SA.marginLeft = 185;
  SA.background.fill = am4core.color("white");
  SA.background.fillOpacity = 0.4;
  SA.valign = "top";
  SA.marginTop = 70;

  var AW = chart.chartContainer.createChild(am4core.Button);
  AW.label.text = "All World";
  AW.padding(7, 5, 7, 5);
  AW.width = 80;
  AW.align = "left";
  AW.marginLeft = 220;
  AW.background.fill = am4core.color("white");
  AW.background.fillOpacity = 0.4;
  AW.valign = "top";
  AW.marginTop = 70;

  var legend = new am4charts.Legend();
  legend.parent = chart.chartContainer;
  legend.data = [
    {
      name: "1-9",
      fill: am4core.color("#0f0"),
    },
    {
      name: "10-99",
      fill: am4core.color("#ff0"),
    },
    {
      name: "100-999",
      fill: am4core.color("#f00"),
    },
    {
      name: "1000-9999",
      fill: am4core.color("#f00"),
    },
    {
      name: "10,000-99,999",
      fill: am4core.color("#f00"),
    },
    {
      name: "100,000-499,999",
      fill: am4core.color("#f00"),
    },
    {
      name: "500,000+",
      fill: am4core.color("#f00"),
    },
  ];

  legend.width = 175;
  legend.align = "left";
  legend.valign = "bottom";
  legend.background.fill = am4core.color("#000");
  legend.background.fillOpacity = 0.05;
  legend.fontSize = 10;
  var legendTitle = legend.createChild(am4core.Label);
  legendTitle.text = "Active";
  legendTitle.fontSize = 15;

  legendTitle.fill = am4core.color("#fe8a00")
});
