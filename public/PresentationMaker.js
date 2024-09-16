//  функции
function changePresentationTitle(presentation, newTitle) {
    return Object.assign(Object.assign({}, presentation), { title: newTitle });
}
function addSlide(presentation, newSlide) {
    return Object.assign(Object.assign({}, presentation), { slides: [...presentation.slides, newSlide] });
}
function removeSlide(presentation, slideId) {
    return Object.assign(Object.assign({}, presentation), { slides: presentation.slides.filter(sl => sl.id !== slideId) });
}
function moveSlide(presentation, fromIndex, toIndex) {
    const slides = [...presentation.slides];
    const [movedSlide] = slides.splice(fromIndex, 1); //Метод splice удаляет один элемент из массива на позиции fromIndex и возвращает массив, содержащий удаленные элементы 
    slides.splice(toIndex, 0, movedSlide); //Второй аргумент (0) означает, что мы не удаляем элементы из массива, а только добавляем новый элемент (movedSlide)
    return Object.assign(Object.assign({}, presentation), { slides });
}
function addElementToSlide(slide, newElement) {
    return Object.assign(Object.assign({}, slide), { elements: [...slide.elements, newElement] });
}
function removeElementFromSlide(slide, elementId) {
    return Object.assign(Object.assign({}, slide), { elements: slide.elements.filter(el => el.id !== elementId) });
}
function moveElement(slide, elementId, newPosition) {
    return Object.assign(Object.assign({}, slide), { elements: slide.elements.map(el => el.id === elementId ? Object.assign(Object.assign({}, el), { position: newPosition }) : el) });
}
function resizeElement(slide, elementId, newSize) {
    return Object.assign(Object.assign({}, slide), { elements: slide.elements.map(el => el.id === elementId ? Object.assign(Object.assign({}, el), { size: newSize }) : el) });
}
function updateTextElement(slide, elementId, newText) {
    return Object.assign(Object.assign({}, slide), { elements: slide.elements.map(el => el.id === elementId && el.type === 'text' ? Object.assign(Object.assign({}, el), { content: newText }) : el) });
}
function changeTextSize(slide, elementId, newFontSize) {
    return Object.assign(Object.assign({}, slide), { elements: slide.elements.map(el => el.id === elementId && el.type === 'text' ? Object.assign(Object.assign({}, el), { fontSize: newFontSize }) : el) });
}
function changeTextFontFamily(slide, elementId, newFontFamily) {
    return Object.assign(Object.assign({}, slide), { elements: slide.elements.map(el => el.id === elementId && el.type === 'text' ? Object.assign(Object.assign({}, el), { fontFamily: newFontFamily }) : el) });
}
function changeSlideBackground(slide, newBackground) {
    return Object.assign(Object.assign({}, slide), { background: newBackground });
}
//# sourceMappingURL=PresentationMaker.js.map