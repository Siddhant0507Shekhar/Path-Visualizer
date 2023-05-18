# Shortest Path Finding Visualizer
This project is a web application that allows users to visualize the shortest path between two points on a grid, considering user-defined obstacles.
It uses HTML, CSS, and JavaScript to provide an interactive experience.

## Features
**Shortest Path Algorithms**: The application implements two popular algorithms, namely Breadth First Search and A-star, to find the 
                          shortest path between the start and end points.

**User-Defined Obstacles**: Users can place obstacles on the grid to simulate real-world scenarios. These obstacles act as barriers that the algorithms must navigate around to find the optimal path.

**Heuristic Functions**: The A-star algorithm utilizes user-defined heuristic functions based on Euclidean distance to guide its search. By analyzing different heuristic functions, users can observe how the A-star algorithm behaves differently in various scenarios.

## Usage
*  Open the web application by clicking on the following link: Shortest Path Finding Visualizer

*  Add obstacles to the grid by clicking on the desired cells in mobile device and by hovering in desktop device. Obstacles act as barriers that the algorithms will navigate around.

*  Choose the algorithm you want to visualize (Breadth First Search or A-star) from the options provided.

*  Click the "Run" button to start the algorithm and observe the process of finding the shortest path.

*  Analyze the results and observe how different heuristic functions affect the performance of the A-star algorithm.
*  For A* algorithm:- I have keep the heuristic function variable that means user can change it and observe the time complexity of A* algorithm with same obstacles over different heuristic functions. Generally for grid, heuristic function is taken as the sum of euclidean distances with starting point and ending point. But in our case the constant for euclidean distance of ending point is taken as variable.

In our case:-
Heuristic Function = E.D with start point + (1+x)*E.D with end point

Note:-If x is not equals to 0,then for that heuristic function , A* algorithm doesn't guarantee the path which it finds to be shortest

Feel free to explore the application and experiment with different grid configurations and algorithms to gain a deeper understanding of shortest path finding.


## Contributions
Contributions to this project are welcome. If you encounter any issues or have suggestions for improvement, please create an issue or submit a pull request.
