
'use strict';


// what does the annotation metadata look like

//var annotation = {
//    _id : mongo id,
//    user_id : user mongo_id,
//    image_record_id : image record_id,
//    startTime : -1,
//    submitTime : -1,
//    steps : [
//        0 : {
//            features : []
//            selection : []
//            startTime :
//            fieldOfView:
//            endTime :
//        }
//    ]
//}


//var feature = {
//   all the normal geojson
//   classification -> text
//   labelindex -> (optional, needed for paint by number)
//   rgbcolor -> fill color
//   hexcolor -> boundary color
//   source -> magicwand etc
//}



// putting the utilities in the main file
var colorNameToHex = function(colour)
{
    var colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo ":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"};

    if (typeof colours[colour.toLowerCase()] != 'undefined')
        return colours[colour.toLowerCase()];

    return false;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

var _labels = [
    { name: 'background', color: [255, 255, 255]},
    { name: 'foreground', color: [255, 255, 255]},
    { name: '10', color: [251, 0, 13], icon: "static/rev3/4/1.jpg", title: 'Lines' },
    { name: '20', color: [251, 1, 13], icon: "static/rev3/4/1/1.jpg", title: 'Lines: Reticular' },
    { name: '21', color: [251, 2, 13], icon: "static/rev3/4/1/1/1.jpg", title: 'Lines: Reticular: Regular' },
    { name: '22', color: [251, 3, 13], icon: "static/rev3/4/1/1/2.jpg", title: 'Lines: Reticular: Thick' },
    { name: '23', color: [251, 4, 13], icon: "static/rev3/4/1/1/3.jpg", title: 'Lines: Reticular: Thin' },
    { name: '24', color: [251, 5, 13], icon: "static/rev3/4/1/1/4.jpg", title: 'Lines: Reticular: Atypical' },
    { name: '25', color: [251, 6, 13], icon: "static/rev3/4/1/1/5.jpg", title: 'Lines: Reticular: Negative Network' },
    { name: '30', color: [251, 7, 13], icon: "static/rev3/4/1/2.jpg", title: 'Lines: Radial' },
    { name: '31', color: [251, 8, 13], icon: "static/rev3/4/1/2/1.jpg", title: 'Lines: Radial: Radial lines connected to a common base' },
    { name: '32', color: [251, 9, 13], icon: "static/rev3/4/1/2/2.jpg", title: 'Lines: Radial: Radial lines converging to a central dot' },
    { name: '33', color: [251, 10, 13], icon: "static/rev3/4/1/2/3.jpg", title: 'Lines: Radial: Radial lines, peripheral' },
    { name: '40', color: [251, 11, 13], icon: "static/rev3/4/1/3.jpg", title: 'Lines: Branched' },
    { name: '50', color: [251, 12, 13], icon: "static/rev3/4/1/4.jpg", title: 'Lines: Parallel and straight' },
    { name: '51', color: [251, 13, 13], icon: "static/rev3/4/1/4/1.jpg", title: 'Lines: Parallel and straight: Furrows' },
    { name: '52', color: [251, 14, 13], icon: "static/rev3/4/1/4/2.jpg", title: 'Lines: Parallel and straight: Ridges' },
    { name: '53', color: [251, 15, 13], icon: "static/rev3/4/1/4/3.jpg", title: 'Lines: Parallel and straight: Fibrallar' },
    { name: '60', color: [251, 16, 13], icon: "static/rev3/4/1/5.jpg", title: 'Lines: Curved' },
    { name: '61', color: [251, 17, 13], icon: "static/rev3/4/1/5/1.jpg", title: 'Lines: Curved: Thick' },
    { name: '62', color: [251, 18, 13], icon: "static/rev3/4/1/5/2.jpg", title: 'Lines: Curved: Thin' },
    { name: '41', color: [251, 19, 13], icon: "static/rev3/4/1/6.jpg", title: 'Lines: Zig Zag' },
    { name: '70', color: [236, 252, 0], icon: "static/rev3/4/2.jpg", title: 'Dots & Clods' },
    { name: '71', color: [236, 252, 1], icon: "static/rev3/4/2/1.jpg", title: 'Dots & Clods: Dots' },
    { name: '72', color: [236, 252, 2], icon: "static/rev3/4/2/1/1.jpg", title: 'Dots & Clods: Dots: Atypical Dots' },
    { name: '73', color: [236, 252, 3], icon: "static/rev3/4/2/1/2.jpg", title: 'Dots & Clods: Dots: Dots, Four square' },
    { name: '74', color: [236, 252, 4], icon: "static/rev3/4/2/1/3.jpg", title: 'Dots & Clods: Dots: Dots, Circle' },
    { name: '75', color: [236, 252, 5], icon: "static/rev3/4/2/1/4.jpg", title: 'Dots & Clods: Dots: Dots, Lines' },
    { name: '76', color: [236, 252, 6], icon: "static/rev3/4/2/2.jpg", title: 'Dots & Clods: Clods' },
    { name: '77', color: [236, 252, 7], icon: "static/rev3/4/2/2/1.jpg", title: 'Dots & Clods: Clods: Atypical Clods' },
    { name: '80', color: [126, 0, 169], icon: "static/rev3/4/3.jpg", title: 'Structureless' },
    { name: '81', color: [126, 1, 169], icon: "static/rev3/4/3/1.jpg", title: 'Structureless: Blue-White Veil' },
    { name: '82', color: [126, 2, 169], icon: "static/rev3/4/3/2.jpg", title: 'Structureless: Pseudonetwork' },
    { name: '83', color: [126, 3, 169], icon: "static/rev3/4/3/3.jpg", title: 'Structureless: Peripheral brown structureless area' },
    { name: '84', color: [126, 4, 169], icon: "static/rev3/4/3/4.jpg", title: 'Structureless: Off-centered blotch' },
    { name: '100', color: [20, 209, 0], icon: "static/rev3/4/4.jpg", title: 'Vessels' },
    { name: '110', color: [20, 209, 1], icon: "static/rev3/4/4/1.jpg", title: 'Vessels: Lines' },
    { name: '111', color: [20, 209, 2], icon: "static/rev3/4/4/1/1.jpg", title: 'Vessels: Lines: Straight' },
    { name: '112', color: [20, 209, 3], icon: "static/rev3/4/4/1/2.jpg", title: 'Vessels: Lines: Looped' },
    { name: '113', color: [20, 209, 4], icon: "static/rev3/4/4/1/2/1.jpg", title: 'Vessels: Lines: Looped: Looped with white Halo' },
    { name: '114', color: [20, 209, 5], icon: "static/rev3/4/4/1/3.jpg", title: 'Vessels: Lines: Curved' },
    { name: '115', color: [20, 209, 6], icon: "static/rev3/4/4/1/4.jpg", title: 'Vessels: Lines: Serpentine' },
    { name: '116', color: [20, 209, 7], icon: "static/rev3/4/4/1/5.jpg", title: 'Vessels: Lines: Helical' },
    { name: '117', color: [20, 209, 8], icon: "static/rev3/4/4/1/6.jpg", title: 'Vessels: Lines: Coiled' },
    { name: '118', color: [20, 209, 9], icon: "static/rev3/4/4/1/7.jpg", title: 'Vessels: Lines: Branched' },
    { name: '101', color: [20, 209, 10], icon: "static/rev3/4/4/2.jpg", title: 'Vessels: Dots' },
    { name: '102', color: [20, 209, 11], icon: "static/rev3/4/4/3.jpg", title: 'Vessels: Clods' },
    { name: '120', color: [20, 209, 12], icon: "static/rev3/4/4/4.jpg", title: 'Vessels: Milky-red area' },
    { name: '130', color: [20, 209, 13], icon: "static/rev3/4/4/5.jpg", title: 'Vessels: Polymorphous vessels' },
    { name: '140', color: [0, 140, 255], icon: "static/rev3/4/5.jpg", title: 'Other' },
    { name: '150', color: [1, 140, 255], icon: "static/rev3/4/5/1.jpg", title: 'Other: Shiny white lines' },
    { name: '151', color: [2, 140, 255], icon: "static/rev3/4/5/2.jpg", title: 'Other: Circles' },
    { name: '152', color: [3, 140, 255], icon: "static/rev3/4/5/3.jpg", title: 'Other: Pseudopods' },
    { name: '153', color: [4, 140, 255], icon: "static/rev3/4/5/4.jpg", title: 'Other: Sharply demarcated scalloped border' }
];





