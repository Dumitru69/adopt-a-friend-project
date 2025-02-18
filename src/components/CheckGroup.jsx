import "./css/shared.css";
import "./css/Filters.css";

const CheckboxGroup = ({ title, items, filters, category, onChange }) => (
  <>
    <h6>{title}</h6>
    {items.map((item) => (
      <div key={item} className="checkbox-div">
        <input
          type="checkbox"
          id={item}
          className="checkbox"
          checked={filters[category].includes(item)}
          onChange={() => onChange(category, item)}
          aria-labelledby={`label-${item}`}
        />
        <label id={`label-${item}`} htmlFor={item} className="check-label">
          {item}
        </label>
      </div>
    ))}
  </>
);

export default CheckboxGroup;
