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

        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;

        requestAnimationFrame(animate);

    }

    animate();


    function bindInteractiveElements() {

        document
            .querySelectorAll("a, button, [role='button']")
            .forEach(element => {

                if (element.dataset.cursorBound) {
                    return;
                }

                element.dataset.cursorBound = "true";


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

    }


    bindInteractiveElements();


    window.initializeArchiveCursor =
        bindInteractiveElements;


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