// Initialization of angular root application
var derm_app = angular.module('DermApp', ['ui.bootstrap', 'ngSanitize', 'xml']);

derm_app.value( "ol", ol );

var olViewer = derm_app.factory('olViewer', function(ol, $http, xmlParser) {

        var olViewer = function(viewer_options) {

//            console.log('Creating OLViewer with opts', viewer_options, this);

            var self = this;

            // Instance variables
            this.image_source = undefined;
            this.image_layer = undefined;

            this.map = undefined;
            this.draw_mode = undefined;

            this.last_click_location = undefined;
            this.last_job_id = undefined;
            this.fill_tolerance = 50;

            this.select_interaction = new ol.interaction.Select();
            this.selected_features = this.select_interaction.getFeatures();

//            var collection = select.getFeatures();
            this.selected_features.on('add', function(e){
                console.log('add', e)
            });
            this.selected_features.on('remove', function(e){
                console.log('remove', e)
            });

            // annotations added that need to be saved
            this.clearTemporaryAnnotations();

            // current list of features
            // annotations previously saved

            var styleFunction = (function() {

                 return function(feature, resolution) {


                      if(feature.get('hexcolor')){
                         return [new ol.style.Style({
                        stroke: new ol.style.Stroke({
                          color: feature.get('hexcolor'),
    //                      color: 'black',
                          width: 2
                        }),
                        fill: new ol.style.Fill({
                            color: feature.get('rgbcolor')
                        })
                      })]
                      }
                     else
                      {
                         return [new ol.style.Style({
                            fill: new ol.style.Fill({
                              color: 'rgba(255, 255, 255, 0.2)'
                            }),
                            stroke: new ol.style.Stroke({
                              color: '#ffcc33',
                              width: 2
                            }),
                            image: new ol.style.Circle({
                              radius: 7,
                              fill: new ol.style.Fill({
                                color: '#ffcc33'
                              })
                            })
                          })]
                      }


                  };
            })();

            this.vector_source = new ol.source.Vector();
            this.vector_layer = new ol.layer.Vector({
                source: this.vector_source,
                style: styleFunction
            })

            this.draw_interaction = new ol.interaction.Draw({
                source: this.vector_source,
                type: 'Polygon'
            })

            this.draw_interaction.on('drawend', function(e){
                // need to manually update the angular state, since they're not directly linked
                externalApply();
            });

            // initialize map (imageviewer)
            this.map = new ol.Map({
                renderer:'canvas',
                target: 'map'
            });


            
            
            // set map event handlers

            this.map.on('singleclick', function(evt) {


                var click_coords = [evt.coordinate[0], -evt.coordinate[1]];



                if (self.draw_mode == 'navigate') {

                    self.last_click_location = click_coords;

                    featuresAtPoint(pixel);


                } else if (self.draw_mode == 'pointlist') {

                    self.last_click_location = evt.coordinate;

//                    self.addPoint(evt.coordinate);

                } else if (self.draw_mode == 'autofill') {

                    self.last_click_location = click_coords;
                   	self.autofill(click_coords)

                } else if (self.draw_mode == 'lines') {

                    self.last_click_location = evt.coordinate;
                    self.addPoint(evt.coordinate);

                } 
            });

            $(this.map.getViewport()).on('mousemove', function(evt) {
              var pixel = self.map.getEventPixel(evt.originalEvent);
              self.featuresAtPoint(pixel);
            });


            // add zoom slider
//            var zoomslider = new ol.control.ZoomSlider();
//            this.map.addControl(zoomslider);
        }



        // Define the "instance" methods using the prototype
        // and standard prototypal inheritance.
        olViewer.prototype = {

            clearCurrentImage : function(){

                if(this.image_layer){
                    this.map.removeLayer(this.image_layer);
                }

            },

//            hasTemporaryAnnotations : function (){
//
//                return false;
//            },

            hasLayerAnnotations : function() {
                return this.vector_source.getFeatures().length > 0;
            },

            moveToFeature: function(feature){
                var featuresExtent = ol.extent.createEmpty();
                ol.extent.extend(featuresExtent, feature.getGeometry().getExtent());
                this.map.getView().fitExtent(featuresExtent, this.map.getSize());
            },

            featuresAtPoint: function(pixel){

//                console.log(pixel);

                  var feature = this.map.forEachFeatureAtPixel(pixel, function(feature, layer) {
                    return feature;
                  });
                  var info = document.getElementById('objectinfo');






                  if (feature) {

                    var icon = feature.get('icon');


                      if(icon){

                        info.src = icon;

                        }
                        else {
                            info.src = 'static/na.jpg'
                        }

//                      console.log(feature);
//                    info.innerHTML = feature.getId() + ': ' + feature.get('name');
//                      info.innerHTML = feature.get('title');
                  } else {

                      info.src = 'static/na.jpg'
//                    info.innerHTML = '&nbsp;';
                  }


            },


            featureListFromAnnotation : function(annotation){

            	// console.log(annotation);

                var features_list = [];

                if (annotation.polygons.length > 0) {

                    var af_feature = new ol.Feature({
                        'classification' : annotation.classification
                    });

                    af_feature.setGeometry(new ol.geom.Polygon([annotation.polygons]))
                    features_list.push(af_feature)
                }

				if (annotation.lines.length > 0) {

                    var l_feature = new ol.Feature({
                        'classification' : annotation.classification
                    });

                    l_feature.setGeometry(new ol.geom.Polygon([annotation.lines]))
                    features_list.push(l_feature)
                }

                return features_list;

            },

//            saveSelectionStack : function(selection_stack){
//
////                this.temporary_annotations.select = selection_stack;
////                this.temporary_annotations.classification = 'lesion';
////                this.saved_annotations.push(this.temporary_annotations);
////            	this.clearTemporaryAnnotations();
//            },

//            saveTemporaryAnnotations : function (classification){
//                // Moves the temporary annotation to the vector layer
////                console.log('Saving temporary annotation to SavedAnnotationList');
//
////                this.temporary_annotations.createdate = new Date().valueOf();
////                this.temporary_annotations.classification = classification
//
//                var features = this.featureListFromAnnotation(this.temporary_annotations);
//
//                for(var i=0; i<features.length;i++){
//                    this.vector_source.addFeature(features[i])
//
//                }
//
////                this.saved_annotations.push(this.temporary_annotations)
//
//				this.clearTemporaryAnnotations();
//            },

//            getSavedAnnotations : function(){
//                var s = this.vector_source.getFeatures()
//                this.vector_source.clear();
//                return s;
//            },


            getFeatures : function(){
                return this.vector_source.getFeatures();
            },

            setAnnotations : function(features){
            	if (features) {
                    this.vector_source.addFeatures(features);
            	}
            },

//            addPoint : function(click_coords){
//
//                this.temporary_annotations.lines.push(click_coords);
//                externalApply();
//            },

            clearTemporaryAnnotations : function(){

                // temporary annotations are created
				this.temporary_annotations = {
                    features : [],
	                polygons : []
	            };
            },

            clearLayerAnnotations : function(step){
                this.vector_source.clear();
            },

            acceptPainting : function(){

                var annotation = this.segmentannotator.getAnnotation();
                var extent = this.map.getView().calculateExtent(this.map.getSize());
                var tr = ol.extent.getTopRight(extent);
                var bl = ol.extent.getBottomLeft(extent);
                var segmenturl = 'segment'

                var msg = {};
                msg['image'] = annotation
                msg['extent'] = [tr, bl]

                var self = this;
                // interesting hack to get the UI to update without external scopy applys
                $http.post(segmenturl, msg).success(function(response){

                    console.log(response)

                    self.vector_source.clear();

                    var f = new ol.format.GeoJSON()

                    for(var i=0;i<response.features.length;i++){

                        var jsObject = JSON.parse(response.features[i])

                        var label = _labels[parseInt(jsObject['properties']['labelindex'])]
                        jsObject['properties']['label'] = label

                        var hexcolor = rgbToHex(label['color'][0], label['color'][1], label['color'][2])
                        var rgbcolor = 'rgba(' + label['color'][0] + ',' + label['color'][1] + ',' + label['color'][2] + ',0.0)';

                        jsObject['properties']['rgbcolor'] = rgbcolor;
                        jsObject['properties']['icon'] = label.icon;
                        jsObject['properties']['hexcolor'] = hexcolor;
                        jsObject['properties']['title'] = label.title;

                        var featobj = f.readFeature(jsObject);

                        console.log(featobj)
                        console.log(featobj.getProperties())

                        self.vector_source.addFeature(featobj)

                    }

                    $("#annotatorcontainer").hide();
//                    self.segmentannotator.container.hidden = true;

                    // manually request an updated frame async
                    self.map.render()

                });
            },



            selectAnnotationLabel : function(detailvalue){

                this.segmentannotator.setCurrentLabel(detailvalue.toString());

            },

            hidePaintLayerIfVisible : function(){

                if(this.segmentannotator){

                    $("#annotatorcontainer").hide();
                }
            },

            showPaintLayerIfVisible : function(){

                if(this.segmentannotator){

                    $("#annotatorcontainer").show();
                    this.map.render();
                    return true;
                }
                return false;
            },

            removeDrawInteraction : function(){

                if(this.draw_interaction){
                    this.map.removeInteraction(this.draw_interaction);
                }
            },

            addSelectInteraction : function(){

                if(this.select_interaction){
                    this.map.addInteraction(this.select_interaction);
                }

            },

            removeSelectInteraction : function(){

                if(this.select_interaction){
                    this.map.removeInteraction(this.select_interaction);
                }

            },


            clearPaintByNumber : function(){

                if(this.segmentannotator){

                    delete this.segmentannotator;
                    $('#annotatorcontainer').empty();
                }
            },

            startPainting : function(){

                var self = this;

                this.map.once('postcompose', function(event) {

                    var canvas = event.context.canvas;

                    if(self.segmentannotator){

                        self.showPaintLayerIfVisible()
                    }
                    else {

                        self.segmentannotator = new SLICSegmentAnnotator(canvas, {
                            regionSize: 65,
                            container: document.getElementById('annotatorcontainer'),
                            backgroundColor: [0,0,0],
                            labels: _labels,
                            onload: function() {
                                $("#annotatorcontainer").show();
                            }
//                                self.showPaintLayerIfVisible()
//                                self.segmentannotator.container.hidden = true;

//                              // initializeLegend(this);
//                              // initializeLegendAdd(this);
//                              // initializeButtons(this);
//                            }
                          });

                    }

                    self.segmentannotator.setCurrentLabel(0);

                });
            },

            setFillParameter : function(new_fill_tolerance){

                this.fill_tolerance = new_fill_tolerance;


            },

            regenerateFill : function(){

              this.autofill(this.last_click_location);

            },



            autofill : function(click_coords){

                var self = this;

                var extent = this.map.getView().calculateExtent(this.map.getSize());
                var tr = ol.extent.getTopRight(extent)
                var tl = ol.extent.getTopLeft(extent)
                var bl = ol.extent.getBottomLeft(extent)

                // think: if x is positive on left, subtract from total width
                // if x on right is greater than width, x = width

                var origin_x = 0;
                var origin_y = 0;

                var click_x_offset = 0;
                var click_y_offset = 0;

                var newWidth = this.nativeSize.w;

                if(tr[0] < this.nativeSize.w) {
                    newWidth = tr[0];
                };
                if(tl[0] > 0) {
                    newWidth -= tl[0]
                    origin_x = tl[0]
                };

                var newHeight = this.nativeSize.h;
                
                if(- bl[1] < this.nativeSize.h) {
                    newHeight = -bl[1];
                };
                if(tl[1] < 0) {
                    newHeight += tl[1]
                    origin_y = -tl[1];
                }                

                console.log(origin_x, origin_y, newWidth, newHeight);

                if (newWidth <= 0 || newHeight <= 0){
                    console.log('offscreen or invalid region')
                };

                var rel = []
                rel[0] = origin_x / this.nativeSize.w;
                rel[1] = origin_y / this.nativeSize.h;
                rel[2] = newWidth / this.nativeSize.w;
                rel[3] = newHeight / this.nativeSize.h;

                var dataurl = function(rel, width){
                    return '&WID=' + width + '&RGN=' + rel.join(',') + '&CVT=jpeg'
                }

                // var url_to_use = this.data_url + '&WID=400&RGN=0.25,0.25,0.5,0.5&CVT=jpeg'
                var url_to_use = this.data_url + dataurl(rel, 500);

                var subimage = {}
                subimage.origin = [origin_x, origin_y]
                subimage.size = [newWidth, newHeight]
                subimage.rel = rel;
                var origimage = {}
                origimage.origin = [0,0]
                origimage.size = [this.nativeSize.w, this.nativeSize.h]


                // relative click is not based on the image origin, but rather the extent origin
                var click = {}
                click.absolute = click_coords;
                click.relative = [(click_coords[0])/this.nativeSize.w, (click_coords[1])/this.nativeSize.h]


                var msg = {}
                msg.image = {}
                msg.image.region = subimage
                msg.image.base = origimage
                msg.image.url = url_to_use
                msg.tolerance = this.fill_tolerance;
                msg.click = click

                // console.log(msg);

                var segmentURL = 'fill'

                $http.post(segmentURL, msg).success(function(response){

                    self.vector_source.clear();
                    var f = new ol.format.GeoJSON()

                    for(var i=0;i<response.result.features.length;i++){

                        var jsObject = JSON.parse(response.result.features[i])

                        var featobj = f.readFeature(jsObject);

                        featobj.set('title', 'lesion boundary')
//                        featobj['properties']['name'] = 'lesion boundary'

                        self.vector_source.addFeature(featobj)

                    }


                    // manually request an updated frame async
                    self.map.render()


                });

            },

            hasJobResult : function(results){

                if(results.uuid == this.last_job_id){

                    console.log(results.result);
                }

            },

            setDrawMode : function(draw_mode) {

                this.draw_mode = draw_mode;

                console.log(this.draw_mode);

                if (draw_mode == 'navigate') {
                } else if (draw_mode == 'paintbrush') {
                } else if (draw_mode == 'autofill') {
                } else if (draw_mode == 'pointlist') {

                    this.map.addInteraction(this.draw_interaction)

                }

            },

            loadImageWithURL : function(dzi_url) {

                var self = this;
                self.segmentation_list = [];

                var base_array = dzi_url.split('DeepZoom')
                var data_array = dzi_url.split('DeepZoom')

                base_array.splice(1, 0, "Zoomify");
                data_array.splice(1, 0, 'FIF')

                var zoomify_join = base_array.join('');
                var zoomify_url =  zoomify_join.substr(0, zoomify_join.length - 4);

                var data_join = data_array.join('')
                var data_url = data_join.substr(0, data_join.length - 4);

                self.zoomify_url = zoomify_url;
                self.data_url = data_url;

                var image_properties_xml = zoomify_url + '/ImageProperties.xml'

                $http.get(image_properties_xml).then(function (hresp) {

                    /* Parse a Zoomify protocol metadata request

                    */
                    var parseMetaData = function(response){
                        // Simply split the reponse as a string
                        var tmp = response.split('"');
                        var w = parseInt(tmp[1]);
                        var h = parseInt(tmp[3]);
                        var ts = parseInt(tmp[11]);
                        // Calculate the number of resolutions - smallest fits into a tile
                        var max = (w>h)? w : h;
                        var n = 1;
                        while( max > ts ){
                          max = Math.floor( max/2 );
                          n++;
                        }
                        var result = {
                          'max_size': { w: w, h: h },
                          'tileSize': { w: ts, h: ts },
                          'num_resolutions': n
                        };
                        return result;
                    }

                    var metadata = parseMetaData(hresp.data)
                    // console.log(metadata);

                    self.imageCenter = [metadata.max_size.w / 2, - metadata.max_size.h / 2];

                    self.proj = new ol.proj.Projection({
                        code: 'ZOOMIFY',
                        units: 'pixels',
                        extent: [0, 0, metadata.max_size.w, metadata.max_size.h]
                    });

                    var crossOrigin = 'anonymous';

                    self.image_source = new ol.source.Zoomify({
                        url: zoomify_url + '/',
                        size: [metadata.max_size.w, metadata.max_size.h],
                        crossOrigin: crossOrigin,

                    });

                    self.image_layer = new ol.layer.Tile({
                       source: self.image_source,
                       preload: 1
                    })

                    self.nativeSize = metadata.max_size;

                    self.view = new ol.View2D({
                      projection: self.proj,
                      center: self.imageCenter,
                      zoom: 2,
                      maxZoom: metadata.num_resolutions 
                    })       

                    self.map.addLayer(self.image_layer);
                    self.map.addLayer(self.vector_layer);
                    self.map.setView(self.view);

                })
            }
        }

        return( olViewer );

        }
    );
    


































