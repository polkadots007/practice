const DOM = () => {
    return (
        <div className="concept-section">
        <h3>DOM</h3>
        <div className="two-parts">
            <div className="part part-one">
                <ul>
                    <li>Backbone of an HTML document - <b>Tags</b></li>
                    <li>Every HTML Tag is an object i.e. document.body = {`<body>`}</li>
                    <li>All these objects are accessible and can be modified via JS</li>
                    <li>DOM represents HTML as tree structure of tags/nodes</li>
                    <li>There are 12 types of nodes mainly 4 used are:
                        <ul>
                            <li>document node = entry point to page</li>
                            <li>Element Nodes</li>
                            <li>text nodes i.e. #text</li>
                            <li>comment nodes i.e. #comment</li>
                        </ul>
                    </li>
                    <li>Topmost 3 nodes are: document.html, document.head, document.body</li>
                    <li>Given a DOM node, we can go to its immediate neighbors using navigation properties:
                        <ul>
                        <li>For all nodes: parentNode, childNodes, firstChild, lastChild, previousSibling, nextSibling.</li>
                        <li>For element nodes only: parentElement, children, firstElementChild, lastElementChild, previousElementSibling, nextElementSibling.</li>
                        </ul>
                    </li>
                    <li>Searching for arbitrary elements:
                        <ul>
                            <li>
                                <b>document.getElementById</b> or just id name but the latter is not a preferred approach. e.g. variable idName or window['idName']
                            </li>
                            <li>
                            <b>elem.querySelectorAll(css)</b> returns all elements inside elem matching the given CSS selector.
                            </li>
                            <li><b>elem.querySelector(css)</b> returns the first element for the given CSS selector.</li>
                            <li><b>The elem.matches(css)</b> does not look for anything, it merely checks if elem matches the given CSS-selector. It returns true or false.</li>
                            <li>The method <b>elem.closest(css)</b> looks for the nearest ancestor that matches the CSS-selector. The elem itself is also included in the search.</li>
                            <li><b>elem.getElementsByTagName(tag)</b> looks for elements with the given tag and returns the collection of them. The tag parameter can also be a star "*" for “any tags”.
                            </li>
                            <li><b>elem.getElementsByClassName(className)</b> returns elements that have the given CSS class.</li>
                            <li><b>document.getElementsByName(name)</b> returns elements with the given name attribute, document-wide. Very rarely used.</li>
                            <li><b>elemA.contains(elemB)</b> returns true if elemB is inside elemA (a descendant of elemA) or when elemA==elemB.</li>
                        </ul>
                    </li>
                    <li>getElementsBy* returns live collection(current state of document and auto-updates) while querySelectorAll returns a static collection(fixed array of elments)</li>
                <li>
                    <pre>
                        {`
    alert( document.documentElement.parentNode ); // document
    alert( document.documentElement.parentElement ); // null
                        `}
                    </pre>
                </li>
                <li><b>DOM Node Classes</b>
                    <ul>
                        <li>All classes of DOM nodes form a single hierarchy.</li>
                        <li>EventTarget is root of hierarchy inherited by Node and other DOM nodes inherit form it.</li>
                    </ul>
                </li>
                <li>Attributes – is what’s written in HTML.<br/>
                When the browser parses the HTML to create DOM objects for tags, it recognizes standard attributes and creates DOM properties from them.
                <code>{`<div class="dummy">test</div>`}</code>
                </li>
                <li>Properties – is what’s in DOM objects.(Created by user)
                    <code>div.className</code>
                <ul>
                <li>They can have any value.</li>
                <li>They are case-sensitive (write <b>elem.nodeType</b>, not <b>elem.NoDeTyPe</b>).</li>
                </ul>
                </li>
                <li>Methods to work with attributes are:
                <ul>
                    <li><b>elem.hasAttribute(name)</b> – to check for existence.</li>
                    <li><b>elem.getAttribute(name)</b> – to get the value.</li>
                    <li><b>elem.setAttribute(name, value)</b> – to set the value.</li>
                    <li><b>elem.removeAttribute(name)</b> – to remove the attribute.</li>
                    <li><b>elem.attributes</b> is a collection of all attributes.</li>
                    </ul>
                </li>
                <li>When we need attributes?
                <ul>
                <li>We need a <a href="https://javascript.info/dom-attributes-and-properties#non-standard-attributes-dataset">non-standard attribute</a>. But if it starts with <b>data-</b>, then we should use <b>dataset</b>.
                For instance, if an elem has an attribute named "data-about", it’s available as elem.dataset.about. Multiword attributes like data-order-state become camel-cased: dataset.orderState.</li>
                <li>We want to read the value “as written” in HTML. The value of the DOM property may be different, for instance the <b>href</b> property is always a full URL, and we may want to get the “original” value.</li>
                </ul>
                </li>
                <li>
                    Creating an element using <b>document.createElement(tag)</b>, <b>document.createTextNode(text)</b><br/>
                    There’s a special method append for that: document.body.append(tag).<br/>
                    More insertion methods:
                    <ul>
                    <li><b>node.append(...nodes or strings)</b> – append nodes or strings <em>at the end</em> of <b>node</b>,</li>
                    <li><b>node.prepend(...nodes or strings)</b> – insert nodes or strings <em>at the beginning</em> of <b>node</b>,</li>
                    <li><b>node.before(...nodes or strings)</b> –- insert nodes or strings <em>before</em> <b>node</b>,</li>
                    <li><b>node.after(...nodes or strings)</b> –- insert nodes or strings <em>after</em> <b>node</b>,</li>
                    <li><b>node.replaceWith(...nodes or strings)</b> –- replaces <b>node</b> with the given nodes or strings.</li>
                    <li><b>elem.insertAdjacentHTML(where, html)</b>- first parameter can be :
                        <ul>
                        <li><b>"beforebegin"</b> – insert <b>html</b> immediately before <b>elem</b>,</li>
                        <li><b>"afterbegin"</b> – insert <b>html</b> into <b>elem</b>, at the beginning,</li>
                        <li><b>"beforeend"</b> – insert <b>html</b> into <b>elem</b>, at the end,</li>
                        <li><b>"afterend"</b> – insert <b>html</b> immediately after <b>elem</b>.</li>
                        </ul>
                    </li>
                    <li>
                    <ul>
                    <li><b>elem.insertAdjacentText(where, text)</b> – the same syntax, but a string of <b>text</b> is inserted “as text” instead of HTML,</li>
                    <li><b>elem.insertAdjacentElement(where, elem)</b> – the same syntax, but inserts an element.</li>
                    </ul>
                    </li>
                    </ul>
                </li>
                <li>To <b>remove a node</b>, there’s a method node.remove().</li>
                <li><b>Cloning the nodes: </b>The call <b>elem.cloneNode(true)</b> creates a “deep” clone of the element – with all attributes and subelements. If we call <b>elem.cloneNode(false)</b>, then the clone is made without child elements.</li>
                <li><b>DocumentFragment</b> is a special DOM node that serves as a wrapper to pass around lists of nodes.We can append other nodes to it, but when we insert it somewhere, then its content is inserted instead.</li>
                <li><b>classList</b> methods:
                <ul>
                    <li><b>elem.classList.add/remove("class")</b> – adds/removes the class.</li>
                    <li><b>elem.classList.toggle("class")</b> – adds the class if it doesn’t exist, otherwise removes it.</li>
                    <li><b>elem.classList.contains("class")</b> – checks for the given class, returns <b>true/false</b>.</li>
                    <li>classList is iterable, so we can list all classes with for..of</li>
                </ul>
                </li>
                <li>resetting the style property should be done by setting it to empty string rather than deleting the property</li>
                <li>elem.style is an object and elem.style.cssText is a string</li>
                <li>To get current value of css applied use <b>getComputedStyle(element, [pseudo])</b> where element is the one we want to read and pseudo-element if needed. Returns a read-only object with styles.</li>
                <li>Two concepts:
                <ol>
                <li>A <em>computed</em> style value is the value after all CSS rules and CSS inheritance is applied, as the result of the CSS cascade. It can look like <code>height:1em</code> or <code>font-size:125%</code>.</li>
                <li>A <em>resolved</em> style value is the one finally applied to the element. Values like <code>1em</code> or <code>125%</code> are relative. The browser takes the computed value and makes all units fixed and absolute, for instance: <code>height:20px</code> or <code>font-size:16px</code>. For geometry properties resolved values may have a floating point, like <code>width:50.5px</code>.</li>
                </ol>
                </li>
                <li><b>Geometry/Sizing</b>:
                    <ul>
                        <li>The offsetParent is the nearest ancestor that the browser uses for calculating coordinates during rendering.<br/>
                        That’s the nearest ancestor that is one of the following:
                        <ol>
                    <li>CSS-positioned (<b>position</b> is <b>absolute</b>, <b>relative</b>, <b>fixed</b> or <b>sticky</b>),  or</li>
                    <li><b>&lt;td&gt;</b>, <b>&lt;th&gt;</b>, or <b>&lt;table&gt;</b>,  or</li>
                    <li><b>&lt;body&gt;</b>.</li>
                    </ol><br/>
                    OffsetParent is null when:
                    <ol>
                        <li>For not shown elements (<code>display:none</code> or not in the document).</li>
                        <li>For <code>&lt;body&gt;</code> and <code>&lt;html&gt;</code>.</li>
                        <li>For elements with <code>position:fixed</code>.</li>
                        </ol>
                    </li>
                    <li>Properties offsetLeft/offsetTop - coordinates relative to the upper-left edge of offsetParent.</li>
                    <li>offsetWidth/height is the “outer” width/height of the element including borders.</li>
                    <li>clientTop/Left - he distances from the upper-left outer corner to the upper-left inner (content + padding) corner. For left-to-right OS they are always the widths of left/top borders. For right-to-left OS the vertical scrollbar is on the left so clientLeft includes its width too..</li>
                    <li>clientWidth/Height - the width/height of the content including paddings, but without the scrollbar.</li>
                    <li>scrollWidth/Height - the width/height of the content, just like clientWidth/clientHeight, but also include scrolled-out, invisible part of the element.
                    </li>
                    <li>Properties scrollLeft/scrollTop are the width/height of the hidden, scrolled out part of the element.</li>
                    <li>Width/height of window - clientWidth/clientHeight of document.documentElement</li>
                    <li>window.innerWidth/innerHeight includes the scrollbar.</li>
                    <li>Full Document Height: <br/>
                    <pre>
                    {`
  let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);
                    `}    
                    </pre></li>
                    <li>DOM elements have their current scroll state in their scrollLeft/scrollTop properties.</li>
                    <li>For document scroll: window.pageXOffset/pageYOffset<br/>
                    <ul>
                    <li><b>window.pageXOffset</b> is an alias of <b>window.scrollX</b>.</li>
                    <li><b>window.pageYOffset</b> is an alias of <b>window.scrollY</b>.</li>
                    </ul>
                    </li>
                    <li>Special methods <b>window.scrollBy(x,y)</b> and <b>window.scrollTo(pageX,pageY)</b>:
                        <ul>
                            <li>he method scrollBy(x,y) scrolls the page relative to its current position</li>
                            <li>The method scrollTo(pageX,pageY) scrolls the page to absolute coordinates, so that the top-left corner of the visible part has coordinates (pageX, pageY) relative to the document’s top-left corner.</li>
                        </ul>
                    </li>
                    <li>The call to <b>elem.scrollIntoView(top)</b> scrolls the page to make elem visible.
                        <ul>
                        <li>If <b>top=true</b> (that’s the default), then the page will be scrolled to make <b>elem</b> appear on the top of the window. The upper edge of the element will be aligned with the window top.</li>
                        <li>If <b>top=false</b>, then the page scrolls to make <b>elem</b> appear at the bottom. The bottom edge of the element will be aligned with the window bottom.</li>
                        </ul> 
                    </li>
                    <li>To make the document unscrollable, it’s enough to set document.body.style.overflow = "hidden". The page will “freeze” at its current scroll position.</li>
                    <li>JS methods deal with one of 2 coordinate systems:
                        <ol>
                        <li><strong>Relative to the window</strong> – similar to <b>position:fixed</b>, calculated from the window top/left edge.
                        <ul>
                        <li>we’ll denote these coordinates as <b>clientX/clientY</b>, the reasoning for such name will become clear later, when we study event properties.</li>
                        </ul>
                        </li>
                        <li><strong>Relative to the document</strong> – similar to <b>position:absolute</b> in the document root, calculated from the document top/left edge.
                        <ul>
                        <li>we’ll denote them <b>pageX/pageY</b>.</li>
                        </ul>
                        </li>
                        </ol>
                    </li>
                    <li>The method <b>elem.getBoundingClientRect()</b> returns window coordinates for a minimal rectangle that encloses elem as an object of built-in DOMRect class.
                        Main DOMRect properties:
                        <ul>
                        <li><b>x/y</b> – X/Y-coordinates of the rectangle origin relative to window,</li>
                        <li><b>width/height</b> – width/height of the rectangle (can be negative).</li>
                        <li>(derived properties) <b>top/bottom</b> – Y-coordinate for the top/bottom rectangle edge,</li>
                        <li>(derived properties) <b>left/right</b> – X-coordinate for the left/right rectangle edge.</li>
                        </ul>
                    </li>
                    <li>The call to <b>document.elementFromPoint(x, y)</b> returns the most nested element at window coordinates (x, y)</li>
                    <li>In CSS, window coordinates correspond to position:fixed, while document coordinates are similar to position:absolute on top.</li>
                    <li>To get the document coordinates of an element:
                    <ul>
                    <li><b>pageY</b> = <b>clientY</b> + height of the scrolled-out vertical part of the document.</li>
                    <li><b>pageX</b> = <b>clientX</b> + width of the scrolled-out horizontal part of the document.</li>
                    </ul>
                    <pre>
                        {`
// get document coordinates of the element
function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset
  };
}
                        `}
                    </pre>
                    If in the example above we used it with position:absolute, then the message would stay near the element on scroll.
                    </li>
                    </ul>
                </li> 
                </ul>

            </div>
            <div className="part part-two">
                <img src='./images/dom.jpg'/>
                <img src='./images/dom_elem_nodes.jpg'/>
                <img src='./images/searchNodes.jpg' width='90%'/>
                <img src='./images/domNodeClasses.jpg' width='90%'/>
                <img src='./images/elemGeometry.jpg' width='90%'/>
                <img src='./images/coordinates.jpg' width='90%'/>
                <img src='./images/boundingRect.jpg' width='90%'/>
            </div>
        </div>
    </div>
    )
}

export default DOM;