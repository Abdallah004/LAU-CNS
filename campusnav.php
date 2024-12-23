<?php
class CampusNavigationSystem {
    private $adjList = [];

    public function addLocation($location) {
        if (!isset($this->adjList[$location])) {
            $this->adjList[$location] = [];
        }
    }

    public function addConnection($from, $to, $distance) {
        $this->adjList[$from][] = new Edge($to, $distance);
        $this->adjList[$to][] = new Edge($from, $distance);
    }

    public function findShortestPath($start, $destination) {
        if (!isset($this->adjList[$start]) || !isset($this->adjList[$destination])) {
            return "Error: Invalid locations specified.";
        }

        $distances = array_fill_keys(array_keys($this->adjList), PHP_INT_MAX);
        $previous = [];
        $pq = new SplPriorityQueue();

        $distances[$start] = 0;
        $pq->insert(new Edge($start, 0), 0);

        while (!$pq->isEmpty()) {
            $current = $pq->extract();
            $currentLocation = $current->destination;

            if ($current->distance > $distances[$currentLocation]) continue;

            foreach ($this->adjList[$currentLocation] as $neighbor) {
                $newDist = $distances[$currentLocation] + $neighbor->distance;
                if ($newDist < $distances[$neighbor->destination]) {
                    $distances[$neighbor->destination] = $newDist;
                    $previous[$neighbor->destination] = $currentLocation;
                    $pq->insert(new Edge($neighbor->destination, $newDist), -$newDist);
                }
            }
        }

        if ($distances[$destination] == PHP_INT_MAX) {
            return "No path found from $start to $destination.";
        }

        $path = [];
        for ($at = $destination; $at !== null; $at = $previous[$at]) {
            array_unshift($path, $at);
        }

        $result = "Shortest path from $start to $destination:<br>";
        foreach ($path as $i => $location) {
            if ($i < count($path) - 1) {
                $result .= ($i + 1) . ". Walk from $location to " . $path[$i + 1] . "<br>";
            }
        }
        $result .= "Total Distance: " . $distances[$destination] . "<br>";
        return $result;
    }

    public function getLocations() {
        return array_keys($this->adjList);
    }

    public function connectBuildingFloors($building, $totalFloors, $startFloor) {
        for ($i = $startFloor; $i < $totalFloors; $i++) {
            $this->addConnection("$building - Floor $i", "$building - Floor " . ($i + 1), 1);
        }
    }
}

class Edge {
    public $destination;
    public $distance;

    public function __construct($destination, $distance) {
        $this->destination = $destination;
        $this->distance = $distance;
    }
}

// Initialize the campus navigation system
$campus = new CampusNavigationSystem();

// Locations and connections
$locations = [
    "Upper Gate", "Gathering Area - Upper", "Wadad Khoury Student Center (WSK) - Floor 3",
    "Fountain Area", "Orme-Gray", "Gathering Area - Middle", "Adnan Kassar School of Business (AKSB) - Floor 9",
    "Riyad Nassar Library", "Middle Gate", "Benches and Tents", "Lower Gate", "Gathering Area - Lower",
    "Shannon Hall (SHN) - Floor 1", "Irwin Hall (IH) - Floor 1", "Sage Hall (SH) - Floor 2",
    "Gymnasium - Floor 4", "Gymnasium - Floor 5", "Nicol Hall (NH) - Floor 2", "Safadi Fine Arts (SFA) - Floor 2",
    "Safadi Fine Arts (SFA) - Floor 4", "Safadi Fine Arts Gathering Area", "Garden",
    "Riyad Nassar Library - Floor 8"
];

foreach ($locations as $location) {
    $campus->addLocation($location);
}

