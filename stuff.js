sorted = 0;
required_sorted = 0;

addEventListener('load', onload);

addEventListener('popstate', onload);

function onload() {
    let params = new URLSearchParams(window.location.search);
    if (!params.has('page')) {
        let nextUrl = new URL(window.location);
        nextUrl.search = new URLSearchParams({ page: 'input' })
        history.replaceState({}, '', nextUrl.toString());
    }
    if (params.get('page') == 'rank') {
        let array = params.get('array').split(',');

        text = "";
        array.reverse();
        for (i in array) {
            text += (1 + parseInt(i)) + ". " + array[i] + "<br//>";
        }

        //sets the rank and displays the ranks
        document.getElementById("output").innerHTML = text;
        document.getElementById("input").style.display = "none";
        document.getElementById("sorting").style.display = "none";
        document.getElementById("ranks").style.display = null;
        document.getElementById("sharecard").style.display = null;
        let homeUrl = new URL(window.location);
        homeUrl.search = new URLSearchParams({ page: 'input' });
        document.getElementById("homeurl").href = homeUrl.toString();
    }
    if (params.get('page') == 'input') {
        document.getElementById("input").style.display = null;
        document.getElementById("sorting").style.display = "none";
        document.getElementById("ranks").style.display = "none";
        document.getElementById("sharecard").style.display = "none";
        if (params.has('array')) {
            document.getElementById("csv_input").value = params.get('array');
        }
    }
}

/** returns the factorial of the input */
const factorial = n => n <= 1 ? 1 : n * factorial(n - 1);

/** updates a displayed percentage for how far through the sorting the user is */
function update_percentage() {
    document.getElementById("percent").innerHTML = "(" + sorted + "/" + required_sorted + ")";
}

function update_estimates() {
    let count = document.getElementById("csv_input").value.split(',').length;
    let all = Math.ceil(Math.log2(factorial(count)));
    let five
    if (count > 5) {
        five = Math.ceil(Math.log2(factorial(5)) + (Math.log2(5) / 2 + 1) * (count - 5));
    } else {
        five = all;
    }

    document.getElementById("prediction all").innerHTML = all;
    document.getElementById("prediction five").innerHTML = five;
}

async function main(topTen = false) {
    sorted = 0;

    //gets the array that is to be sorted
    let array = document.getElementById("csv_input").value.split(',');
    array = array.map((str) => str.trim());

    let thisUrl = new URL(window.location);
    thisUrl.search = new URLSearchParams({ array: array, page: 'input' })

    history.replaceState({}, '', thisUrl.toString());

    //estimates the required amount of comparisons to sort the array based on the log2(x!) rule
    if (topTen && array.length > 5) {
        required_sorted = Math.ceil(Math.log2(factorial(5)) + (Math.log2(5) / 2 + 1) * (array.length - 5));
    } else {
        required_sorted = Math.ceil(Math.log2(factorial(array.length)));
    }
    update_percentage();

    //switches from input mode to sorting mode
    document.getElementById("input").style.display = "none";
    document.getElementById("sorting").style.display = null;

    //hooks the update_percentage call to each tag for sorting so it updates each click
    document.getElementById("tag_1_box").addEventListener("click", () => { sorted++; update_percentage() });
    document.getElementById("tag_2_box").addEventListener("click", () => { sorted++; update_percentage() });

    //sorts the list using mergeSort with the default compare
    if (topTen) {
        array = await mergeSortTop(array, 5);
    } else {
        array = await mergeSort(array);
    }

    //generates the next url for the website
    let nextUrl = new URL(window.location);
    nextUrl.search = new URLSearchParams({ array: array, page: 'rank' })

    history.pushState({}, '', nextUrl.toString());

    //generates the rank list text based on the new sorted array
    text = "";
    array.reverse();
    for (i in array) {
        text += (1 + parseInt(i)) + ". " + array[i] + "<br//>";
    }

    //sets the rank and displays the ranks
    document.getElementById("output").innerHTML = text;
    document.getElementById("sorting").style.display = "none";
    document.getElementById("ranks").style.display = null;
    document.getElementById("sharecard").style.display = null;
}

/**
 * This takes in the array, and returns a sorted array based on the passed comparison function.
 * The returned array is sorted ascending with the comparison returning true if the first passed value has a higher value.
 */
async function mergeSort(array, comp = compare) {
    //base case
    if (array.length <= 1) {
        return array;
    }

    //splits the array and calls the algorithm on each half
    let m = Math.floor(array.length / 2)

    let arrayL = await mergeSort(array.slice(0, m), comp);
    let arrayR = await mergeSort(array.slice(m), comp);


    let output = new Array();

    //continues while each side still exists and adds the first value to the end of a new array
    while (arrayL.length > 0 && arrayR.length > 0) {
        if (await comp(arrayL[0], arrayR[0])) {
            output.push(arrayR.shift());
        } else {
            output.push(arrayL.shift());
        }
    }

    //if one side is out, it adds the remaining side to the end of the array
    output.push(...arrayR);
    output.push(...arrayL);

    return output;

}

/**
 * Returns true if the first value is bigger than or equal to the second based on user input.
 */
async function compare(a, b) {
    //sets the values of the tags on the screen
    let left = document.getElementById("tag_1");
    let right = document.getElementById("tag_2");
    left.innerHTML = a;
    right.innerHTML = b;

    //schedules the event listeners through a promise and awaits the promise
    let abort = new AbortController();
    let output = await new Promise(
        (resolve, reject) => {
            left.parentElement.addEventListener("click", () => resolve(true), { signal: abort.signal })
            right.parentElement.addEventListener("click", () => resolve(false), { signal: abort.signal })
        }
    )
    //aborts the remaining listeners
    abort.abort();

    return output;
}

async function mergeSortTop(array, sortAmount, comp = compare) {
    topOfArray = await mergeSort(array.slice(0, sortAmount), comp);
    array = array.slice(sortAmount);
    for (i of array) {
        if (await comp(i, topOfArray[0])) {
            let low = 1;
            let high = topOfArray.length - 1;
            while (low <= high) {
                mid = Math.floor((low + high) / 2)
                if (await comp(topOfArray[mid], i)) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            }
            topOfArray.splice(low, 0, i);
            topOfArray.shift();
        }
    }
    return topOfArray;
}