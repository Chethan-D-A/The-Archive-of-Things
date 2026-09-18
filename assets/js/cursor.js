(function () {

    if (!window.matchMedia("(pointer: fine)").matches) {
        return;
    }

    const cursor = document.createElement("div");

    cursor.className = "tat-cursor";

    document.body.appendChild(cursor);


    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    let targetX = x;
    let targetY = y;


    window.addEventListener(
        "mousemove",
        event => {

            targetX = event.clientX;
            targetY = event.clientY;

        },
        { passive: true }
    );


    function animate() {

        x += (targetX - x) * 0.35;
        y += (targetY - y) * 0.35;

        cursor.style.transform =
            `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

        requestAnimationFrame(animate);

    }

    animate();


    const interactiveElements =
        document.querySelectorAll(
            "a, button, [role='button']"
        );


    interactiveElements.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {
                cursor.classList.add("is-hovering");
            }
        );

        element.addEventListener(
            "mouseleave",
            () => {
                cursor.classList.remove("is-hovering");
            }
        );

    });


    window.addEventListener(
        "mousedown",
        () => {
            cursor.classList.add("is-clicking");
        }
    );


    window.addEventListener(
        "mouseup",
        () => {
            cursor.classList.remove("is-clicking");
        }
    );

})();
