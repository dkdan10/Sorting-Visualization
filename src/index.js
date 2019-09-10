import visView from "./vis_view"

$(() => {
    const visField = $('#sorting-vis');
    const buttonsDiv = $('#buttons-div');
    new visView(visField, buttonsDiv);
})