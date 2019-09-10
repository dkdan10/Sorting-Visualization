
export default class VisView {
    constructor($visEl, $buttonsDiv) {
        this.$visEl = $visEl
        this.$buttonsDiv = $buttonsDiv

        this.renderQueue = []

        this.config = {
            arrayLength: 10,
            sortMethod: 0
        }
        this.sortingArray = []
        this.resetSortingArray()

        this.setupButtons()

        // this.mergeSort("first", 0)

        this.renderQueueInterval = setInterval(() => {
            this.checkRenderQueue();
        }, 200);
    }

    setupButtons() {
        const startMergeSearchButton = $("<input type='button' value='Start Merge Search'/>").click((e) => {
            e.preventDefault();
            if (!this.renderQueue.length) this.mergeSort("first", 0)
        })

        const changeArrayLength = $("<input type='text' value='10'/>").change((e) => {
            const newArraySize = parseInt(e.target.value)
            if (newArraySize && newArraySize < 100 && newArraySize > 0) {
                this.config.arrayLength = newArraySize
                this.resetSortingArray()
            } else if (newArraySize > 100) {
                this.config.arrayLength = 100
                e.target.value = 100
                this.resetSortingArray()
            } else if (newArraySize < 1) {
                this.config.arrayLength = 1
                e.target.value = 1
                this.resetSortingArray()
            }
        })

        const shuffleButton = $("<input type='button' value='New Array'/>").click((e) => {
            e.preventDefault();
            this.resetSortingArray();
        })

        this.$buttonsDiv.append(startMergeSearchButton)
        this.$buttonsDiv.append(changeArrayLength)
        this.$buttonsDiv.append(shuffleButton)
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
            this.mergeSort(left, index), this.mergeSort(right, index + middle), index
        );
        this.sortingArray = this.sortingArray.slice(0, index).concat(sortedHalves).concat(this.sortingArray.slice(index + sortedHalves.length))
        this.pushToRenderQueue(this.sortingArray)
        return sortedHalves
    }

    checkRenderQueue () {
        if (this.renderQueue.length) {
            const stateToRender = this.renderQueue.shift()
            this.render(stateToRender.arrayState, stateToRender.extra.selectedIdxs)
        }
    }

    pushToRenderQueue (arrToRender, extra = {}) {
        this.renderQueue.push({
            arrayState: arrToRender.slice(),
            extra
        })
    }

    merge(left, right, startIndex) {
        let resultArray = [], leftIndex = 0, rightIndex = 0;

        // We will concatenate values into the resultArray in order
        while (leftIndex < left.length && rightIndex < right.length) {
            const arrayToRender = this.sortingArray.slice(0, startIndex).concat(resultArray
                .concat(left.slice(leftIndex))
                .concat(right.slice(rightIndex))
            ).concat(this.sortingArray.slice(startIndex + right.length + left.length))

            this.pushToRenderQueue(arrayToRender, {selectedIdxs: 
                {
                    [startIndex + leftIndex]: true, 
                    [startIndex + rightIndex + left.length - leftIndex]: true
                }
            })
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

    render (arr, selectedIdxs) {
        this.$visEl.empty();
        const arrayUl = $("<ul>").addClass("visUl")
        for (let i = 0; i < arr.length; i++) {
            const el = arr[i];
            const nextLi = $("<li>").append(`${el}`).addClass("visLi").height(Math.floor(el / this.config.arrayLength * 10) + "%")
            if (selectedIdxs && selectedIdxs[i]) {
                nextLi.addClass("selected")
            }
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