// Initialization of angular app controller with necessary scope variables. Inline declaration of external variables
// needed within the controller's scope. State variables (available between controllers using $rootScope). Necessary to
// put these in rootScope to handle pushed data via websocket service.
var appController = derm_app.controller('ApplicationController', ['$scope', '$rootScope', '$location', '$timeout', '$http', 'imageList', 'decisionTree', 'olViewer', 'WebSocketService',
    function ($scope, $rootScope, $location, $timeout, $http, imageList, decisionTree, olViewer, WebSocketService) {

        // global ready state variable
        $rootScope.applicationReady = false;

        $rootScope.imageviewer = undefined;

         // pull user variables (via template render) in js app...
         var current_user = $("#user_email").val();
         var current_user_id = $("#user_id").val();
         $rootScope.user_email = current_user;
         $rootScope.user_id = current_user_id;


        // initial layout    
        $("#angular_id").height(window.innerHeight);
        $("#map").height(window.innerHeight);






        $rootScope.image_list = [];
        $rootScope.image_index = undefined;

        var useRandomStart = false;
        if(useRandomStart){
            $rootScope.startingIndex =  Math.floor(175 * Math.random());
        }
        else{
            $rootScope.startingIndex = 0;    
        }
        

        $timeout(function(){
            $rootScope.ApplicationInit();
        }, 150);


        // main application, gives a bit of a delay before loading everything
        $rootScope.ApplicationInit = function() {

             $rootScope.debug  = $location.url().indexOf('debug') > -1;

             // load subject list from the query
             var shouldShuffle = false;

             imageList.fromDB(current_user, $rootScope.startingIndex, 10, shouldShuffle).then(function(d){

                $rootScope.image_list = d;

             });

             decisionTree.fromLocal().then(function(d){
                $rootScope.decision_tree = d;
             });

            $rootScope.imageviewer = new olViewer({'div' : 'annotationView'});

            $rootScope.applicationReady = true;

        };

        $rootScope.hasJobResult = function(result_contents){

            $rootScope.imageviewer.hasJobResult(result_contents)

        }


        $scope.safeApply = function( fn ) {
            var phase = this.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if(fn) { fn(); }
            } else {
                this.$apply(fn);
            }
        };


        // effectively a callback from the initial subject query
        $rootScope.$watch('image_list', function(newValue, originalValue) {
            if($rootScope.applicationReady){
                $rootScope.image_index = 0;    
            }
        });


        $rootScope.getActiveImage = function(){
            if($rootScope.applicationReady){
                return $rootScope.image_list[$rootScope.image_index];
            }
            return undefined;
        }

        $rootScope.$watch('image_index', function(newValue, originalValue) {
            if ($rootScope.applicationReady) {
                var activeImage = $rootScope.getActiveImage();
                $rootScope.imageviewer.clearCurrentImage();
                $rootScope.imageviewer.loadImageWithURL(activeImage.dzi_source);
            }
        });

}]);







