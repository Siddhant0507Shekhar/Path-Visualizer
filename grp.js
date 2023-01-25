// Created a graph of same size  as of matrix where 0 will represent unblocked cell and 1 will represent blocked cell
const graph = Array.from({length: 20}, () => Array.from({length: 40}, () => 0));

// dynamically adding the cells so that we can add row number and column number in data-* value
for (let i = 0; i < graph.length; i++) {
    let row = document.createElement("div")
    row.className = "row";
    let parent_div = document.getElementsByClassName("grid-container");
    parent_div[0].appendChild(row);
    for (let j = 0; j < graph[i].length; j++) {
        let square = document.createElement("div");
        square.className = "columns";

        if (i === 3 && j === 3) {
            square.className = "columns start";
        }
        if (i === 18 && j === 35) {
            square.className = "columns end";
        }
        square.setAttribute("data-row", i);
        square.setAttribute("data-column", j);
        var parent = document.getElementsByClassName("row");
        parent[parent.length - 1].appendChild(square);
    }
}

// squares_list will store all cells so that we can add event_listeners to all.
const squares_list = document.getElementsByClassName("columns");
// Adding event listener to each squares.
for (let i = 0; i < squares_list.length; i++) {
    if ((i === 123) || (i === 755)) {
        continue;
    }
    squares_list[i].addEventListener("pointerover", function () {
        if (this.style.backgroundColor === "black") {
            this.style.backgroundColor = "white";
        } else {
            this.style.backgroundColor = "black"
        }
        var r = this.getAttribute('data-row');
        var c = this.getAttribute("data-column");
        graph[+r][+c] = 1 - graph[+r][+c];
    })
}

// start-[3,3] end-[18,35]
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function showAlert(message) {
    document.getElementById("my-alert-text").innerHTML = message;
    document.getElementById("my-alert").style.display = "block";
}

function hideAlert() {
    document.getElementById("my-alert").style.display = "none";
}

//Breadth First Search Algorithm
async function bfs() {
    let stack = [[3, 3]];
    var visited = Array.from({length: 20}, () => Array.from({length: 40}, () => 0));
    const distance = Array.from({length: 20}, () => Array.from({length: 40}, () => 1000));
    distance[3][3] = 0;
    visited[3][3] = 1;
    while (stack.length > 0) {
        const arr = [];
        for (let i of stack) {

            const neighbours = [[i[0] + 1, i[1]], [i[0] - 1, i[1]], [i[0], i[1] + 1], [i[0], i[1] - 1]];

            for (let j of neighbours) {
                if (j[0] >= 0 && j[0] < 20 && j[1] >= 0 && j[1] < 40 && graph[j[0]][j[1]] === 0 && visited[j[0]][j[1]] === 0) {
                    visited[j[0]][j[1]] = 1;
                    distance[j[0]][j[1]] = 1 + distance[i[0]][i[1]];
                    arr.push(j);
                    var ind = (40 * j[0]) + j[1];
                    squares_list[ind].style.backgroundColor = "grey";
                    await sleep(10);
                }
                if (j[0] === 18 && j[1] === 35) {
                    squares_list[ind].style.backgroundColor = "red";
                    break;
                }
            } // for (let j of neighbours) ends
            if (visited[18][35] === 1) {
                break;
            }
        }// for (let i of stack ends)
        stack = arr.slice(0);
        if (visited[18][35] === 1) {
            break;
        }
    }
    if (visited[18][35] === 0) {
        showAlert("PATH DOES NOT EXIST")
    } else {
        var final_path = [[18, 35]];
        for (let i = distance[18][35]; i > 1; i--) {
            var [r, c] = final_path[final_path.length - 1];
            const ngbr = [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]];
            for (let j of ngbr) {
                if (j[0] >= 0 && j[0] < 20 && j[1] >= 0 && j[1] < 40 && distance[j[0]][j[1]] === i - 1) {
                    final_path.push(j);
                    var indx = (40 * j[0]) + j[1];
                    squares_list[indx].style.backgroundColor = "aqua";
                    squares_list[indx].style.borderColor = "white";
                    await sleep(10);
                    break;
                }
            }
        }
    }
}

