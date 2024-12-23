const imageWidth = 1165;
const imageHeight = 724;

const corner1 = L.latLng(0, 0);
const corner2 = L.latLng(-imageHeight, imageWidth);

const bounds = L.latLngBounds(corner1, corner2);

const map = L.map("map", {
  crs: L.CRS.Simple,
  minZoom: -2,
});

map.fitBounds(bounds);
L.imageOverlay("top_down_view.jpg", bounds).addTo(map);

const startSelect = document.getElementById("startSelect");
const endSelect = document.getElementById("endSelect");

const NODES = {
  library: { x: 873, y: -400, name: "Library", type: "poi" },
  cafeteria: { x: 225, y: -213, name: "Cafeteria", type: "poi" },
  AKSOB: { x: 865, y: -301, name: "AKSOB", type: "poi" },
  "Middle Gate": { x: 743, y: -266, name: "Middle Gate", type: "poi" },
  "Orme Gray": { x: 649, y: -304, name: "Orme Gray", type: "poi" },
  "Fountain Area": { x: 601, y: -359, name: "Fountain Area", type: "poi" },
  "Sage Hall": { x: 475, y: -307, name: "Sage Hall", type: "poi" },
  "Shanon Hall": { x: 499, y: -499, name: "Shanon Hall", type: "poi" },
  "Lower Gate": { x: 478, y: -599, name: "Lower Gate", type: "poi" },
  "University Service": {
    x: 196,
    y: -571,
    name: "University Service",
    type: "poi",
  },
  "Irwin Hall": { x: 315, y: -577, name: "Irwin Hall", type: "poi" },
  "Safadi Area": { x: 282, y: -398, name: "Safadi Area", type: "poi" },
  "Tennis Playground": {
    x: 188,
    y: -478,
    name: "Tennis Playground",
    type: "poi",
  },
  "Nicole Hall": { x: 218, y: -268, name: "Nicole Hall", type: "poi" },
  "Wadad Khoury student center": {
    x: 211,
    y: -144,
    name: "Wadad Khoury student center",
    type: "poi",
  },
  "Upper gate": { x: 362, y: -185, name: "Upper gate", type: "poi" },
  "Gathering Area": { x: 359, y: -252, name: "Gathering Area", type: "poi" },
  Garden: { x: 415, y: -386, name: "Garden", type: "poi" },
  Safadi: { x: 180, y: -385, name: "Safadi", type: "poi" },
  "Node 1": { x: 423, y: -549, name: "Node 1" },
  "Node 2": { x: 493, y: -432, name: "Node 2" },
  "Node 3": { x: 599, y: -443, name: "Node 3" },
  "Node 4": { x: 707, y: -448, name: "Node 4" },
  "Node 5": { x: 716, y: -371, name: "Node 5" },
  "Node 6": { x: 578, y: -284, name: "Node 6" },
  "Node 7": { x: 361, y: -326, name: "Node 7" },
  "Node 8": { x: 315, y: -309, name: "Node 8" },
  "Node 9": { x: 343, y: -412, name: "Node 9" },
  "Node 10": { x: 453, y: -428, name: "Node 10" },
  "Node 11": { x: 469, y: -362, name: "Node 11" },
};
const GEOMETRY_DATA = {
  "Lower Gate-Node 1": [
    [NODES["Lower Gate"].y, NODES["Lower Gate"].x],
    [-592, 471],
    [-589, 470],
    [-572, 448],
    [-564, 438],
    [-559, 431],
    [-553, 426],
    [NODES["Node 1"].y, NODES["Node 1"].x],
  ],
  "Lower Gate-Shanon Hall": [
    [NODES["Lower Gate"].y, NODES["Lower Gate"].x],
    [-592, 471],
    [-586, 464],
    [-579, 456],
    [-572, 454],
    [-562, 454],
    [-534, 463],
    [-511, 469],
    [-501, 472],
    [-499, 483],
    [NODES["Shanon Hall"].y, NODES["Shanon Hall"].x],
  ],
  "Lower Gate-Irwin Hall": [
    [NODES["Lower Gate"].y, NODES["Lower Gate"].x],
    [-592, 471],
    [-594, 459],
    [NODES["Irwin Hall"].y, NODES["Irwin Hall"].x],
  ],
  "Irwin Hall-University Service": [
    [NODES["Irwin Hall"].y, NODES["Irwin Hall"].x],
    [-574, 298],
    [-571, 279],
    [-564, 263],
    [NODES["University Service"].y, NODES["University Service"].x],
  ],
  "Irwin Hall-Tennis Playground": [
    [NODES["Irwin Hall"].y, NODES["Irwin Hall"].x],
    [-574, 298],
    [-571, 279],
    [-564, 263],
    [-551, 250],
    [-519, 250],
    [-496, 252],

    [NODES["Tennis Playground"].y, NODES["Tennis Playground"].x],
  ],
  "Node 1-Node 10": [
    [NODES["Node 1"].y, NODES["Node 1"].x],
    [-515, 432],
    [-482, 441],
    [NODES["Node 10"].y, NODES["Node 10"].x],
  ],
  "Shanon Hall-Node 2": [
    [NODES["Shanon Hall"].y, NODES["Shanon Hall"].x],
    [-499, 483],
    [-494, 476],
    [-484, 478],
    [-450, 489],
    [NODES["Node 2"].y, NODES["Node 2"].x],
  ],
  "Node 2-Node 3": [
    [NODES["Node 2"].y, NODES["Node 2"].x],
    [-434, 517],
    [-440, 569],
    [NODES["Node 3"].y, NODES["Node 3"].x],
  ],
  "Node 2-Node 10": [
    [NODES["Node 2"].y, NODES["Node 2"].x],
    [-429, 471],
    [NODES["Node 10"].y, NODES["Node 10"].x],
  ],
  "Node 3-Fountain Area": [
    [NODES["Node 3"].y, NODES["Node 3"].x],
    [-428, 602],
    [-386, 608],
    [NODES["Fountain Area"].y, NODES["Fountain Area"].x],
  ],
  "Node 3-Node 4": [
    [NODES["Node 3"].y, NODES["Node 3"].x],
    [-443, 615],
    [-445, 641],
    [-447, 684],
    [NODES["Node 4"].y, NODES["Node 4"].x],
  ],
  "Node 4-Node 5": [
    [NODES["Node 4"].y, NODES["Node 4"].x],
    [-432, 712],
    [-400, 714],
    [NODES["Node 5"].y, NODES["Node 5"].x],
  ],
  "Node 5-library": [
    [NODES["Node 5"].y, NODES["Node 5"].x],
    [-373, 733],
    [-368, 753],
    [-365, 773],
    [-362, 796],
    [-361, 814],
    [-359, 839],
    [NODES["library"].y, NODES["library"].x],
  ],
  "Node 5-AKSOB": [
    [NODES["Node 5"].y, NODES["Node 5"].x],
    [-373, 733],
    [-368, 753],
    [-365, 773],
    [-362, 796],
    [-361, 814],
    [-359, 839],
    [NODES["AKSOB"].y, NODES["AKSOB"].x],
  ],
  "Node 5-Middle Gate": [
    [NODES["Node 5"].y, NODES["Node 5"].x],
    [-373, 733],
    [-368, 753],
    [NODES["Middle Gate"].y, NODES["Middle Gate"].x],
  ],
  "Node 5-Orme Gray": [
    [NODES["Node 5"].y, NODES["Node 5"].x],
    [-363, 645],
    [-340, 649],
    [NODES["Orme Gray"].y, NODES["Orme Gray"].x],
  ],
  "Node 5-Fountain Area": [
    [NODES["Node 5"].y, NODES["Node 5"].x],
    [-363, 645],
    [NODES["Fountain Area"].y, NODES["Fountain Area"].x],
  ],
  "library-AKSOB": [
    [NODES["library"].y, NODES["library"].x],
    [NODES["AKSOB"].y, NODES["AKSOB"].x],
  ],
  "Fountain Area-Node 11": [
    [NODES["Fountain Area"].y, NODES["Fountain Area"].x],
    [-386, 608],
    [-394, 598],
    [NODES["Node 11"].y, NODES["Node 11"].x],
  ],
  "Fountain Area-Node 6": [
    [NODES["Fountain Area"].y, NODES["Fountain Area"].x],
    [-325, 600],
    [-305, 600],
    [-288, 600],
    [NODES["Node 6"].y, NODES["Node 6"].x],
  ],
  "Node 6-Sage Hall": [
    [NODES["Node 6"].y, NODES["Node 6"].x],
    [-278, 555],
    [-271, 529],
    [-265, 508],
    [-267, 496],
    [-281, 490],
    [NODES["Sage Hall"].y, NODES["Sage Hall"].x],
  ],
  "Node 6-Upper gate": [
    [NODES["Node 6"].y, NODES["Node 6"].x],
    [-278, 555],
    [-271, 529],
    [-265, 508],
    [-257, 471],
    [-249, 443],
    [-237, 412],
    [-221, 383],
    [-210, 361],
    [-203, 354],
    [NODES["Upper gate"].y, NODES["Upper gate"].x],
  ],
  "Node 6-Gathering Area": [
    [NODES["Node 6"].y, NODES["Node 6"].x],
    [-278, 555],
    [-271, 529],
    [-265, 508],
    [-257, 471],
    [-249, 443],
    [-237, 412],
    [NODES["Gathering Area"].y, NODES["Gathering Area"].x],
  ],
  "Sage Hall-Node 11": [
    [NODES["Sage Hall"].y, NODES["Sage Hall"].x],
    [-335, 478],
    [NODES["Node 11"].y, NODES["Node 11"].x],
  ],
  "Upper gate-Gathering Area": [
    [NODES["Upper gate"].y, NODES["Upper gate"].x],
    [NODES["Gathering Area"].y, NODES["Gathering Area"].x],
  ],
  "Upper gate-Wadad Khoury student center": [
    [NODES["Upper gate"].y, NODES["Upper gate"].x],
    [-203, 354],
    [-196, 340],
    [-182, 324],
    [-181, 290],
    [
      NODES["Wadad Khoury student center"].y,
      NODES["Wadad Khoury student center"].x,
    ],
  ],
  "Upper gate-Nicole Hall": [
    [NODES["Upper gate"].y, NODES["Upper gate"].x],
    [-203, 354],
    [-196, 340],
    [-182, 324],
    [-181, 290],
    [NODES["Nicole Hall"].y, NODES["Nicole Hall"].x],
  ],
  "Upper gate-cafeteria": [
    [NODES["Upper gate"].y, NODES["Upper gate"].x],
    [-203, 354],
    [-196, 340],
    [-182, 324],
    [-181, 290],
    [NODES["cafeteria"].y, NODES["cafeteria"].x],
  ],
  "Upper gate-Node 8": [
    [NODES["Upper gate"].y, NODES["Upper gate"].x],
    [-203, 354],
    [-227, 329],
    [-272, 322],
    [-293, 314],
    [-302, 303],
    [NODES["Node 8"].y, NODES["Node 8"].x],
  ],
  "Upper gate-Node 7": [
    [NODES["Upper gate"].y, NODES["Upper gate"].x],
    [-203, 354],
    [-227, 329],
    [-272, 322],
    [-290, 329],
    [-298, 338],
    [-316, 337],

    [NODES["Node 7"].y, NODES["Node 7"].x],
  ],
  "Node 8-Node 7": [
    [NODES["Node 8"].y, NODES["Node 8"].x],
    [NODES["Node 7"].y, NODES["Node 7"].x],
  ],
  "Node 7-Node 11": [
    [NODES["Node 7"].y, NODES["Node 7"].x],
    [-336, 374],
    [-341, 385],
    [NODES["Node 11"].y, NODES["Node 11"].x],
  ],
  "Node 7-Node 9": [
    [NODES["Node 7"].y, NODES["Node 7"].x],
    [NODES["Node 9"].y, NODES["Node 9"].x],
  ],
  "Node 11-Node 10": [
    [NODES["Node 11"].y, NODES["Node 11"].x],
    [NODES["Node 10"].y, NODES["Node 10"].x],
  ],
  "Node 9-Safadi Area": [
    [NODES["Node 9"].y, NODES["Node 9"].x],
    [NODES["Safadi Area"].y, NODES["Safadi Area"].x],
  ],
  "Node 9-Garden": [
    [NODES["Node 9"].y, NODES["Node 9"].x],
    [-416, 357],
    [-416, 374],
    [-418, 393],
    [-413, 403],
    [NODES["Garden"].y, NODES["Garden"].x],
  ],
  "Node 9-Node 10": [
    [NODES["Node 9"].y, NODES["Node 9"].x],
    [NODES["Node 10"].y, NODES["Node 10"].x],
  ],
  "Node 10-Garden": [
    [NODES["Node 10"].y, NODES["Node 10"].x],
    [-421, 410],
    [-413, 403],
    [NODES["Garden"].y, NODES["Garden"].x],
  ],
  "Safadi Area-Safadi": [
    [NODES["Safadi Area"].y, NODES["Safadi Area"].x],
    [NODES["Safadi"].y, NODES["Safadi"].x],
  ],
  "Wadad Khoury student center-cafeteria": [
    [
      NODES["Wadad Khoury student center"].y,
      NODES["Wadad Khoury student center"].x,
    ],
    [NODES["cafeteria"].y, NODES["cafeteria"].x],
  ],

  "cafeteria-Nicole Hall": [
    [NODES["cafeteria"].y, NODES["cafeteria"].x],
    [NODES["Nicole Hall"].y, NODES["Nicole Hall"].x],
  ],
  "Node 9-Shanon Hall": [
    [NODES["Node 9"].y, NODES["Node 9"].x],
    [-416, 357],
    [-420, 368],
    [-426, 376],
    [-433, 382],
    [-451, 379],
    [-459, 381],
    [-461, 388],
    [-461, 404],
    [-465, 414],
    [-471, 418],
    [-479, 425],
    [-482, 441],
    [-492, 471],
    [NODES["Shanon Hall"].y, NODES["Shanon Hall"].x],
  ],
  "Node 9-Node 1": [
    [NODES["Node 9"].y, NODES["Node 9"].x],
    [-416, 357],
    [-420, 368],
    [-426, 376],
    [-433, 382],
    [-451, 379],
    [-459, 381],
    [-461, 388],
    [-461, 404],
    [-465, 414],
    [-471, 418],
    [-479, 425],
    [-482, 441],
    [-515, 432],
    [NODES["Node 1"].y, NODES["Node 1"].x],
  ],
  "cafeteria-Node 6": [
    [NODES["cafeteria"].y, NODES["cafeteria"].x],
    [-212, 322],
    [-209, 344],
    [-214, 369],
    [-224, 386],
    [NODES["Node 6"].y, NODES["Node 6"].x],
  ],
  "Nicole Hall-Node 6": [
    [NODES["Nicole Hall"].y, NODES["Nicole Hall"].x],
    [-212, 322],
    [-209, 344],
    [-214, 369],
    [-224, 386],
    [NODES["Node 6"].y, NODES["Node 6"].x],
  ],
  "Wadad Khoury student center-Node 6": [
    [
      NODES["Wadad Khoury student center"].y,
      NODES["Wadad Khoury student center"].x,
    ],
    [-212, 322],
    [-209, 344],
    [-214, 369],
    [-224, 386],
    [NODES["Node 6"].y, NODES["Node 6"].x],
  ],
  "cafeteria-Sage Hall": [
    [NODES["cafeteria"].y, NODES["cafeteria"].x],
    [-212, 322],
    [-209, 344],
    [-214, 369],
    [-224, 386],
    [-236, 407],
    [-245, 429],
    [-251, 455],
    [-265, 495],
    [-273, 492],
    [-284, 490],
    [NODES["Sage Hall"].y, NODES["Sage Hall"].x],
  ],
  "Nicole Hall-Sage Hall": [
    [NODES["Nicole Hall"].y, NODES["Nicole Hall"].x],
    [-212, 322],
    [-209, 344],
    [-214, 369],
    [-224, 386],
    [-236, 407],
    [-245, 429],
    [-251, 455],
    [-265, 495],
    [-273, 492],
    [-284, 490],
    [NODES["Sage Hall"].y, NODES["Sage Hall"].x],
  ],
  "Wadad Khoury student center-Sage Hall": [
    [
      NODES["Wadad Khoury student center"].y,
      NODES["Wadad Khoury student center"].x,
    ],
    [-212, 322],
    [-209, 344],
    [-214, 369],
    [-224, 386],
    [-236, 407],
    [-245, 429],
    [-251, 455],
    [-265, 495],
    [-273, 492],
    [-284, 490],
    [NODES["Sage Hall"].y, NODES["Sage Hall"].x],
  ],
  "cafeteria-Node 8": [
    [NODES["cafeteria"].y, NODES["cafeteria"].x],
    [-210, 318],
    [-211, 325],
    [-218, 327],
    [-234, 326],
    [-250, 324],
    [-280, 323],
    [-286, 321],
    [-300, 304],
    [NODES["Node 8"].y, NODES["Node 8"].x],
  ],
  "Nicole Hall-Node 8": [
    [NODES["Nicole Hall"].y, NODES["Nicole Hall"].x],
    [-210, 318],
    [-211, 325],
    [-218, 327],
    [-234, 326],
    [-250, 324],
    [-280, 323],
    [-286, 321],
    [-300, 304],
    [NODES["Node 8"].y, NODES["Node 8"].x],
  ],
  "Wadad Khoury student center-Node 8": [
    [
      NODES["Wadad Khoury student center"].y,
      NODES["Wadad Khoury student center"].x,
    ],
    [-210, 318],
    [-211, 325],
    [-218, 327],
    [-234, 326],
    [-250, 324],
    [-280, 323],
    [-286, 321],
    [-300, 304],
    [NODES["Node 8"].y, NODES["Node 8"].x],
  ],
  "Lower Gate-Node 2": [
    [NODES["Lower Gate"].y, NODES["Lower Gate"].x],
    [-592, 471],
    [-586, 464],
    [-579, 456],
    [-572, 454],
    [-562, 454],
    [-534, 463],
    [-511, 469],
    [-501, 472],
    [NODES["Node 2"].y, NODES["Node 2"].x],
  ],
  "Node 1-Irwin Hall": [
    [NODES["Node 1"].y, NODES["Node 1"].x],
    [-554, 424],
    [-558, 429],
    [-564, 432],
    [-569, 434],
    [-574, 434],
    [-567, 386],
    [-580, 381],

    [NODES["Irwin Hall"].y, NODES["Irwin Hall"].x],
  ],
  "Upper gate-Sage Hall": [
    [NODES["Upper gate"].y, NODES["Upper gate"].x],
    [-198, 356],
    [-213, 376],
    [-243, 435],
    [-257, 476],
    [-261, 493],
    [-269, 493],
    [NODES["Sage Hall"].y, NODES["Sage Hall"].x],
  ],
  "AKSOB-Middle Gate": [
    [NODES["AKSOB"].y, NODES["AKSOB"].x],
    [-360, 812],
    [-362, 768],
    [-355, 753],
    [NODES["Middle Gate"].y, NODES["Middle Gate"].x],
  ],
  "library-Middle Gate": [
    [NODES["library"].y, NODES["library"].x],
    [-360, 812],
    [-362, 768],
    [-355, 753],
    [NODES["Middle Gate"].y, NODES["Middle Gate"].x],
  ],
};

