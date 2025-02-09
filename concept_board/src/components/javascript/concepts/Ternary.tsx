const Ternary = () => {
 return (
    <div className="concept-section">
        <h3>Ternary Operators</h3>
        <div className="two-parts">
            <div className="part part-one">
                <ul>
                    <li>? is used for shorter and simpler way of conditional branching</li>
                    <li> ? is ternary operator i.e. involves three operands
                        <code>
                            let result = condition ? value1 : value2;
                        </code>
                    </li>
                    <li>Conditions are evaluated by converting the result into boolean by following conversion rules
                        <ul>
                            <li>A number 0, an empty string "", null, undefined, and NaN all become false. Because of that they are called “falsy” values.</li>
                            <li>Other values become true, so they are called “truthy”.</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="part part-two"></div>
        </div>
    </div>
)
}

export default Ternary;