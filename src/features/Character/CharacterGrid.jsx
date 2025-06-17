import PropTypes from "prop-types";

const CharacterGrid = ({ list }) => (
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
    {list.map(({ name, src, isSupported }) => (
      <figure
        key={name}
        className={`flex flex-col items-center text-xs font-medium text-gray-700 ${isSupported ? "none" : "opacity-50 grayscale"}`}
      >
        <img
          src={src}
          alt={name}
          className="w-14 h-14 rounded object-cover shadow"
        />
        <figcaption className="truncate w-14 text-center mt-1">
          {name}
        </figcaption>
      </figure>
    ))}
  </div>
);

CharacterGrid.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default CharacterGrid;
