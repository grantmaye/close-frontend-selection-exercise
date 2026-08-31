const { Fragment, memo, useCallback, useState } = React;

const ListItem = memo(function ListItem({ item, isSelected, onToggle }) {
  const toggle = () => onToggle(item.name);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  };

  return (
    <li
      className={`List__item List__item--${item.color}${
        isSelected ? ' List__item--selected' : ''
      }`}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={toggle}
      onKeyDown={handleKeyDown}
    >
      {item.name}
    </li>
  );
});

const List = ({ items }) => {
  const [selectedNames, setSelectedNames] = useState(() => new Set());

  const toggleItem = useCallback((name) => {
    setSelectedNames((current) => {
      const next = new Set(current);

      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }

      return next;
    });
  }, []);

  return (
    <Fragment>
      <section className="SelectedItems" aria-live="polite">
        <strong>Selected items:</strong>{' '}
        {selectedNames.size ? Array.from(selectedNames).join(', ') : 'None'}
      </section>

      <ul className="List">
        {items.map((item) => (
          <ListItem
            key={item.name}
            item={item}
            isSelected={selectedNames.has(item.name)}
            onToggle={toggleItem}
          />
        ))}
      </ul>
    </Fragment>
  );
};

// ---------------------------------------
// Do NOT change anything below this line.
// ---------------------------------------

const sizes = ['tiny', 'small', 'medium', 'large', 'huge'];
const colors = [
  'navy',
  'blue',
  'aqua',
  'teal',
  'olive',
  'green',
  'lime',
  'yellow',
  'orange',
  'red',
  'maroon',
  'fuchsia',
  'purple',
  'silver',
  'gray',
  'black',
];
const fruits = [
  'apple',
  'banana',
  'watermelon',
  'orange',
  'peach',
  'tangerine',
  'pear',
  'kiwi',
  'mango',
  'pineapple',
];

const items = sizes.reduce(
  (items, size) => [
    ...items,
    ...fruits.reduce(
      (acc, fruit) => [
        ...acc,
        ...colors.reduce(
          (acc, color) => [
            ...acc,
            {
              name: `${size} ${color} ${fruit}`,
              color,
            },
          ],
          [],
        ),
      ],
      [],
    ),
  ],
  [],
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<List items={items} />);

