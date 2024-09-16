type Slide = {
    id: string;
    elements: Element[];
    background: string;
};

type Presentation = {
    title: string;
    slides: Slide[];
};

type BaseObj = {
    id: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
};

type Text = BaseObj & {
    type: "text";
    content: string;
    fontSize: number;
    fontFamily: string;
};

type Image = BaseObj & {
    type: "image";
    src: string;
};

type Element = Text | Image;

type SlideCollection = Slide[];

type Selection = {
    slideId: string;
    elementId?: string;
};

//  функции

function changePresentationTitle(presentation: Presentation, newTitle: string): Presentation {
    return { 
        ...presentation, //получить все что было из Presentation и добавить
        title: newTitle 
    };
}

function addSlide(presentation: Presentation, newSlide: Slide): Presentation {
    return {
        ...presentation, 
        slides: [...presentation.slides, newSlide]
    }
}

function removeSlide(presentation: Presentation, slideId: string): Presentation {
    return {
        ...presentation, 
        slides: presentation.slides.filter(sl => sl.id !== slideId) 
        //.filter(), который возвращает новый массив, без слайдов, у которчх id совпадает с slideId
    };
}

function moveSlide(presentation: Presentation, fromIndex: number, toIndex: number): Presentation {
    const slides = [...presentation.slides];
    const [movedSlide] = slides.splice(fromIndex, 1); //Метод splice удаляет один элемент из массива на позиции fromIndex и возвращает массив, содержащий удаленные элементы 
    slides.splice(toIndex, 0, movedSlide); //Второй аргумент (0) означает, что мы не удаляем элементы из массива, а только добавляем новый элемент (movedSlide)
    return { ...presentation, slides };
}

function addElementToSlide(slide: Slide, newElement: Element): Slide {
    return { 
        ...slide, 
        elements: [...slide.elements, newElement] 
    };
}

function removeElementFromSlide(slide: Slide, elementId: string): Slide {
    return { 
        ...slide, 
        elements: slide.elements.filter(el => el.id !== elementId) 
    };
}

function moveElement(slide: Slide, elementId: string, newPosition: { x: number; y: number }): Slide {
    return {
        ...slide,
        elements: slide.elements.map(el => el.id === elementId ? { ...el, position: newPosition } : el)
        // ? тогда : иначе
        //Если идентификатор не совпадает, элемент остается без изменений.
    };
}   

function resizeElement(slide: Slide, elementId: string, newSize: { width: number; height: number }): Slide {
    return {
        ...slide,
        elements: slide.elements.map(el => el.id === elementId ? { ...el, size: newSize } : el)
    };
}

function updateTextElement(slide: Slide, elementId: string, newText: string): Slide {
    return {
        ...slide,
        elements: slide.elements.map(
            el => el.id === elementId && el.type === 'text' ? { ...el, content: newText } : el
        )
    };
}

function changeTextSize(slide: Slide, elementId: string, newFontSize: number): Slide {
    return {
        ...slide,
        elements: slide.elements.map(el =>
            el.id === elementId && el.type === 'text' ? { ...el, fontSize: newFontSize } : el
        )
    };
}

function changeTextFontFamily(slide: Slide, elementId: string, newFontFamily: string): Slide {
    return {
        ...slide,
        elements: slide.elements.map(el =>
            el.id === elementId && el.type === 'text' ? { ...el, fontFamily: newFontFamily } : el
        )
    };
}

function changeSlideBackground(slide: Slide, newBackground: string): Slide {
    return { ...slide, background: newBackground };
}
