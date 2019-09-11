export default class MergeSortVisHelper {
    constructor (pushToRenderQueue) {
        this.pushToRenderQueue = pushToRenderQueue
        this.arrayToSort = []
    }

    sort(arr) {
        this.arrayToSort = arr.slice()
        this.mergeSort(this.arrayToSort, 0)
    }

    mergeSort(arr, index) {
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
        this.arrayToSort = this.arrayToSort.slice(0, index).concat(sortedHalves).concat(this.arrayToSort.slice(index + sortedHalves.length))
        this.pushToRenderQueue(this.arrayToSort)
        return sortedHalves
    }

    merge(left, right, startIndex) {
        let resultArray = [], leftIndex = 0, rightIndex = 0;

        // We will concatenate values into the resultArray in order
        while (leftIndex < left.length && rightIndex < right.length) {
            const arrayToRender = this.arrayToSort.slice(0, startIndex).concat(resultArray
                .concat(left.slice(leftIndex))
                .concat(right.slice(rightIndex))
            ).concat(this.arrayToSort.slice(startIndex + right.length + left.length))

            this.pushToRenderQueue(arrayToRender, {
                selectedIdxs:
                {
                    [startIndex + leftIndex]: true,
                    [startIndex + rightIndex + left.length]: true
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

}