const GRAPH = {};

for (let key in NODES) {
  if (NODES[key].type === "poi") {
    L.marker([NODES[key].y, NODES[key].x])
      .addTo(map)
      .bindPopup(`<b>${NODES[key].name}</b>`);
  }
}

const message = document.getElementById("user_message");
function userIcon() {
  return L.divIcon({
    className: "user-location-icon",
    html: '<div style="width:10px;height:10px;background:blue;border-radius:50%;"></div>',
    iconSize: [10, 10],
  });
}
function distanceBetween(nodeA, nodeB) {
  const A = NODES[nodeA];
  const B = NODES[nodeB];
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  return Math.sqrt(dx * dx + dy * dy);
}
// Enhanced addEdge
function addEdge(a, b, geometry = null) {
  if (!GRAPH[a]) GRAPH[a] = [];
  if (!GRAPH[b]) GRAPH[b] = [];

  const dist = distanceBetween(a, b);

  const edgeAtoB = { node: b, distance: dist };
  const edgeBtoA = { node: a, distance: dist };

  // If geometry is provided, store it for the forward edge and reversed for the backward edge
  if (geometry && Array.isArray(geometry)) {
    edgeAtoB.geometry = geometry;
    edgeBtoA.geometry = [...geometry].reverse();
  }

  GRAPH[a].push(edgeAtoB);
  GRAPH[b].push(edgeBtoA);
}