// Add connections
//$campus->addConnection("Riyad Nassar Library - Floor 8", "Adnan Kassar School of Business (AKSB) - Floor 9", 1);
        $campus->addConnection("Upper Gate", "Gathering Area - Upper", 2);

       $campus->addConnection("Gathering Area - Upper", "Wadad Khoury Student Center (WSK) - Floor 3", 1);
       $campus->addConnection("Gathering Area - Upper", "Fountain Area", 4);
       $campus->addConnection("Gathering Area - Upper", "Nicol Hall (NH) - Floor 2", 1);
       $campus->addConnection("Gathering Area - Upper", "Sage Hall (SH) - Floor 2", 2);

       $campus->addConnection("Wadad Khoury Student Center (WSK) - Floor 3", "Nicol Hall (NH) - Floor 2", 1);
        
       $campus->addConnection("Fountain Area", "Gathering Area - Upper", 4);
       $campus->addConnection("Fountain Area", "Orme-Gray", 1);
       $campus->addConnection("Fountain Area", "Sage Hall (SH) - Floor 2", 1);

       $campus->addConnection("Orme-Gray", "Fountain Area", 1);
       $campus->addConnection("Orme-Gray", "Gathering Area - Middle", 1);

       $campus->addConnection("Adnan Kassar School of Business (AKSB) - Floor 9", "Gathering Area - Middle", 2);
       $campus->addConnection("Adnan Kassar School of Business (AKSB) - Floor 9", "Riyad Nassar Library", 1);

       $campus->addConnection("Gathering Area - Middle", "Adnan Kassar School of Business (AKSB) - Floor 9", 2);
       $campus->addConnection("Gathering Area - Middle", "Middle Gate", 2);
       $campus->addConnection("Gathering Area - Middle", "Benches and Tents", 1);
       $campus->addConnection("Gathering Area - Middle", "Orme-Gray", 1);

       $campus->addConnection("Middle Gate", "Gathering Area - Middle", 2);

       $campus->addConnection("Benches and Tents", "Gathering Area - Middle", 1);

       $campus->addConnection("Lower Gate", "Gathering Area - Lower", 1);

       $campus->addConnection("Gathering Area - Lower", "Lower Gate", 2);
       $campus->addConnection("Gathering Area - Lower", "Shannon Hall (SHN) - Floor 1", 2);
       $campus->addConnection("Gathering Area - Lower", "Irwin Hall (IH) - Floor 1", 2);
       $campus->addConnection("Gathering Area - Lower", "Sage Hall (SH) - Floor 2", 3);
       $campus->addConnection("Gathering Area - Lower", "Gymnasium - Floor 4", 3);

       $campus->addConnection("Shannon Hall (SHN) - Floor 1", "Gathering Area - Lower", 2);
       $campus->addConnection("Shannon Hall (SHN) - Floor 1", "Sage Hall (SH) - Floor 2", 2);
       $campus->addConnection("Shannon Hall (SHN) - Floor 1", "Irwin Hall (IH) - Floor 1", 1);

       $campus->addConnection("Irwin Hall (IH) - Floor 1", "Gathering Area - Lower", 2);
       $campus->addConnection("Irwin Hall (IH) - Floor 2", "Sage Hall (SH) - Floor 2", 2);
       $campus->addConnection("Irwin Hall (IH) - Floor 2", "Shannon Hall (SHN) - Floor 1", 1);
       $campus->addConnection("Irwin Hall (IH) - Floor 1", "Gymnasium - Floor 4", 1);
       $campus->addConnection("Irwin Hall (IH) - Floor 1", "Gymnasium - Floor 5", 1);

       $campus->addConnection("Sage Hall (SH) - Floor 2", "Gathering Area - Lower", 3);
       $campus->addConnection("Sage Hall (SH) - Floor 2", "Shannon Hall (SHN) - Floor 1", 2);
       $campus->addConnection("Sage Hall (SH) - Floor 2", "Irwin Hall (IH) - Floor 1", 2);
       $campus->addConnection("Sage Hall (SH) - Floor 2", "Fountain Area", 1);
       $campus->addConnection("Sage Hall (SH) - Floor 2", "Gathering Area - Upper", 2);

       $campus->addConnection("Nicol Hall (NH) - Floor 2", "Gathering Area - Upper", 2);
       $campus->addConnection("Nicol Hall (NH) - Floor 2", "Safadi Fine Arts (SFA) - Floor 6", 1);

       $campus->addConnection("Safadi Fine Arts (SFA) - Floor 2", "Gymnasium - Floor 4", 1);
       $campus->addConnection("Safadi Fine Arts (SFA) - Floor 4", "Safadi Fine Arts Gathering Area", 1);
       $campus->addConnection("Safadi Fine Arts Gathering Area", "Garden", 1);

       $campus->addConnection("Riyad Nassar Library - Floor 8", "Adnan Kassar School of Business (AKSB) - Floor 9", 1);

       $campus->addConnection("Safadi Fine Arts (SFA) - Floor 1", "University Services", 1);
       $campus->addConnection("Gathering Area - Lower", "University Services", 2);
       $campus->addConnection("Gymnasium - Floor 4", "University Services", 3);
       $campus->addConnection("Irwin Hall (IH) - Floor 1", "University Services", 2);

// Sequential floors
$campus->connectBuildingFloors("Shannon Hall (SHN)", 4, 1);
$campus->connectBuildingFloors("Safadi Fine Arts (SFA)", 6, 1);
$campus->connectBuildingFloors("Gymnasium", 5, 2);
$campus->connectBuildingFloors("Adnan Kassar School of Business (AKSB)", 16, 9);
$campus->connectBuildingFloors("Sage Hall (SH)", 5, 2);
$campus->connectBuildingFloors("Nicol Hall (NH)", 5, 1);
$campus->connectBuildingFloors("Irwin Hall (IH)", 7, 1);
$campus->connectBuildingFloors("Wadad Khoury Student Center (WSK)", 5, 1);
$campus->connectBuildingFloors("Riyad Nassar Library", 13, 2);
$campus->connectBuildingFloors("University Services", 5, 2);

// Connect specific floors of University Services to other buildings
$campus->addConnection("University Services - Floor 5", "Riyad Nassar Library - Floor 13", 5);
$campus->addConnection("University Services - Floor 2", "Adnan Kassar School of Business (AKSB) - Floor 9", 3);
$campus->addConnection("University Services - Floor 3", "Gathering Area - Lower", 2);
$campus->addConnection("University Services - Floor 4", "Gymnasium - Floor 4", 3);



// Handle form submission
$result = "";
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $start = $_POST['start'] ?? '';
    $destination = $_POST['destination'] ?? '';
    $result = $campus->findShortestPath($start, $destination);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Campus Navigation System</title>
</head>
<body>
    <h1>Campus Navigation System</h1>
    <h3>Available Locations:</h3>
    <ul>
        <?php foreach ($campus->getLocations() as $location): ?>
            <li><?php echo htmlspecialchars($location); ?></li>
        <?php endforeach; ?>
    </ul>

    <form method="POST">
        <label for="start">Enter your start location:</label><br>
        <input type="text" id="start" name="start" required><br><br>

        <label for="destination">Enter your destination location:</label><br>
        <input type="text" id="destination" name="destination" required><br><br>

        <button type="submit">Find Shortest Path</button>
    </form>

    <?php if (!empty($result)): ?>
        <h3>Result:</h3>
        <p><?php echo $result; ?></p>
    <?php endif; ?>
</body>
</html>