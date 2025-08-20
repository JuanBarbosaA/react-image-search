export default function CardImage({ image, onClick }) {
  return (
    <article
      onClick={onClick}
      className="card-image border border-gray-300 bg-white rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <figure>
        <img
          className="rounded-t-lg h-56 w-full object-cover"
          src={image.webformatURL}
          alt=""
        />
        <figcaption className="text-center text-gray-700 mt-2 text-sm">
          Imagen creada por {image.user}
        </figcaption>
      </figure>
      <div className="image-details p-4">
        <ul className="space-y-2">
          <li>
            <strong>Downloads: </strong>
            {image.downloads}
          </li>
          <li>
            <strong>Comments: </strong>
            {image.comments}
          </li>
          <li>
            <strong>Likes: </strong>
            {image.likes}
          </li>
        </ul>
      </div>
      <div className="tags p-4">
        <div className="flex flex-wrap gap-2">
          {image.tags.split(",").map((tag, index) => (
            <span
              className="py-1 px-2 bg-gray-400 text-sm rounded-lg text-gray-100"
              key={index}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
