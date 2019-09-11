import MergeSortVisHelper from "./sorts/merge_sort";

export default class VisView {
    constructor($visEl, $buttonsDiv) {
        this.$visEl = $visEl
        this.$buttonsDiv = $buttonsDiv

        this.pushToRenderQueue = this.pushToRenderQueue.bind(this)
        this.renderQueue = []
        this.config = {
            arrayLength: 10,
            sortMethod: 0
        }
        this.mergeSortHelper = new MergeSortVisHelper(this.pushToRenderQueue)

        this.sortingArray = []
        this.resetSortingArray()

        this.setupButtons()

        this.renderQueueInterval = setInterval(() => {
            this.checkRenderQueue();
        }, 200);
    }

    setupButtons() {
        const startMergeSearchButton = $("<input type='button' value='Start Merge Search'/>").click((e) => {
            e.preventDefault();
            if (!this.renderQueue.length) this.mergeSortHelper.sort(this.sortingArray.slice())
        })

        const changeArrayLength = $("<input type='text' value='10'/>").change((e) => {
            const newArraySize = parseInt(e.target.value)
            if (newArraySize && newArraySize <= 100 && newArraySize > 0) {
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

    render (arr, selectedIdxs) {
        this.$visEl.empty();
        const arrayUl = $("<ul>").addClass("visUl")
        for (let i = 0; i < arr.length; i++) {
            const el = arr[i];
            const nextLi = $("<li>").append(`<span>${el}</span>`).addClass("visLi").height(Math.floor(el / this.config.arrayLength * 10) + "%")
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
