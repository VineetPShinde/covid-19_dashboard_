am4core.ready(function() {
    
    // Themes begin
    am4core.useTheme(am4themes_moonrisekingdom);
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    var chart = am4core.create("bar-chartdiv", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    
    chart.data = [
      {
        category: "15 apr 2020",
        value1: 1,
        value2: 5,
        value3: 3,
        value4: 3
      },
      {
        category: "16 apr 2020",
        value1: 2,
        value2: 5,
        value3: 3,
        value4: 3
      },
      {
        category: "17 apr 2020",
        value1: 3,
        value2: 5,
        value3: 4,
        value4: 3
      },
      {
        category: "18 apr 2020",
        value1: 4,
        value2: 5,
        value3: 6,
        value4: 3
      },
      {
        category: "19 apr 2020",
        value1: 3,
        value2: 5,
        value3: 4,
        value4: 3
      },
      {
        category: "20 apr 2020",
        value1: 20,
        value2: 13,
        value3: 1,
        value4: 3
      },
      {
        category: "21 apr 2020",
        value1: 2,
        value2: 14,
        value3: 12,
        value4: 3
      },
      {
        category: "22 apr 2020",
        value1: 2,
        value2: 13,
        value3: 13,
        value4: 3
      },
      {
        category: "23 apr 2020",
        value1: 2,
        value2: 4,
        value3: 10,
        value4: 3
      },{
        category: "24 apr 2020",
        value1: 2,
        value2: 1,
        value3: 12,
        value4: 3
      },
      {
      category: "25 apr 2020",
        value1: 1,
        value2: 5,
        value3: 3,
        value4: 3
      },
      {
        category: "26 apr 2020",
        value1: 2,
        value2: 5,
        value3: 3,
        value4: 3
      },
      {
        category: "27 apr 2020",
        value1: 3,
        value2: 5,
        value3: 4,
        value4: 3
      },
      {
        category: "28 apr 2020",
        value1: 4,
        value2: 5,
        value3: 6,
        value4: 3
      },
      {
        category: "29 apr 2020",
        value1: 3,
        value2: 5,
        value3: 4,
        value4: 3
      },
      {
        category: "30 apr 2020",
        value1: 20,
        value2: 13,
        value3: 1,
        value4: 3
      },
      {
        category: "1 may 2020",
        value1: 2,
        value2: 14,
        value3: 12,
        value4: 3
      },
      {
        category: "2 may 2020",
        value1: 2,
        value2: 13,
        value3: 13,
        value4: 3
      },
      {
        category: "3 may 2020",
        value1: 2,
        value2: 4,
        value3: 10,
        value4: 3
      },{
        category: "4 may 2020",
        value1: 2,
        value2: 1,
        value3: 12,
        value4: 3
      },
      {
      category: "5 may 2020",
        value1: 1,
        value2: 5,
        value3: 3,
        value4: 3
      },
      {
        category: "6 may 2020",
        value1: 2,
        value2: 5,
        value3: 3,
        value4: 3
      },
      {
        category: "7 may 2020",
        value1: 3,
        value2: 5,
        value3: 4,
        value4: 3
      },
      {
        category: "8 may 2020",
        value1: 4,
        value2: 5,
        value3: 6,
        value4: 3
      },
      {
        category: "9 may 2020",
        value1: 3,
        value2: 5,
        value3: 4,
        value4: 3
      },
      {
        category: "10 may 2020",
        value1: 20,
        value2: 13,
        value3: 1,
        value4: 3
      },
      {
        category: "11 may 2020",
        value1: 2,
        value2: 14,
        value3: 12,
        value4: 3
      },
      {
        category: "12 may 2020",
        value1: 2,
        value2: 13,
        value3: 13,
        value4: 3
      },
      {
        category: "13 may 2020",
        value1: 2,
        value2: 4,
        value3: 10,
        value4: 3
      },{
        category: "14 may 2020",
        value1: 2,
        value2: 1,
        value3: 12,
        value4: 3
      }
    ];
    
    chart.colors.step = 2;
    chart.padding(30, 30, 10, 30);
    chart.legend = new am4charts.Legend();
    
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;
    valueAxis.calculateTotals = true;
    valueAxis.renderer.minWidth = 50;
    
    
    var series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText =
      "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series1.name = "Active";
    series1.dataFields.categoryX = "category";
    series1.dataFields.valueY = "value1";
    series1.dataFields.valueYShow = "totalPercent";
    series1.dataItems.template.locations.categoryX = 0.5;
    series1.stacked = true;
    series1.tooltip.pointerOrientation = "vertical";
    
    var bullet1 = series1.bullets.push(new am4charts.LabelBullet());
    bullet1.interactionsEnabled = false;
    bullet1.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet1.label.fill = am4core.color("#ffffff");
    bullet1.locationY = 0.5;
    
    var series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.columns.template.width = am4core.percent(80);
    series2.columns.template.tooltipText =
      "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series2.name = "Confirmed";
    series2.dataFields.categoryX = "category";
    series2.dataFields.valueY = "value2";
    series2.dataFields.valueYShow = "totalPercent";
    series2.dataItems.template.locations.categoryX = 0.5;
    series2.stacked = true;
    series2.tooltip.pointerOrientation = "vertical";
    
    var bullet2 = series2.bullets.push(new am4charts.LabelBullet());
    bullet2.interactionsEnabled = false;
    bullet2.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet2.locationY = 0.5;
    bullet2.label.fill = am4core.color("#ffffff");
    
    var series3 = chart.series.push(new am4charts.ColumnSeries());
    series3.columns.template.width = am4core.percent(80);
    series3.columns.template.tooltipText =
      "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series3.name = "Deaths";
    series3.dataFields.categoryX = "category";
    series3.dataFields.valueY = "value3";
    series3.dataFields.valueYShow = "totalPercent";
    series3.dataItems.template.locations.categoryX = 0.5;
    series3.stacked = true;
    series3.tooltip.pointerOrientation = "vertical";
    
    var bullet3 = series3.bullets.push(new am4charts.LabelBullet());
    bullet3.interactionsEnabled = false;
    bullet3.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet3.locationY = 0.5;
    bullet3.label.fill = am4core.color("#ffffff");

    var series4 = chart.series.push(new am4charts.ColumnSeries());
    series4.columns.template.width = am4core.percent(80);
    series4.columns.template.tooltipText =
      "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series4.name = "Recovered";
    series4.dataFields.categoryX = "category";
    series4.dataFields.valueY = "value4";
    series4.dataFields.valueYShow = "totalPercent";
    series4.dataItems.template.locations.categoryX = 0.5;
    series4.stacked = true;
    series4.tooltip.pointerOrientation = "vertical";
    
    var bullet4 = series4.bullets.push(new am4charts.LabelBullet());
    bullet4.interactionsEnabled = false;
    bullet4.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet4.locationY = 0.5;
    bullet4.label.fill = am4core.color("#ffffff");
    
    chart.scrollbarX = new am4core.Scrollbar();
    
    });