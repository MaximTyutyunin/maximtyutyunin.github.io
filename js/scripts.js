window.addEventListener('DOMContentLoaded', () => {
    const currentLocation = location.href // get url of the page to use it for checking 
    
    
    
    function stopRotateElement(element) {
      element.style.transform = 'perspective(500px) rotate3d(0,0,0, 10deg)'
    }
    
    function rotateElement(element, angle, event) {
        const current = event.target.closest('.rotate-element')
        // Math.round - to nearest whole num
        const currentMouse = {
            x: Math.round(event.layerX),
            y: Math.round(event.layerY),
        }
        
        //here we get the point around which the rotation happends
        const center = {
            x: Math.round(current.clientWidth / 2),
            y: Math.round(current.clientHeight / 2),
        }
        // formulas responcible for correcr rotation 
        const yRotate = Math.round((currentMouse.x - center.x) / current.clientWidth * 10)
        const xRotate = Math.round((currentMouse.y - center.y) / current.clientHeight * -10)
    
        // ` is not the same as '  and is called template literals
        current.style.transform = `perspective(500px) rotate3d(${xRotate},${yRotate},0, ${angle}deg)`
    }
    
    function showTopGradient(node,  event) {
      // event come the last always
      parallax.style.transform = `translateY(${window.scrollY * 0.3}px) translateZ(-100px)` // смещение заднего блока для эффекта параллакса
    }
    
    // some code here is redundant because ai wanted to make paralax using it but due to lack of time abandoned this idea
    if (currentLocation.includes('artworks.html')) { // checks if im on the right page
      const arts = document.querySelector('.arts-items')
      const artsItems = document.querySelectorAll('.arts-item')
      const topGradient = document.querySelector('.projects-top-gradient')
      const fakeScrollBar = document.querySelector('.fake-scroll-bar')
      /***THIS TEXT IS IN RUSSIAN BECAUSE I DIDNT KNOW HOW TO WRITE IT IN ENGLISH SO I CAN UNDERSTAND IT
       * 
       * Обработчик события скролла страницы. showTopGradient - это callback function, далее просто cb
       * Если повесить cb как showTopGradient(...args) - функция отработает ЕДИНОЖДЫ в момент загрузки страницы
       * Вызываем ее через конструкцию bind
       * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
       * Первым аргументом передаем контекст, который доступен будет через this
       * Остальные аргументы - наши элементы которые мы получили выше
       *
       */
      window.addEventListener('scroll', showTopGradient.bind(window, arts, topGradient, fakeScrollBar))
    
      artsItems.forEach(elem => {// call the rotate element function of each elemts
        elem.addEventListener('mousemove', rotateElement.bind(window, elem, 10))// activate it when needed
        elem.addEventListener('mouseleave', stopRotateElement.bind(window, elem))
      })
    }
  })
  