var annotationTool = derm_app.controller('AnnotationTool', ['$scope', '$rootScope', '$timeout', '$sanitize', '$http', '$modal', '$log',
    function ($scope, $rootScope, $timeout, $sanitize, $http, $modal, $log) {

        console.log('Initialized annotation tool.');

        $scope.draw_mode = 'navigate';

        $scope.completedImages = 0;
        $scope.totalItems = 0;

        $scope.step = -1;
        $scope.totalSteps = 0;

        // local scope from nested vars
        $scope.step_config = undefined;
        $scope.tool_bar_state = undefined;
        $scope.active_image = undefined;
        $scope.step_options = undefined;
        $scope.step_base = '';

        $scope.select_detail = -1;

        $scope.select_stack = [];
        $scope.select_last = undefined;

        $scope.annotations = undefined;
        $scope.magicwand_tolerance = 50;
        $scope.regionpaint_size = 70;

        $scope.runningSegmentation = false;

        $rootScope.$watch('image_index', function(newValue, originalValue) {

            if ($rootScope.applicationReady) {
                $scope.active_image = $rootScope.getActiveImage();
            }
        });

		$rootScope.$watch('image_list', function(newValue, originalValue) {

            if ($rootScope.applicationReady) {

            	$scope.totalItems = $rootScope.image_list.length;

            	$scope.annotations = [];

            	$.each($rootScope.image_list, function(n, image_data){

                     var placeholder_obj = {
                         annotationid: -1,
                         steps: {}
                     };

                     $scope.annotations.push(placeholder_obj);
                 });
            }
        });


        // shortcut key bindings -> takes you home to task list
        Mousetrap.bind( ['ctrl+q'], function(evt) {
            if (typeof (evt.preventDefault) === 'function') {evt.preventDefault();}
            else {evt.returnValue = false}
            $rootScope.debug = !$rootScope.debug;
            $scope.$apply();
        });

        // shortcut key bindings -> takes you home to task list
        Mousetrap.bind( ['space'], function(evt) {
            if (typeof (evt.preventDefault) === 'function') {evt.preventDefault();}
            else {evt.returnValue = false}
            $scope.nextStep();
            $scope.$apply();
        });


        Mousetrap.bind( ['up'], function(evt) {
            if (typeof (evt.preventDefault) === 'function') {evt.preventDefault();}
            else {evt.returnValue = false}
            $scope.increaseParameter();
            $scope.$apply();

        });


        Mousetrap.bind( ['down'], function(evt) {
            if (typeof (evt.preventDefault) === 'function') {evt.preventDefault();}
            else {evt.returnValue = false}
            $scope.decreaseParameter();
            $scope.$apply();

        });


        // watches

        // effectively a callback from the initial subject query
        $rootScope.$watch('decision_tree', function(newValue, originalValue) {

            if($rootScope.applicationReady){
            
                console.log("There are " + $rootScope.decision_tree.length + ' steps');

                $scope.totalSteps = $rootScope.decision_tree.length;

            }
        });


        // Accessors

        $scope.getCurrentStepConfig = function(){
            if ($scope.step >= 0) {
                return $rootScope.decision_tree[$scope.step]    
            }

            return undefined;
        }

        $scope.getCurrentAnnotation = function(){
        	if($rootScope.applicationReady){
        		if ($scope.annotations) {
        			return $scope.annotations[$scope.image_index];	
        		}
        	}
        	return undefined;
        }


        // setters

        $scope.saveCurrentStepAnnotation = function(){

            // just making things explicit for readability's sake
            var features = $rootScope.imageviewer.getFeatures();
            var selection = angular.copy($scope.select_stack);
            var current_step = $scope.step;
        	var currentAnnotation = $scope.getCurrentAnnotation();

            if (features.length || selection.length){

                if(current_step in Object.keys(currentAnnotation.steps)){

                    // we have an existing annotation, just update the features and modify date

                    var stepAnnotation = currentAnnotation.steps[current_step]

//                    var geojson  = new ol.parser.GeoJSON;
//                    var features = vectorsource.getFeatures();
//                    var json     = geojson.writeFeatures(features);

                    var singleAnnotation = {
                        features : features,
                        selection : selection,
                        startTime : -1,
                        lastModifyTime : -1,
                        initialCreateTime : -1
                    }

                    currentAnnotation.steps[current_step] = singleAnnotation;

                }
                else
                {
                    // this is the first instance of the annotation, set the create date and field of view as well

                    var singleAnnotation = {
                        features : features,
                        selection : selection,
                        startTime : -1,
                        lastModifyTime : -1,
                        initialCreateTime : -1
                    }

                    currentAnnotation.steps[current_step] = singleAnnotation;

                }


            }



            console.log(currentAnnotation)
        }

        $scope.saveStepAnnotation = function(annotations, step_to_save){

        	var currentAnnotation = $scope.getCurrentAnnotation();
        	currentAnnotation.steps[step_to_save] = annotations;
        }

        $scope.getStepAnnotations = function(){

        	var currentAnnotation = $scope.getCurrentAnnotation();
        	console.log('current annotation', currentAnnotation);
        	return currentAnnotation.steps[$scope.step]
        }

        $scope.getAllFeatures = function(){

            var currentAnnotation = $scope.getCurrentAnnotation();

            var all_features = [];


            for(var step in currentAnnotation.steps){

                console.log(currentAnnotation.steps[step].features)

                for(var i =0; i < currentAnnotation.steps[step].features.length; i++){


                    all_features.push(currentAnnotation.steps[step].features[i]);

                }

//                all_features.concat()

            }
//
//            for(var i=0;i < currentAnnotation.steps.length; i++){
//
//                console.log('inside');
//
//                if(i == 0){
//                    all_annotations = currentAnnotation.steps[i];
//                }
//                else {
//
//                }
//
//                console.log('a', all_annotations)
//
//            }
//
            console.log('b', all_features)
//
//        	console.log('current annotation', currentAnnotation, all_annotations);

        	return all_features;


        }


        // controls

        $scope.selectImage = function(selected_index){
            $rootScope.image_index = selected_index;

            if($rootScope.imageviewer){
                $rootScope.imageviewer.clearPaintByNumber();
            }
        }

        $scope.beginAnnotation = function(){

            // clear paint layer if present, then call next step

            if($rootScope.imageviewer){
                $rootScope.imageviewer.clearPaintByNumber();
            }


            $scope.nextStep();

        }

        $scope.nextStep = function(){

            // if we have the step config, use it to define next step
            if($scope.step_config){

                if($scope.step_config.next != $scope.step){

                    $scope.gotoStep($scope.step_config.next);
                }
                else {
                    console.log('already at this step');
                }
            }
            else {
                console.log('next', $scope.step+1)

                $scope.gotoStep($scope.step+1);

            }

        }

        $scope.previousStep = function(){
            $scope.gotoStep($scope.step-1);
        }

        $scope.help = function(help_val)
        {
            alert('help!');
        }

        $scope.manualEdit = function(){

            $scope.tool_bar_state = 'pldefine';
            $rootScope.imageviewer.setDrawMode('pointlist');

        }

        $scope.increaseParameter = function(){

            if($scope.tool_bar_state == 'mwdefine'){
                $scope.magicwand_tolerance += 5;
                $scope.imageviewer.setFillParameter($scope.magicwand_tolerance);
                $scope.imageviewer.regenerateFill();
            }
        }

        $scope.decreaseParameter = function(){

            if($scope.tool_bar_state == 'mwdefine'){

                if($scope.magicwand_tolerance >= 5){
                    $scope.magicwand_tolerance -= 5;
                }
                else {
                    $scope.magicwand_tolerance = 0;
                }

                $scope.imageviewer.setFillParameter($scope.magicwand_tolerance);
                $scope.imageviewer.regenerateFill();
            }
        }








        // initial function when a step is loaded
        $scope.loadStep = function(){

            // get current step configuration
            $scope.step_config = $scope.getCurrentStepConfig();

            // clear viewer current and temporary annotations
            $scope.clearStep();

            if($scope.step_config && $scope.step_config.type == 'end'){



                var allFeatures = $scope.getAllFeatures();

                if (allFeatures) {

                    $rootScope.imageviewer.setAnnotations(allFeatures);

                }
                else {

                    // this step doesn't have annotations, do appropriate step selection processing steps (aka auto)

                }


            }
            else {

                console.log('not end')


                var stepAnnotation = $scope.getStepAnnotations();

                if (stepAnnotation) {

                    $rootScope.imageviewer.setAnnotations(stepAnnotation.features);
                    $scope.select_stack = stepAnnotation.selection;

                }
                else {

                    // this step doesn't have annotations, do appropriate step selection processing steps (aka auto)

                }


            }




            // load previous annotations if there are any
            $rootScope.imageviewer.hidePaintLayerIfVisible();


            if($scope.step_config){


                // set imageviewer to current step configuration
                if ($scope.step_config.default != "") {

                    $rootScope.imageviewer.setDrawMode($scope.step_config.default);

                }
                else {
                    $rootScope.imageviewer.setDrawMode('navigate');
                }

                if($scope.step_config.zoom == "lesion"){

                    var feature = $scope.getLesionFeature();
                    $rootScope.imageviewer.moveToFeature(feature);

                }


                // set some UI helpers
                $scope.step_options = $scope.step_config.options;
                $scope.step_base = $scope.step_config.step;

                console.log('Finished loading step', $scope.step_config.step);


            }


        }



        $scope.clearStep = function(){

            // if no annotations, do nothing.

            $scope.clearDrawingTools();

            // if imageviewer annotations, clear them
            $scope.clearLayerAnnotations();

            // if stack exists, clear it
            $scope.clearStackAnnotations();

            // return to original step definition
            if($scope.step_config){
                $scope.tool_bar_state = $scope.step_config.type;
            }

        }


        // returns the first feature from the first lesion definition step
        $scope.getLesionFeature = function(){
            var currentAnnotation = $scope.getCurrentAnnotation();
            return currentAnnotation.steps[0].features[0];
        }

        // this will clear the
        $scope.clearLayerAnnotations = function(){
            $rootScope.imageviewer.clearLayerAnnotations();
        }

        $scope.clearDrawingTools = function(){
            $rootScope.imageviewer.hidePaintLayerIfVisible();
            $rootScope.imageviewer.removeDrawInteraction();
        }

        // This clears the selection stack for overall pattern
        $scope.clearStackAnnotations = function(){

            // clear the selection stack
            $scope.select_stack = [];
            $scope.select_last = undefined;

            if($scope.step_config){

                $scope.step_base = $scope.step_config.step;
                $scope.step_options = $scope.step_config.options;

            }
        }


//




































//        $scope.resetStep = function(){
//
//            //
//            if($scope.stepHasAnnotations($scope.step) || $rootScope.imageviewer.hasSavedAnnotations()){
//
//                $rootScope.imageviewer.clearTemporary();
//                $rootScope.imageviewer.clearSaved()
//
//            }
//            else {
//
//                $rootScope.imageviewer.clearTemporary();
//
//            }
//
//
//
//
//            // if we're returning from a selectadvanced workflow, keep stack and add
//            if ($scope.select_last){
//
//            	console.log('completed annotation');
//
//                $scope.select_stack.push($scope.select_last)
//
//               	console.log($scope.step_options);
//
//				$rootScope.imageviewer.saveSelectionStack($scope.select_stack);
//
//            	$scope.select_last = undefined;
//
//
//            }
//            else {
//
//                // not in selectadvanced, just reset things
//
//	            $scope.step_config = $scope.getCurrentStepConfig();
//
//	            if ($scope.step_config.default != "") {
//					$rootScope.imageviewer.setDrawMode($scope.step_config.default);
//	            }
//	            else {
//	            	$rootScope.imageviewer.setDrawMode('navigate');
//	            }
//
//            	$scope.step_options = $scope.step_config.options;
//            	$scope.step_base = $scope.step_config.step;
//
//            	$scope.select_stack = [];
//            }
//
//            $scope.tool_bar_state = $scope.step_config.type; // load defaults, will adjust as navigating tree
//        }




        $scope.gotoStep = function(step){

            if (step < $scope.totalSteps) {

                // pre step change transition
                $scope.saveCurrentStepAnnotation();

                $scope.step = step;

                $scope.loadStep();

            }
            else if (step == $scope.totalSteps) {

                $scope.clearStep();

                // get a copy of the annotation
                var annotation = $scope.getCurrentAnnotation();

                var annotation_to_store = {};

                annotation_to_store['image_id'] = JSON.stringify($scope.active_image.record_id);
                annotation_to_store['image'] = $scope.active_image;
                annotation_to_store['user_id'] = JSON.stringify($rootScope.user_id);
                annotation_to_store['steps'] = {}

                var f = new ol.format.GeoJSON()

                for(var k in annotation.steps){

                    annotation_to_store.steps[k] = {};

                    var stepFeatures  = annotation.steps[k].features;
                    console.log(stepFeatures);
                    var geojsonfeatures = f.writeFeatures(stepFeatures);
                    console.log(geojsonfeatures);

                    annotation_to_store.steps[k]['features'] = geojsonfeatures;
                    annotation_to_store.steps[k]['selection'] = annotation.steps[k].selection;

                }

                console.log(annotation_to_store);

                var self = this;

                var annotation_url = 'annotation/'
                $http.post(annotation_url, annotation_to_store).success(function(response){

                	console.log('Post response:', response);

                	$scope.step = -1;
                    $scope.step_config = undefined;

                    var c_count = 0;
//                    for(var i = 0; i < $scope.annotations.length; i++){
//                        if(Object.keys($scope.annotations[i].step).length >0){
//                            c_count += 1
//                        }
//                    }

                    $scope.completedImages = c_count;

                });
            }
        }




// Point list / perimeter methods


        $scope.startPointList = function(){
        	$scope.tool_bar_state = 'pldefine';
        	$rootScope.imageviewer.setDrawMode('pointlist');
        }








// Paint by numbers methods

        $scope.startRegionPaint = function(){

        	$scope.tool_bar_state = 'rpdefine';
            $rootScope.imageviewer.setDrawMode('paintbrush');
        }

        $scope.runRegionPaint = function(){

            $scope.runningSegmentation = true;

            $timeout(function(){

                $scope.regionPaintDelay();

            }, 100);
        }

        $scope.regionPaintDelay = function(){

            $scope.tool_bar_state = 'rppaint';

            var feature = $scope.getLesionFeature();
            $rootScope.imageviewer.moveToFeature(feature);

        	$rootScope.imageviewer.startPainting();

            $scope.runningSegmentation = false;
        }

        $scope.finishRegionPaint = function(){

			$scope.tool_bar_state = 'rpreview';
            $rootScope.imageviewer.acceptPainting();

        }

        $scope.cancelRegionPaint = function(){

        	$rootScope.imageviewer.acceptPainting();
        	$rootScope.imageviewer.clearTemporary();

        	$scope.resetStep();
        }

        $scope.navMode = function(){

            $rootScope.imageviewer.hidePaintLayerIfVisible()
        }

        $scope.drawMode = function(){
            var feature = $scope.getLesionFeature();
            $rootScope.imageviewer.moveToFeature(feature);
            $rootScope.imageviewer.showPaintLayerIfVisible()
        }






// Magic wand methods

        $scope.startMagicWand = function(){
            $scope.tool_bar_state = 'mwdefine';
            $rootScope.imageviewer.setDrawMode('autofill');
        }


// Universal annotation methods

//
//        // converts a temporary annotation into a valid annotation in the imageviewer
//        $scope.acceptRegion = function(){
//
//            $rootScope.imageviewer.saveTemporaryAnnotations($scope.step_config.classification)
//
//        }
























//        $scope.acceptMagicWand = function(){
//            $scope.tool_bar_state = 'mwaccept';
//        }











//                $scope.resetStep();

//                var stepAnnotations = $scope.getStepAnnotations()
//
//                console.log('step annotations', stepAnnotations);
//
//                if (stepAnnotations) {
//
//                	$rootScope.imageviewer.setAnnotations(stepAnnotations);
//
//                	for(var i=0; i<stepAnnotations.length;i++){
//                		if(stepAnnotations[i].select.length > 0){
//                			$scope.select_stack = stepAnnotations[i].select;
//                		}
//                	}
//                }
//                else {
//
//                    // this step doesn't have annotations, do appopriate step selection processing steps (aka auto)
//                    console.log($scope.step_config);
//
//                    if($scope.step_config.type == 'autopbn'){
//
//
//                        console.log('zoom to full size')
//
//                        $scope.runRegionPaint();
//
//
//
//                    }
//
//
//                }

//
//            }

//        }



//        $scope.startLines = function(){
//			$rootScope.imageviewer.setDrawMode('lines');
//        }















//        $scope.clearPoints = function(){
//
//        	$rootScope.imageviewer.clearTemporary();
//        };
//
//
//        $scope.clearSavedPoints = function(step){
//            $rootScope.imageviewer.clearSavedStep(step);
//        }


//
//		$scope.saveCurrentPointsAsPolygon = function(){
//
//		     if ($rootScope.applicationReady)
//		     {
//
//		     	var temporary_annotations = $rootScope.imageviewer.saveTemporaryAnnotations($scope.step_config.classification)
//
//                console.log('temp', temporary_annotations);
//
////                $scope.nextStep();
//
//                 $scope.resetStep();
//
//		        return temporary_annotations;
//
//		     }
//		}




        $scope.selectDetail = function(detailobj){
            console.log(detailobj);
            $scope.select_detail = detailobj;

            $rootScope.imageviewer.selectAnnotationLabel(detailobj.value);
        }


		$scope.selectOption = function(key, option_to_select) {

			var selected_url = 'static/rev3/' + $scope.step_base + '/' + (key+1) + '.jpg'

			console.log('selected url', selected_url)

			var select_single = {
				url : selected_url,
				key : key
			}
			
			if(option_to_select.type == 'select'){

				$scope.select_stack.push(select_single);
				$scope.step_options = option_to_select.options;
				$scope.step_base = $scope.step_base + '/' + (key+1);

			}
			else if (option_to_select.type == 'review') {


				$scope.select_stack.push(select_single);
//				$rootScope.imageviewer.saveSelectionStack($scope.select_stack);
	        	$scope.tool_bar_state = option_to_select.type;

                $scope.openModalWithOptions(option_to_select);

			}
            else if (option_to_select.type == 'gotostep'){

                $scope.select_stack.push(select_single);

                console.log(option_to_select.value);
                $scope.gotoStep(option_to_select.value);

            }


//			else if (option_to_select.type == 'selectadvanced') {
//
//				$scope.select_last = select_single;
//
//				// $rootScope.imageviewer.saveSelectionStack($scope.select_stack);
//
//				$scope.step_options = option_to_select.options;
//
//				$scope.step_base = $scope.step_base + '/' + (key+1);
//
//	        	$scope.tool_bar_state = option_to_select.type;
//
//
//			}
//			else if(option_to_select.type == 'next') {
//
//				console.log('proceeding to next step');
//
//				$scope.nextStep();
//
//			}

		}


        var ModalInstanceCtrl = function ($scope, $modalInstance, options) {

            $scope.base = options;
            $scope.selectOption = function(opt){
                $modalInstance.close(opt);
            }

        };



        $scope.openModalWithOptions = function(options){

            console.log(options)

            $scope.modal_options = options.options[0]

            var modalInstance = $modal.open({
              templateUrl: 'myModalContent.html',
              controller: ModalInstanceCtrl,
              backdrop: 'static',
              keyboard: false,
              resolve: {
                options: function () {
                  return $scope.modal_options;
                }
              }
            });

            modalInstance.result.then(function (selectedOption) {

                console.log(selectedOption);

                // assuming we have steps to go to

                $scope.gotoStep(selectedOption.value);

            }, function () {
              $log.info('Modal dismissed at: ' + new Date());
            });

        }

        $scope.deleteSaved = function(key){

            if ($rootScope.applicationReady)
            {
            	var current_annotation = this.getCurrentAnnotation();

                if(current_annotation){
                    if (current_annotation.steps.hasOwnProperty(key)){
                        delete $scope.annotations[$scope.image_index].steps[key];
                    }
                }

                $scope.clearStackAnnotations();
                $scope.clearLayerAnnotations();
            }

            return false;
        }

        // state functions
        $scope.showIfStep = function(step){

//            if(step == 5){
//                return false;
//            }

            return parseInt(step) == $scope.step;
        }

        $scope.showIfStepGTE = function(step){

//            if($scope.step == 4){
//
//                if(step == 4){
//                    return true;
//                }
//                return false;
//            }

        	return parseInt(step) <= $scope.step;	
        }

        $scope.showIfStepOrLast = function(step){

            if($scope.step == $rootScope.decision_tree.length - 1 ){

                return true;
            }

            return parseInt(step) == $scope.step;
        }

        $scope.compareState = function(target, current_value){
            return target == current_value;
        }



        // if there are any annotations, you can proceed
        $scope.hasAnnotations = function(){
            return ($scope.hasLayerAnnotations() || $scope.hasStackSelections());
        }

        $scope.imageHasAnnotations = function(index){

            if ($rootScope.applicationReady)
            {
                var current_annotation = $scope.annotations[index];

                if(current_annotation){
                    return (Object.keys(current_annotation.steps).length > 0);
                }
            }
            return false;
        }

        //temporary annotations = points that need to be converted into a polygon
        $scope.hasStackSelections = function(){

            if ($rootScope.applicationReady)
            {
                return $scope.select_stack.length > 0;
            }
            return false;
        }

        // saved annotations = points that have been converted... NOT TO BE CONFUSED WITH STEP annotations
        $scope.hasLayerAnnotations = function(){
            if ($rootScope.applicationReady)
            {
                return $rootScope.imageviewer.hasLayerAnnotations();
            }
            return false;
        }

        $scope.stepHasAnnotations = function(step){

            if ($rootScope.applicationReady)
            {
            	var current_annotation = this.getCurrentAnnotation();

                if ($rootScope.imageviewer.hasLayerAnnotations()){
                    if (step == $scope.step){
                        return true;
                    }
                }

            	if (current_annotation) {

	            	var step_annotation = current_annotation.steps[step]

	            	if(step_annotation){
                        return true;
	            	}
            	}
            }
            return false;
        }







        $scope.updateCompleteState = function() {

            if($rootScope.annotation_list.length > 0)
            {
                // update current image state
                var o = $rootScope.annotation_list[$rootScope.image_index];
                var is_complete = true;
                is_complete = o.step[1].length > 0 && is_complete;
                is_complete = o.step[2].length > 0 && is_complete;
                is_complete = o.step[3].length > 0 && is_complete;
                // is_complete = o.details.length > 0 && is_complete;

                o.complete = is_complete;

                // recalculate the total complete count
                var completed = 0;

                $.each($rootScope.annotation_list, function(n, subject_data){

                    if(subject_data.complete == true){
                        console.log('complete: ', subject_data);
                        completed +=1;
                    }
                });

                return completed;
            }
            return 0;
        }


        $scope.drawModeIs = function(mode_query) {

            if($rootScope.applicationReady)
            {            
                return mode_query == $scope.draw_mode;
            }
            return false;
        }



    }]);





