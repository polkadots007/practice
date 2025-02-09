const Events = () => {
    return (
        <div className="concept-section">
        <h3>Events</h3>
        <div className="two-parts">
            <div className="part part-one">
                <ul>
                    <li>An event is a signal that something has happened. </li>
                    <li><b>Few useful DOM events</b>:
                    <ul>
                    <li><b>click</b> – when the mouse clicks on an element (touchscreen devices generate it on a tap).</li>
                    <li><b>contextmenu</b> – when the mouse right-clicks on an element.</li>
                    <li><b>mouseover</b> / <b>mouseout</b> – when the mouse cursor comes over / leaves an element.</li>
                    <li><b>mousedown</b> / <b>mouseup</b> – when the mouse button is pressed / released over an element.</li>
                    <li><b>mousemove</b> – when the mouse is moved.</li>
                    <li><b>keydown</b> and <b>keyup</b> – when a keyboard key is pressed and released.</li>
                    <li><b>submit</b> – when the visitor submits a <b>&lt;form&gt;</b>.</li>
                    <li><b>DOMContentLoaded</b> – when the HTML is loaded and processed, DOM is fully built.</li>
                    <li><b>transitionend</b> – when a CSS-animation finishes.</li>
                    </ul>
                    </li>
                    <li>3 ways to assign event handlers:
                    <ol>
                    <li>HTML attribute: <code>onclick="..."</code>.</li>
                    <li>DOM property: <code>elem.onclick = function</code>.</li>
                    <li>Methods: <code>elem.addEventListener(event, handler[, phase])</code> to add, <code>removeEventListener</code> to remove.addEventListener supports objects as event handlers. In that case the method handleEvent is called in case of the event.</li>
                    </ol>
                    </li>
                </ul>
            </div>
            <div className="part part-two">
                <img src="./images/handleEvent1.jpg" />
                <img src="./images/handleEvent2.jpg" />
            </div>
        </div>
    </div>
    )
}

export default Events;