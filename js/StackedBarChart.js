am4core.ready(function() {

    // Themes begin
   // am4core.useTheme(am4themes_moonrisekingdom);
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("bar-chartdiv", am4charts.XYChart);
    
    // Add data
    chart.data = [{
      "week": 1,
      "confirmed": 65,
      "active": 38,
      "deaths":4,
      "recovered":6
    }, {
        "week": 2,
        "confirmed": 472,
        "active": 269,
        "deaths":40,
      "recovered":60
    }, {
        "week": 3,
        "confirmed": 1123,
        "active": 822,
        "deaths":90,
      "recovered":145
    }, {
        "week": 4,
        "confirmed": 4500,
        "active": 3213,
        "deaths":123,
        "recovered":600
    }, {
        "week": 5,
        "confirmed": 12365,
        "active": 8547,
        "deaths":400,
      "recovered":900
    }, {
        "week": 6,
        "confirmed": 33871,
        "active": 27651,
        "deaths":5780,
      "recovered":2300
    }, {
        "week": 7,
        "confirmed": 64892,
        "active": 53119,
        "deaths":4000,
      "recovered":9000 
    }
    ];
    
    // Create axes
    
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "week";
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.renderer.minGridDistance = 10;
    
    
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    
    var series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.dataFields.valueY = "active";
    series1.dataFields.categoryX = "week";
    series1.sequencedInterpolation = true;
      
    // Make it stacked
    series1.stacked = true;

    series1.name = "Active";
    series1.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series1.columns.template.fillOpacity = .8;       //this two lines are responsible for showing data onmouseOver

    
    var columnTemplate1 = series1.columns.template;
    columnTemplate1.strokeWidth = 2;
    columnTemplate1.strokeOpacity = 1;
	
    
    // Create series
    var series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.dataFields.valueY = "confirmed";
    series2.dataFields.categoryX = "week";

    series2.sequencedInterpolation = true;
      
    // Make it stacked
    series2.stacked = true;

    series2.name = "Confirmed";
    series2.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series2.columns.template.fillOpacity = .8;       //this two lines are responsible for showing data onmouseOver

  
    
    var columnTemplate2 = series2.columns.template;
    columnTemplate2.strokeWidth = 2;
    columnTemplate2.strokeOpacity = 1;


    var series3 = chart.series.push(new am4charts.ColumnSeries());
    series3.dataFields.valueY = "deaths";
    series3.dataFields.categoryX = "week";

    series3.sequencedInterpolation = true;
      
    // Make it stacked
    series3.stacked = true;

    series3.name = "deaths";
    series3.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series3.columns.template.fillOpacity = .8;       //this two lines are responsible for showing data onmouseOver

  
    
    var columnTemplate3 = series3.columns.template;
    columnTemplate3.strokeWidth = 2;
    columnTemplate3.strokeOpacity = 1;


    var series4 = chart.series.push(new am4charts.ColumnSeries());
    series4.dataFields.valueY = "recovered";
    series4.dataFields.categoryX = "week";

    series4.sequencedInterpolation = true;
      
    // Make it stacked
    series4.stacked = true;

    series4.name = "recovered";
    series4.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series4.columns.template.fillOpacity = .8;       //this two lines are responsible for showing data onmouseOver

  
    
    var columnTemplate4 = series4.columns.template;
    columnTemplate4.strokeWidth = 2;
    columnTemplate4.strokeOpacity = 1;




    // Legend
    chart.legend = new am4charts.Legend();
    
    }); // end am4core.ready()