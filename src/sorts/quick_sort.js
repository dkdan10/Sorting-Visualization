function swap(items, leftIndex, rightIndex) {
    const temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

export default class QuickortVisHelper {
    constructor(pushToRenderQueue) {
        this.pushToRenderQueue = pushToRenderQueue
    }

    sort(arr) {
        const sortedArr = this.quickSort(arr.slice(), 0, arr.length - 1 )
        this.pushToRenderQueue(sortedArr)
        return sortedArr
    }

    partition(items, left, right) {
        let pivot = items[Math.floor((right + left) / 2)], //middle element
            i = left, //left pointer
            j = right; //right pointer
        while (i <= j) {
            while (items[i] < pivot) {
                i++;
            }
            while (items[j] > pivot) {
                j--;
            }
            if (i <= j) {
                swap(items, i, j); //swapping two elements
                this.pushToRenderQueue(items, {
                    selectedIdxs:
                    {
                        [i]: true,
                        [j]: true
                    }
                })
                i++;
                j--;
            }
        }
        return i;
    }

    quickSort(items, left, right) {
        let index;
        if (items.length > 1) {
            index = this.partition(items, left, right); //index returned from partition
            if (left < index - 1) { //more elements on the left side of the pivot
                this.quickSort(items, left, index - 1);
            }
            if (index < right) { //more elements on the right side of the pivot
                this.quickSort(items, index, right);
            }
        }
        return items;
    }

}