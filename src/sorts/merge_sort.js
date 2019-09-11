export default class MergeSortVisHelper {
    constructor (pushToRenderQueue) {
        this.pushToRenderQueue = pushToRenderQueue
        this.arrayToSort = []
    }

    sort(arr) {
        this.arrayToSort = arr.slice()
        return this.mergeSort(this.arrayToSort, 0)
    }

    mergeSort(arr, index) {
        if (arr.length <= 1) {
            return arr;
        }
        const middle = Math.floor(arr.length / 2);

        const left = arr.slice(0, middle);
        const right = arr.slice(middle);

        const sortedHalves = this.merge(
            this.mergeSort(left, index), this.mergeSort(right, index + middle), index
        );
        this.arrayToSort = this.arrayToSort.slice(0, index).concat(sortedHalves).concat(this.arrayToSort.slice(index + sortedHalves.length))
        this.pushToRenderQueue(this.arrayToSort)
        return sortedHalves
    }

    merge(left, right, startIndex) {
        let resultArray = [], leftIndex = 0, rightIndex = 0;

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
                leftIndex++;
            } else {
                resultArray.push(right[rightIndex]);
                rightIndex++;
            }
        }

        return resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
    }

}