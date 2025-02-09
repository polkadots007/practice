const NullCoalesce = () => {
 return (
    <div className="concept-section">
        <h3>Null Coalescing</h3>
        <div className="two-parts">
            <div className="part part-one">
                <ul>
                    <li>A value is "<u>defined</u>" if its neither <b>null</b> nor <b>undefined</b></li>
                    <li>The result of <b>a ?? b</b> is:
                        <ul>
                            <li>if a is defined then a</li>
                            <li>if a is NOT defined then b</li>
                        </ul>
                    </li>
                    <li className="important"><b>??</b> returns the first defined argument</li>
                    <li>Can be rewritten as:
                        <code className="code-stmt">
                            result = (a !== null && a!== undefined) ? a : b
                        </code>
                    </li>
                    <li> Difference between <b>??</b> and <b>||</b>:
                        <ul>
                            <li>|| returns the first truthy value</li>
                            <li>?? returns the first defined value</li>
                            <li>|| considers false, 0, an empty string "" and null/undefined as falsy!</li>
                        </ul>
                    </li>
                    <li>|| and ?? have the SAME precedence</li>
                    <li>?? is used to assign default values to variables</li>
                    <li className="warning">It’s forbidden to use it with || or && without explicit parentheses.</li>
                </ul>
            </div>
            <div className="part part-two">
                <ul>
                    <li>?? and || give same results for below scenario
                    <pre>
    {`
    let firstName = null;
    let lastName = null;
    let nickName = "Supercoder";

    // shows the first defined value:
    alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
    // shows the first truthy value:
    alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
    `}
                    </pre>
                    </li>
                    <li>?? and || give different results for below scenario
                    <pre>
    {`
    let height = 0;

    alert(height || 100); // 100
    alert(height ?? 100); // 0
    `}
                    </pre>
                    </li>
                </ul>
            
            </div>
        </div>
    </div>
 );
}

export default  NullCoalesce;