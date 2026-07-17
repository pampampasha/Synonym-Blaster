/* ==========================================================
   Synonym Blaster 2.0

   game.js
   Главный игровой движок

========================================================== */

"use strict";

/* ==========================================================
    Глобальные объекты игры
========================================================== */

let scene;
let camera;
let renderer;
let clock;

let starField;

let gameStarted = false;


/* ==========================================================
    Запуск игры
========================================================== */

window.addEventListener("load", () => {

    init();

});


/* ==========================================================
    Инициализация
========================================================== */

function init(){

    createScene();

    createCamera();

    createRenderer();

    createLights();

    createStars();

    registerEvents();

    hideLoadingScreen();

    animate();

}


/* ==========================================================
    Создание сцены
========================================================== */

function createScene(){

    scene = new THREE.Scene();

    scene.background = new THREE.Color(0x000010);

}


/* ==========================================================
    Камера
========================================================== */

function createCamera(){

    camera = new THREE.PerspectiveCamera(

        60,

        window.innerWidth / window.innerHeight,

        0.1,

        1000

    );

    camera.position.set(

        0,

        2,

        12

    );

}


/* ==========================================================
    Renderer
========================================================== */

function createRenderer(){

    renderer = new THREE.WebGLRenderer({

        antialias:true

    });

    renderer.setPixelRatio(

        window.devicePixelRatio

    );

    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    document
        .getElementById("game-container")
        .appendChild(renderer.domElement);

}


/* ==========================================================
    Освещение
========================================================== */

function createLights(){

    const ambient = new THREE.AmbientLight(

        0xffffff,

        1.2

    );

    scene.add(ambient);


    const directional = new THREE.DirectionalLight(

        0xffffff,

        1.4

    );

    directional.position.set(

        8,

        12,

        6

    );

    scene.add(directional);

}


/* ==========================================================
    Звёздное поле
========================================================== */

function createStars(){

    const geometry = new THREE.BufferGeometry();

    const stars = [];

    const COUNT = 3000;

    for(let i=0;i<COUNT;i++){

        stars.push(

            (Math.random()-0.5)*500,
            (Math.random()-0.5)*500,
            (Math.random()-0.5)*500

        );

    }

    geometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(

            stars,

            3

        )

    );

    const material = new THREE.PointsMaterial({

        color:0xffffff,

        size:0.8,

        sizeAttenuation:true

    });

    starField = new THREE.Points(

        geometry,

        material

    );

    scene.add(

        starField

    );

}


/* ==========================================================
    Скрываем экран загрузки
========================================================== */

function hideLoadingScreen(){

    const screen = document.getElementById(

        "loading-screen"

    );

    screen.style.opacity = 0;

    setTimeout(()=>{

        screen.style.display="none";

    },700);

}


/* ==========================================================
    Обработчики
========================================================== */

function registerEvents(){

    window.addEventListener(

        "resize",

        onResize

    );

}


/* ==========================================================
    Изменение размеров окна
========================================================== */

function onResize(){

    camera.aspect =

        window.innerWidth /

        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );

}


/* ==========================================================
    Игровой цикл
========================================================== */

function animate(){

    requestAnimationFrame(

        animate

    );

    update();

    renderer.render(

        scene,

        camera

    );

}


/* ==========================================================
    Обновление игры
========================================================== */

function update(){

    if(starField){

        starField.rotation.y += 0.0002;

        starField.rotation.x += 0.00005;

    }

}
