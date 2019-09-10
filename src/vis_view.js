
export default class VisView {
    constructor($visEl) {
        this.$visEl = $visEl

        this.renderQueue = []

        this.config = {
            arrayLength: 10,
            sortMethod: 0
        }
        this.sortingArray = []
        this.resetSortingArray()
        this.mergeSort("first", 0)

        this.renderQueueInterval = setInterval(() => {
            this.checkRenderQueue();
        }, 1000);
    }

    mergeSort(arr, index) {
        if (arr === "first") arr = this.sortingArray
        if (arr.length <= 1) {
            return arr;
        }
        // In order to divide the array in half, we need to figure out the middle
        const middle = Math.floor(arr.length / 2);

        // This is where we will be dividing the array into left and right
        const left = arr.slice(0, middle);
        const right = arr.slice(middle);

        // Using recursion to combine the left and right
        const sortedHalves = this.merge(
            this.mergeSort(left, index), this.mergeSort(right, index + middle)
        );
        this.sortingArray = this.sortingArray.slice(0, index).concat(sortedHalves).concat(this.sortingArray.slice(index + sortedHalves.length))
        this.pushToRenderQueue(this.sortingArray)
        return sortedHalves
    }

    checkRenderQueue () {
        if (this.renderQueue.length) {
            this.render(this.renderQueue.shift())
        }
    }

    pushToRenderQueue (arrToRender) {
        this.renderQueue.push(arrToRender.slice())
    }

    merge(left, right) {
        let resultArray = [], leftIndex = 0, rightIndex = 0;

        // We will concatenate values into the resultArray in order
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                resultArray.push(left[leftIndex]);
                leftIndex++; // move left array cursor
            } else {
                resultArray.push(right[rightIndex]);
                rightIndex++; // move right array cursor
            }
        }
        // We need to concat here because there will be one element remaining
        // from either left OR the right
        return resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
    }

    render (arr) {
        this.$visEl.empty();
        const arrayUl = $("<ul>").addClass("visUl")
        for (let i = 0; i < arr.length; i++) {
            const el = arr[i];
            const nextLi = $("<li>").append(`${el}`).addClass("visLi").height(Math.floor(el / this.config.arrayLength * 10) + "%")
            arrayUl.append(nextLi)
        }
        this.$visEl.append(arrayUl)
    }

    resetSortingArray () {
        this.sortingArray = []
        for (let i = 0; i < this.config.arrayLength; i++) {
            const randomNumber = Math.floor(Math.random() * this.config.arrayLength * 10) + 1
            this.sortingArray.push(randomNumber)
        }
        this.render(this.sortingArray)
    }

}