var annotationView = derm_app.controller('AnnotationView', ['$scope', '$rootScope', '$timeout',

    function ($scope, $rootScope, $timeout) {


    }]);





// utilities
var studyToImageSource = function (study_num) {
    var src = "http://dermannotator.org/cgi-bin/iipsrv.fcgi?DeepZoom=/RAW_IMAGE_DATA/bigdata2/PYRAMIDS/MSKCC/BATCH1/B1/"
            + study_num + ".tif.dzi.tif.dzi";
//    console.log(src);
    return src;
};


var iff_filter = derm_app.filter('iif', function () {
   return function(input, trueValue, falseValue) {
        return input ? trueValue : falseValue;
   };
});


// drag and drop list directive
// directive for a single list
// based on code from
// http://www.smartjava.org/content/drag-and-drop-angularjs-using-jquery-ui
var dndList = derm_app.directive('dndList', function() {

    return function(scope, element, attrs) {

        // variables used for dnd
        var toUpdate;
        var startIndex = -1;

        // watch the model, so we always know what element
        // is at a specific position
        scope.$watch(attrs.dndList, function(value) {
            toUpdate = value;
        },true);

        // use jquery to make the element sortable (dnd). This is called
        // when the element is rendered
        $(element[0]).sortable({
            items:'li',
            start:function (event, ui) {
                // on start we define where the item is dragged from
                startIndex = ($(ui.item).index());
            },
            stop:function (event, ui) {
                // on stop we determine the new index of the
                // item and store it there
                var newIndex = ($(ui.item).index());
                var toMove = toUpdate[startIndex];
                toUpdate.splice(startIndex,1);
                toUpdate.splice(newIndex,0,toMove);

                // we move items in the array, if we want
                // to trigger an update in angular use $apply()
                // since we're outside angulars lifecycle
                scope.$apply(scope.model);
            },
            axis:'y'
        })
    }
});




