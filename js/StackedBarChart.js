am4core.ready(function() {

  
    
  const dataBody=document.querySelector("#datatable > tbody");
    var arrayWorld=[];
    var arrayIndia=[];

    function getData(dt){
       dt.toString();
       const request=new XMLHttpRequest();

       request.open("GET","/nssac-ncov-data-country-state/nssac-ncov-sd-" + dt + ".csv",false);
       request.onreadystatechange=function (){
        if(request.readyState===4 && (request.status ===200 || request.status==0)){
           processData(request.responseText,dt); }
       };
       request.send(null);
   }
   function processData(csv,dt) {
       
   var lines=csv.split("\n");

   var result = [];

   var headers=lines[0].split(",");

   for(var i=1;i<lines.length;i++){

       var obj = {};
       var currentline=lines[i].split(",");

       for(var j=0;j<headers.length;j++){
           obj[headers[j]] = currentline[j];
       }

       result.push(obj);

    }
    
   //return result; //JavaScript object
   //json= JSON.stringify(result); //JSON

        
       var obj1={};
       confirmedTotal=0;
       deathsTotal=0;
       recoveredTotal=0;
       for( i=0;i<result.length-1;i++)
       {   var cT=parseInt(result[i].Confirmed);
           var dT=parseInt(result[i].Deaths);
           var rT=parseInt(result[i].Recovered);
           confirmedTotal=confirmedTotal+cT;
           deathsTotal=deathsTotal+dT;
           recoveredTotal=recoveredTotal+rT;
        if(result[i].Region=="India")
        {
           arrayIndia.push({
            "date":dt,
            "confirmed":cT,
            "active":cT-(dT+rT),
            "deaths":dT,
            "recovered":rT
           });
        }
       }
      var activeTotal=confirmedTotal-(deathsTotal+recoveredTotal);
   
       obj1.date=dt;
       obj1.confirmed=confirmedTotal;
       obj1.active=activeTotal;
       obj1.deaths=deathsTotal;
       obj1.recovered=recoveredTotal;

       //var Json=JSON.stringify(obj);
       arrayWorld.push({
         "date":dt,
         "confirmed":confirmedTotal,
         "active":activeTotal,
         "deaths":deathsTotal,
         "recovered":recoveredTotal
       });
       
       const tr=document.createElement("tr");
        for(let values in obj1)
        {
            const td=document.createElement("td");
            td.textContent=obj1[values];
            tr.appendChild(td);
        }         
        dataBody.appendChild(tr);

   }
   
   console.log(arrayWorld);
   console.log(arrayIndia);

var dates = [];
   var last_x_days = 60;// number of days
   var date1 = new Date("01-21-2020");
   var date2 = new Date("06-01-2020");
   var Difference_In_Time = date2.getTime() - date1.getTime();
   var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
   for (var i = 1; i <= Difference_In_Days; i++) {
       dates.unshift((date2.getMonth() + 1).toString().padStart(2, "0") + "-" + date2.getDate().toString().padStart(2, "0") + "-" + date2.getFullYear());
       date2.setDate(date2.getDate() - 1);
   }
   for (var dt of dates) {
       getData(dt);
   }
   //console.log(dates);


     // Themes begin
   // am4core.useTheme(am4themes_moonrisekingdom);
   am4core.useTheme(am4themes_dataviz);
   am4core.useTheme(am4themes_animated);
   // Themes end
   
   // Create chart instance
   var chart = am4core.create("bar-chartdiv", am4charts.XYChart);
  
   // Add data
   chart.data=arrayWorld;

   $(function() {
    $('#worldToggle').change(function() {
        if($('#worldToggle')==true)
        {console.log("hsjjddk");
            chart.data=arrayWorld;
        }
        else
        {chart.data=arrayIndia;}
    })
  })
   
   


    // Create axes
    
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "date";
   // categoryAxis.renderer.grid.template.location = 0.5;
    //categoryAxis.renderer.minGridDistance = 10;

    categoryAxis.title.text = "Date";
    categoryAxis.groupData = true;
    categoryAxis.groupCount = 50;

    // dateAxis.renderer.minGridDistance = 30;
    // dateAxis.periodChangeDateFormats.setKey("month", "[bold]yyyy");
    categoryAxis.renderer.labels.template.rotation = 270;

    categoryAxis.renderer.grid.template.opacity = 0;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.line.strokeOpacity = 1;
    categoryAxis.renderer.line.strokeWidth = 2;
    categoryAxis.renderer.line.stroke = am4core.color("#3787ac");
    categoryAxis.title.fontWeight = "bold";

    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());


    chart.scrollbarX = new am4core.Scrollbar();
    chart.events.on("ready", function (ev) {
        valueAxis.min = valueAxis.minZoomed;
        valueAxis.max = valueAxis.maxZoomed;
    });

    
    chart.scrollbarY = new am4core.Scrollbar();
    chart.events.on("ready", function (ev) {
        valueAxis.min = valueAxis.minZoomed;
        valueAxis.max = valueAxis.maxZoomed;
    });
    
    var series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.dataFields.valueY = "active";
    series1.dataFields.categoryX = "date";
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
    series2.dataFields.categoryX = "date";

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
    series3.dataFields.categoryX = "date";

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
    series4.dataFields.categoryX = "date";

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