// Build the graph automatically from GEOMETRY_DATA
Object.keys(GEOMETRY_DATA).forEach((edgeKey) => {
  const [startNode, endNode] = edgeKey.split("-");
  addEdge(startNode, endNode, GEOMETRY_DATA[edgeKey]);
});

// for (let key in NODES) {
//   if (NODES[key].type === "poi") {
//     const startOption = document.createElement("option");
//     startOption.value = key;
//     startOption.textContent = NODES[key].name;
//     startSelect.appendChild(startOption);

//     const endOption = document.createElement("option");
//     endOption.value = key;
//     endOption.textContent = NODES[key].name;
//     endSelect.appendChild(endOption);
//   }
// }

map.on("click", function (e) {
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;
  console.log(`Clicked at: y = ${lat}, x = ${lng}`);
});
function heuristic(nodeA, nodeB) {
  return distanceBetween(nodeA, nodeB);
}

function aStar(startNode, goalNode) {
  console.log(startNode, goalNode);
  if (!NODES[startNode]) throw new Error("Start node does not exist");
  if (!NODES[goalNode]) throw new Error("Goal node does not exist");

  let openSet = [startNode];
  let cameFrom = {};

  let gScore = {};
  for (let node in NODES) {
    gScore[node] = Infinity;
  }
  gScore[startNode] = 0;

  let fScore = {};
  for (let node in NODES) {
    fScore[node] = Infinity;
  }
  fScore[startNode] = heuristic(startNode, goalNode);

  while (openSet.length > 0) {
    // Sort by lowest fScore
    openSet.sort((a, b) => fScore[a] - fScore[b]);
    let current = openSet[0];

    // Goal check
    if (current === goalNode) {
      return reconstructPath(cameFrom, current);
    }
    openSet.shift();

    const neighbors = GRAPH[current] || [];
    for (let neighborObj of neighbors) {
      let neighbor = neighborObj.node;
      let tentative_gScore = gScore[current] + neighborObj.distance;

      if (tentative_gScore < gScore[neighbor]) {
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentative_gScore;
        fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, goalNode);

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  return null;
}

function reconstructPath(cameFrom, current) {
  let totalPath = [current];
  while (current in cameFrom) {
    current = cameFrom[current];
    totalPath.unshift(current);
  }
  return totalPath;
}
addEdge("Lower Gate", "Node 1");
addEdge("Lower Gate", "Shanon Hall");
addEdge("Lower Gate", "Irwin Hall");
addEdge("Irwin Hall", "University Service");
addEdge("Irwin Hall", "Tennis Playground");
addEdge("Node 1", "Node 10");
addEdge("Node 1", "Irwin Hall");
addEdge("Shanon Hall", "Node 2");
addEdge("Node 2", "Node 3");
addEdge("Node 2", "Node 10");
addEdge("Node 3", "Fountain Area");
addEdge("Node 3", "Node 4");
addEdge("Node 4", "Node 5");
addEdge("Node 5", "library");
addEdge("Node 5", "AKSOB");
addEdge("Node 5", "Middle Gate");
addEdge("Node 5", "Orme Gray");
addEdge("Fountain Area", "Orme Gray");
addEdge("Node 5", "Fountain Area");
addEdge("library", "AKSOB");
addEdge("Fountain Area", "Node 11");
addEdge("Fountain Area", "Node 6");
addEdge("Node 6", "Sage Hall");
addEdge("Node 6", "Upper gate");
addEdge("Node 6", "Gathering Area");
addEdge("Sage Hall", "Node 11");
addEdge("Upper gate", "Gathering Area");
addEdge("Upper gate", "Wadad Khoury student center");
addEdge("Upper gate", "Nicole Hall");
addEdge("Upper gate", "cafeteria");
addEdge("Upper gate", "Node 8");
addEdge("Node 8", "Node 7");
addEdge("Node 7", "Node 11");
addEdge("Node 7", "Node 9");
addEdge("Node 11", "Node 10");
addEdge("Node 9", "Safadi Area");
addEdge("Node 9", "Garden");
addEdge("Node 9", "Node 10");
addEdge("Node 10", "Garden");
addEdge("Safadi Area", "Safadi");
addEdge("Wadad Khoury student center", "cafeteria");
addEdge("cafeteria", "Nicole Hall");
addEdge("Upper gate", "Node 7");
addEdge("cafeteria", "Node 6");
addEdge("Nicole Hall", "Sage Hall");
addEdge("cafeteria", "Sage Hall");
addEdge("Wadad Khoury student center", "Sage Hall");
addEdge("Nicole Hall", "Node 8");
addEdge("cafeteria", "Node 8");
addEdge("Wadad Khoury student center", "Node 8");
addEdge("Lower Gate", "Node 2");
addEdge("Upper gate", "Sage Hall");
addEdge("AKSOB", "Middle Gate");
addEdge("library", "Middle Gate");

const findPathBtn = document.getElementById("findPathBtn");
const user_message = document.getElementById("user_message");

let currentPathLine = null;

function getQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    from: urlParams.get("from"),
    to: urlParams.get("to"),
  };
}

