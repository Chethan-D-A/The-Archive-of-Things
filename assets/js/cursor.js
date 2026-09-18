(function () {

    const finePointer =
        window.matchMedia("(pointer: fine)").matches;


    /*
     * Custom cursor
     */

    if (finePointer) {

        const cursor =
            document.createElement("div");

        cursor.className =
            "tat-cursor";

        document.body.appendChild(cursor);


        let x =
            window.innerWidth / 2;

        let y =
            window.innerHeight / 2;

        let targetX = x;
        let targetY = y;


        window.addEventListener(
            "mousemove",
            event => {

                targetX =
                    event.clientX;

                targetY =
                    event.clientY;

            },
            { passive: true }
        );


        function animate() {

            x +=
                (targetX - x) * 0.35;

            y +=
                (targetY - y) * 0.35;


            cursor.style.left =
                `${x}px`;

            cursor.style.top =
                `${y}px`;


            requestAnimationFrame(
                animate
            );

        }


        animate();


        function bindInteractiveElements() {

            document
                .querySelectorAll(
                    "a, button, [role='button']"
                )
                .forEach(element => {

                    if (
                        element.dataset.cursorBound
                    ) {
                        return;
                    }


                    element.dataset.cursorBound =
                        "true";


                    element.addEventListener(
                        "mouseenter",
                        () => {

                            cursor.classList.add(
                                "is-hovering"
                            );

                        }
                    );


                    element.addEventListener(
                        "mouseleave",
                        () => {

                            cursor.classList.remove(
                                "is-hovering"
                            );

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

                cursor.classList.add(
                    "is-clicking"
                );

            }
        );


        window.addEventListener(
            "mouseup",
            () => {

                cursor.classList.remove(
                    "is-clicking"
                );

            }
        );

    }


    /*
 * Rendering Artifact Disclosure
 *
 * RAD exists only on the Home page.
 */

const homePage =
    document.querySelector(".home-shell");


if (homePage) {

    const publicationsButton =
        homePage.querySelector(
            ".publications-button"
        );


    if (publicationsButton) {

        const trigger =
            document.createElement("button");

        trigger.className =
            "rad-trigger";

        trigger.type =
            "button";

        trigger.textContent =
            "RAD";

        trigger.setAttribute(
            "aria-label",
            "Rendering Artifact Disclosure"
        );


        const panel =
            document.createElement("aside");

        panel.className =
            "rad-panel";

        panel.innerHTML = `
            <h2 class="rad-panel-title">
                Rendering Artifact Disclosure
            </h2>

            <p class="rad-panel-text">
                If you are viewing the Archive in Firefox
                and notice a faint dotted trail following
                the cursor, it is a browser-specific
                rendering artifact affecting the custom
                cursor. The trail is not intentionally
                rendered by the Archive.
                <br><br>
                Chromium-based browsers, including Brave
                and Edge, do not exhibit this effect in
                our testing. The Archive and its
                interactives remain fully functional.
            </p>
        `;


        publicationsButton.insertAdjacentElement(
            "afterend",
            trigger
        );


        homePage.appendChild(panel);


        trigger.addEventListener(
            "click",
            () => {

                const open =
                    panel.classList.toggle(
                        "is-open"
                    );

                trigger.setAttribute(
                    "aria-expanded",
                    String(open)
                );

            }
        );


        document.addEventListener(
            "click",
            event => {

                if (
                    event.target !== trigger &&
                    !panel.contains(event.target)
                ) {

                    panel.classList.remove(
                        "is-open"
                    );

                }

            }
        );


        if (finePointer) {

            trigger.addEventListener(
                "mouseenter",
                () => {

                    const cursor =
                        document.querySelector(
                            ".tat-cursor"
                        );

                    if (cursor) {
                        cursor.classList.add(
                            "is-hovering"
                        );
                    }

                }
            );


            trigger.addEventListener(
                "mouseleave",
                () => {

                    const cursor =
                        document.querySelector(
                            ".tat-cursor"
                        );

                    if (cursor) {
                        cursor.classList.remove(
                            "is-hovering"
                        );
                    }

                }
            );

        }

    }

}
