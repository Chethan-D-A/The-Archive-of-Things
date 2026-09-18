(function () {

    const cursor = document.createElement("div");

    cursor.className = "tat-cursor";

    cursor.innerHTML = `
        <svg
            viewBox="0 0 24 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path d="
                M3 3
                L3 13
                L8 8
                L8 18
                L12 14
                L16 18
                L16 8
                L21 13
                L21 3
                L18 3
                L18 7
                L14 3
                L10 3
                L6 7
                L6 3
                Z

                M11 14
                L11 29
                L13 29
                L13 14
                Z
            "/>
        </svg>
    `;

    document.body.appendChild(cursor);


    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let currentX = mouseX;
    let currentY = mouseY;


    window.addEventListener(
        "mousemove",
        event => {
            mouseX = event.clientX;
            mouseY = event.clientY;
        },
        { passive: true }
    );


    function animate() {

        currentX += (mouseX - currentX) * 0.22;
        currentY += (mouseY - currentY) * 0.22;

        cursor.style.transform =
            `translate3d(
                ${currentX}px,
                ${currentY}px,
                0
            ) translate(-50%, -50%)`;

        requestAnimationFrame(animate);
    }

    animate();


    document.addEventListener(
        "mouseover",
        event => {

            if (event.target.closest("a, button")) {
                cursor.classList.add("is-hovering");
            }

        }
    );


    document.addEventListener(
        "mouseout",
        event => {

            if (event.target.closest("a, button")) {
                cursor.classList.remove("is-hovering");
            }

        }
    );


    document.addEventListener(
        "mousedown",
        () => {
            cursor.classList.add("is-clicking");
        }
    );


    document.addEventListener(
        "mouseup",
        () => {
            cursor.classList.remove("is-clicking");
        }
    );

})();
