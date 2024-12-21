<?php
header('Content-Type: application/json');

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
            return ['error' => "Invalid locations specified."];
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
            return ['error' => "No path found from $start to $destination."];
        }

        $path = [];
        for ($at = $destination; $at !== null; $at = $previous[$at]) {
            array_unshift($path, $at);
        }

        return [
            'path' => $path,
            'total_distance' => $distances[$destination]
        ];
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

// Add locations and connections as in the original code
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

// Add connections as in the original code
$campus->addConnection("Upper Gate", "Gathering Area - Upper", 2);
$campus->addConnection("Gathering Area - Upper", "Wadad Khoury Student Center (WSK) - Floor 3", 1);
// Continue adding connections...

// Handle API request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $arr = $data['arr'] ?? null;

    if ($arr && count($arr) === 2) {
        $start = $arr[0];
        $destination = $arr[1];
        echo json_encode($campus->findShortestPath($start, $destination));
    } else {
        echo json_encode(['error' => 'Invalid input array']);
    }
}
?>