// start-[3,3] end-[18,35]
// A* algorithm
async function a_star(g) {
    var stack = [[[3, 3], 47, 32]];
    var visited = Array.from({length: 20}, () => Array.from({length: 40}, () => 0));
    var distance = Array.from({length: 20}, () => Array.from({length: 40}, () => 1000));
    visited[3][3] = 1;
    distance[3][3] = 0;
    while (stack.length > 0) {
        var root = stack.pop();
        var i = root[0][0];
        var j = root[0][1];
        var neighbours = [[i + 1, j], [i - 1, j], [i, j + 1], [i, j - 1]];
        for (let ngh of neighbours) {
            if (ngh[0] >= 0 && ngh[0] < 20 && ngh[1] >= 0 && ngh[1] < 40 && visited[ngh[0]][ngh[1]] === 0 && graph[ngh[0]][ngh[1]] === 0) {
                var dis = Math.abs(3 - ngh[0]) + Math.abs(18 - ngh[0]) + Math.abs(3 - ngh[1]) + Math.abs(35 - ngh[1]);
                var end_dis = Math.abs(18 - ngh[0]) + Math.abs(35 - ngh[1]);
                // dis = Math.sqrt(dis);
                dis += end_dis ** g;
                if (distance[ngh[0]][ngh[1]] > distance[i][j] + 1) {
                    distance[ngh[0]][ngh[1]] = 1 + distance[i][j];
                }
                stack.push([ngh, dis, end_dis]);
                var ind = (ngh[0] * 40) + ngh[1];
                visited[ngh[0]][ngh[1]] = 1;
                await sleep(30);
                if (visited[18][35] === 1) {
                    neighbours = [];
                    break;
                }
                squares_list[ind].style.backgroundColor = "grey";
            } else if (ngh[0] >= 0 && ngh[0] < 20 && ngh[1] >= 0 && ngh[1] < 40 && visited[ngh[0]][ngh[1]] === 1 && graph[ngh[0]][ngh[1]] === 0) {
                if (distance[ngh[0]][ngh[1]] > distance[i][j] + 1) {
                    distance[ngh[0]][ngh[1]] = 1 + distance[i][j];
                }
                else if (distance[ngh[0]][ngh[1]] < distance[i][j] + 1) {
                    distance[i][j] = 1 + distance[ngh[0]][ngh[1]];
                }

            }
            stack.sort((a, b) => b[2] - a[1]);
            stack.sort((a, b) => b[1] - a[1]);
            if (visited[18][35] === 1) {
                stack = [];
                break;
            }
        }
    }
    if (visited[18][35] === 0) {
        showAlert("PATH DOES NOT EXIST");
    } else {
        //Now move from [18,35] to [3,3] to mark shortest path yellow
        stack = [[18, 35]]
        for (let i = distance[18][35]; i > 1; i--) {
            var [i1, i2] = stack[stack.length - 1];
            neighbours = [[i1 + 1, i2], [i1 - 1, i2], [i1, i2 + 1], [i1, i2 - 1]];
            for (let ngh of neighbours) {

                if (ngh[0] >= 0 && ngh[0] < 20 && ngh[1] >= 0 && ngh[1] < 40 && visited[ngh[0]][ngh[1]] === 1 && distance[ngh[0]][ngh[1]] === i - 1) {
                    stack.push(ngh)
                    break;
                }
            }
        }
        stack = stack.slice(1);
        for (i of stack) {
            var ind = (40 * i[0]) + i[1];
            squares_list[ind].style.backgroundColor = "aqua";
            squares_list[ind].style.borderColor = "white"
            await sleep(10);
        }
    }
}

// event listener for run button
var run_button = document.getElementsByClassName("final");
run_button[0].addEventListener('click', function () {
    let select = document.querySelector(".select");
    let selectedValue = select.value;
    if (selectedValue === "1") {
        bfs();
    } else if (selectedValue === "2") {
        var g = document.getElementsByClassName("weight")[0].value;
        if (g.length === 0) {
            a_star(0);
        } else {
            g = +g
            a_star(g);
        }
    }
})
// event listener for reset button
var reset = document.getElementsByClassName("reset")
reset[0].addEventListener('click', function () {
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 40; j++) {
            graph[i][j] = 0
            var indx = (40 * i) + j;
            if ((i === 3 && j === 3) || (i === 18 && j === 35)) {
                if (i === 3 && j === 3) {
                    squares_list[indx].style.backgroundColor = "green";
                    squares_list[indx].style.borderColor = "black";
                } else {
                    squares_list[indx].style.backgroundColor = "red";
                    squares_list[indx].style.borderColor = "black";
                }
            } else {
                squares_list[indx].style.backgroundColor = "white";
                squares_list[indx].style.borderColor = "black";
            }
        }
    }
})
var sameobs = document.getElementsByClassName("sameobs")
sameobs[0].addEventListener('click', function () {
    for (let i = 0; i<20; i++) {
        for (let j = 0; j < 40; j++) {
            if (graph[i][j] === 0) {
                var indx = (40 * i) + j;
                if ((i === 3 && j === 3) || (i === 18 && j === 35)) {
                    if (i === 3 && j === 3) {
                        squares_list[indx].style.backgroundColor = "green";
                        squares_list[indx].style.borderColor = "black";
                    } else {
                        squares_list[indx].style.backgroundColor = "red";
                        squares_list[indx].style.borderColor = "black";
                    }
                } else {
                    squares_list[indx].style.backgroundColor = "white";
                    squares_list[indx].style.borderColor = "black";
                }
            }
        }
    }
})
