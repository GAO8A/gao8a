var width = 1000,
    height = 1000;

var dip_angle = 45,
    dip_extent = dip_angle - 1,
    dip_direction = 0;

var btnPlot = document.getElementById("btn_plot");

var projection = d3.geoAzimuthalEqualArea()
    .scale(200)
    .translate([0,0])
    .precision(.1);

var path = d3.geoPath()
    .projection(projection);

var graticule = d3.geoGraticule()
    .extent([[-90,-90],[90.1,90]])
    .step([2,2]) //.1 to force 90E line draw
    .precision([1]);

var graticuleTenDeg = d3.geoGraticule()
            .extent([[-90,-90],[90.1,90]])
            .step([10,10])
            .precision([1]); ;


var graticuleInput = d3.geoGraticule()
        .extent([[90-dip_angle,-90],[90-dip_extent,90]])
        .step([1])
        .precision([1]);


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

    //2 deg graticule grid
    svg.append("path")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("transform", "translate(" + width/3  + "," + height/3 + ")")
        .attr("d", path);

    //10 deg graticules
    svg.append("path")
              .datum(graticuleTenDeg)
              .attr("class", "graticule_10_deg")
              .attr("d", path)
              .attr("transform", "translate(" + width/3  + "," + height/3 + ")");

function render(){
// input plane
  svg.append("path")
            .datum(graticuleInput)
            .attr("class", "graticule_input_plane")
            .attr("transform", "translate(" + width/3  + "," + height/3 + ") rotate("+dip_direction +")")
            .attr("d", path);


  d3.select(self.frameElement).style("height", height + "px");

}

render();

///

btnPlot.addEventListener('click', function() {
    dip_angle =  Number(document.getElementById('dip_ang').value);
    dip_extent = Number(dip_angle - 1),
    dip_direction = Number(document.getElementById('dip_dir').value)-90;
    plot(dip_direction,dip_angle,dip_extent);
  });

function plot(dir,ang,extent){
 //console.log(dir,extent,ang);
 render();
}