// The WebSocketService operates by either linking callbacks to scope variables (promises) or handling spontaneous
// events sent from the tornado application. These events can be status updates or errors not triggered by user input.
derm_app.factory('WebSocketService', ['$q', '$rootScope', function ($q, $rootScope) {

    var Service = {};
    var callbacks = {};
    var currentCallbackId = 0;
    var ws = new WebSocket("ws://localhost:5555/api/task/events/task-succeeded/");

    ws.onopen = function () {

        console.log("Websocket connection opened to Flower task monitoring");

    };

    ws.onmessage = function (message) {

        $rootScope.hasJobResult(JSON.parse(message.data));

//        listener(JSON.parse(message.data));

    };

    function sendRequest(request) {

        var defer = $q.defer();
        var callbackId = getCallbackId();
        callbacks[callbackId] = {
            time: new Date(),
            cb: defer
        };
        request.callback_id = callbackId;
        ws.send(JSON.stringify(request));
        return defer.promise;
    }

    function listener(messageObj) {

         console.log(messageObj)
//
//         if (callbacks.hasOwnProperty(messageObj.callback_id)) {
//    //            console.log(callbacks[messageObj.callback_id]);
//                $rootScope.$apply(callbacks[messageObj.callback_id].cb.resolve(messageObj.data));
//                delete callbacks[messageObj.callbackID];
//            }
//            else {
//                if(messageObj.target == 'aplog'){
//                    console.log('aplog', messageObj.data);
//                }
//                else if (messageObj.target == 'remotelog') {
//                    console.log('remotelog', messageObj.data);
//                }
//                else if (messageObj.target == 'console') {
//                    console.log('console ::', messageObj.data);
//                }
//                else if (messageObj.target == 'angular') {
//
//                    console.log('angular ::', messageObj.data);
//
//                    if(messageObj.data[0] == 'update') {
//
//                         console.log('updating')
//
//                        $rootScope.updateStatus(messageObj.data[1]);
//                    }
//                    else if (messageObj.data[0] == 'reload') {
//
//                        console.log('reloading')
//
//                        $rootScope.updateStatus(messageObj.data[1]);
//                    }
//
//
//    //                $rootScope.ApplicationInit();
//
//                }
//                else if (messageObj.target == 'notice') {
//                    console.log('notice', messageObj.data);
//                }
//                else if (messageObj.target == 'init') {
//                    console.log('Websocket init complete');
//                }
//                else
//                {
//                    console.log('unsupported target ' + messageObj.target);
//                }
//            }
    }

    function getCallbackId() {
        currentCallbackId += 1;
        if (currentCallbackId > 10000) {
            currentCallbackId = 0;
        }
        return currentCallbackId;
    }


    Service.sendAsyncRequestWithCallback = function(target,data) {

       var d = {
            'target':target,
            'data': data
        }

        var promise = sendRequest(d);
        return promise;
    }

    return Service;
}]);