document.addEventListener("DOMContentLoaded", (event) => {
  // const start = startSelect.value;
  // const end = endSelect.value;

  const { from: start, to: end } = getQueryParams();

  if (!start || !end) {
    user_message.textContent = "Please select both start and end points.";
    return;
  }

  if (start === end) {
    user_message.textContent = "Start and end points are the same.";
    return;
  }

  console.log(start, end);
  const path = aStar(start, end);
  if (path) {
    const poiOnly = path.filter((nodeName) => NODES[nodeName].type === "poi");

    const poiNames = poiOnly.map((nodeName) => NODES[nodeName].name);

    user_message.textContent = `Path found: ${poiNames.join(" -> ")}`;

    drawDetailedPath(path);
  } else {
    user_message.textContent = "No path found between the selected points.";
  }
});
function drawDetailedPath(path) {
  if (currentPathLine) {
    map.removeLayer(currentPathLine);
  }

  let latlngs = [];
  for (let i = 0; i < path.length - 1; i++) {
    let startNode = path[i];
    let endNode = path[i + 1];
    let edge = GRAPH[startNode].find((e) => e.node === endNode);

    if (edge && edge.geometry) {
      // Use geometry
      if (i === 0) {
        latlngs.push(...edge.geometry);
      } else {
        // Avoid duplicating the final coordinate of the previous segment
        latlngs.push(...edge.geometry.slice(1));
      }
    } else {
      // Fallback to a straight line
      const startPoint = NODES[startNode];
      const endPoint = NODES[endNode];
      if (i === 0) {
        latlngs.push([startPoint.y, startPoint.x]);
      }
      latlngs.push([endPoint.y, endPoint.x]);
    }
  }

  currentPathLine = L.polyline(latlngs, { color: "blue" }).addTo(map);
  map.fitBounds(currentPathLine.getBounds());
}