// data sources

var imageList = derm_app.factory('imageList', function($http) {

  // shuffle from SO: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  function shuffle(array) {
      var currentIndex = array.length
        , temporaryValue
        , randomIndex
        ;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
  }

  var imageList= {
    fromServer: function() {
        var url = 'http://example.com/json.json';
            var promise = $http.jsonp(url).then(function (response) {
          return response.data;
        });
      return promise;
    },
    fromLocal: function() {
        var url = 'static/data/json_subj_list.json';
            var promise = $http.get(url).then(function (response) {
          return response.data;
        });
      return promise;
    },

    // fromDB -> perform API request with user_id, image offset, count to get, and whether it should be shuffled
    fromDB: function(user_id, offset, count, shouldShuffle) {
        console.log('Query:: fromDB: ' + user_id + " " + offset + " " + count + " " + shouldShuffle)
//        var url = 'static/data/json_subj_list.json';
            var url = 'images/' + offset + "/" + count + "/";

            var promise = $http.get(url).then(function (response) {

            if(shouldShuffle){
//                return shuffle(response.data.slice(offset,count));
                return shuffle(response.data);
            }
            else
            {
//                return response.data.slice(offset, count);
                return response.data;
            }
        });
      return promise;
    }

    };

  return imageList;
});





var decisionTree = derm_app.factory('decisionTree', function($http) {

  var decisionTree= {
    fromServer: function() {
        var url = 'http://example.com/json.json';
            var promise = $http.jsonp(url).then(function (response) {

                console.log(response.data);
          return response.data;
        });
      return promise;
    },
    fromLocal: function() {
        var url = 'static/rev3/decisiontree.json';
            var promise = $http.get(url).then(function (response) {
          return response.data;
        });
      return promise;
    }

    };

  return decisionTree;
});




// handle window resize events
function updateLayout() {

    var scope = angular.element($("#angular_id")).scope();
    scope.safeApply(function(){

        $("#angular_id").height(window.innerHeight);
        $("#annotationView").height(window.innerHeight);

        console.log(window.innerWidth, window.innerHeight);
//1920 1106
    })
}

function externalApply() {
    var scope = angular.element($("#angular_id")).scope();
    scope.safeApply(function(){
    })
}

function toggleDebug() {

    var scope = angular.element($("#angular_id")).scope();

    console.log('Angular state before: ', scope.debug);

    scope.safeApply(function(){

       scope.debug = !scope.debug;

    })

    console.log('Angular state before: ', scope.debug);

}

window.onresize = updateLayout;














